import bgl from '../assets/bg-footer_l.png'
import bgr from '../assets/bg-footer-r.png'


export default function Decoration() {
  return (
    <div className=" absolute -translate-y-36 md:-translate-y-32 lg:-translate-y-52 flex justify-between z-20 opacity-80 pointer-events-none 
    animate-wiggle"  
    style={{ animationDuration: '10s' }}
    >
        <img src={bgl} alt="Background Left" className="w-1/2 md:w-1/2 max-w-3xl h-auto object-cover -translate-x-16 md:-translate-x-32 lg:-translate-x-56 animate-wiggle" loading="lazy"
        style={{ animationDuration: '0.9s' }}
        />
         <img src={bgr} alt="Background Right" className="w-1/2  md:w-1/2 max-w-3xl h-auto  object-cover translate-x-16 md:translate-x-32 lg:translate-x-56 animate-wiggle" loading="lazy" style={{ animationDuration: '1.1s' }}
         />
     </div>
  );
}