import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import './envelope.css'

import HeroSection from "./invitationCard/HeroSection";
import Schedule from "./invitationCard/Schedule";
import Timer from "./invitationCard/Timer";
import PhotoGallery from "./invitationCard/PhotoGallery";
import Confirmation from "./invitationCard/Confirmation";
import ClosingMsg from "./invitationCard/ClosingMsg";
import Decoration from './Decoration'

import inviteBg from '../assets/bg.jpg'
import inviteBg2 from '../assets/bg2.jpg'
import bgh from '../assets/bg-head.png' 
// import ThemeToggle from "./ThemeToggle";

import seal from '../assets/seal.svg'
import logo from '../assets/sealN&D.svg'
import flr_seal from '../assets/flr_seal.svg'

type Invitee = {
  name: string;
  invited_count: number;
  phone: string;
  is_attending: number,
  side: "B" | "G";
};

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setVisible] = useState(true);

  const [params] = useSearchParams();
  const code = params.get('code');
  const [invitee, setInvitee] = useState<Invitee>({
    name:"",
    invited_count: 0,
    phone: "961",
    is_attending: 1,
    side: "B"
});
  const [showRSVP, setShowRSVP] =useState(false)
  

  useEffect(() => {
    if (!code) {
      console.error('No code provided in the URL');
      return;
    }
    fetch(`http://localhost:4000/api/check-code?code=${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Invalid code') throw new Error('Invalid or expired invitation link');
        else {
          setInvitee(data)
          setShowRSVP(true)
        }
      })
      .catch(err => {throw new Error('Server error:'+err)});
  }, [code]);

  useEffect(() => {
    if(isOpen){
    const timer = setTimeout(() => {
      setVisible(false); // remove after 5.5s
    }, 5000);
    return () => clearInterval(timer);}
  }, [isOpen]);

  return (
    <div className={`flex w-full items-center justify-center bg-background dark:bg-background-dark  shadow-xl h-svh m-svw bg-no-repeat bg-cover backdrop-blur-3xl backdrop-saturate-100`}
    style={{
      backgroundImage: `url(${isOpen?inviteBg2:inviteBg})`}}
     >
      {isVisible &&<div
        className="relative w-[calc(100vw-3rem)] h-full sm:aspect-[555/917] sm:w-auto sm:max-h-[90svh] sm:mx-auto rounded-lg  shadow-lg"
        style={{ height: 'min(90svh, calc(100vw * 917 / 555))' }}
        // style={{ height: 'calc(100svh - 3rem)' }}
      >
      
        {/* Left Envelope Flap */}
        <div
          className={`absolute top-0 left-0 w-3/4 h-full rounded-br-3xl rounded-tr-3xl shadow-xl/30 bg-gradient-to-r from-primary to-70% to-secondary z-20 transition-transform duration-5200 origin-top preserve-3d ${
            isOpen ? "-translate-x-1000" : "-translate-x-0"
          }`}
          style={{ transformOrigin: "top" }}
        />

        {/* Envelope Flap */}
        <div
          className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary to-secondary rounded-bl-3xl rounded-tl-3xl shadow-xl/30 bg-gray-600 z-20 transition-transform duration-5200 origin-top preserve-3d ${
            isOpen ? "translate-x-1000" : "translate-x-0"
          }`}
          style={{ transformOrigin: "top" }}
        />
        {/* Wax Seal */}
          <div className={`absolute top-[50%] left-2/3 transition-transform transform -translate-x-1/2 -translate-y-1/2 z-30 duration-5500 origin-top preserve-3d ${
            isOpen ? "translate-x-1000 " : "-translate-x-2/3" }`}
          style={{ transformOrigin: "top" }}
          onClick={() => setIsOpen(!isOpen)}
          >
            <img src={flr_seal} alt=" flower behind seal" className="absolute z-[-10] bottom-11 left-6 w-32 h-32 object-cover rounded-full"/>
            <img src={seal} alt="Seal" className="w-24 h-24 object-cover rounded-full"/>
          </div>

          {/* Logo*/}
          <div className={`absolute top-[40%] left-1/12 transition-transform transform -translate-x-1/2 -translate-y-1/2 z-30 duration-5500 origin-top preserve-3d ${
            isOpen ? "-translate-x-1000 " : "translate-x-2/3" }`}
          style={{ transformOrigin: "top" }}
          >
            <div className="w-24 h-24 text-shadow-accent flex items-center justify-center font-bold text-yellow-500  text-5xl ">
              <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full"/>
            
            </div>
          </div>
      </div>}
      {/* Card Inside */} 
     {isOpen&& <div
          className={`absolute top-0 left-0 w-full h-auto z-10 transition-all duration-2500 ease-in-out  p-10 rounded-lg shadow-md preserve-3d bg-background  dark:bg-background-dark bg-center bg-repeat-y bg-contain  
    ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"}`}
    style={{
        backgroundImage: `url(${inviteBg2})`}}
        >
          <img src={bgh} alt="Background Header" className="fixed top-0 left-0 rotate-180 w-full h-auto z-30 object-cover animate-wiggle"/>
          
          
          <HeroSection/>
          <Decoration/>
          <Timer/>
          <Decoration/>
          <Schedule/>
          <Decoration/>
          {showRSVP &&<Confirmation name={invitee.name} invited_count={invitee.invited_count} phone={invitee.phone}/>}
          <Decoration/> 
          <PhotoGallery/>
          <Decoration/>
          {/* <OrganizationalDetails/> */}
          <Decoration/>
          <ClosingMsg/>
        </div>}
    </div>
  );
}

