import SealND from '../SealND'
import locationIcon from '../../assets/icons/location.svg'
import bellIcon from '../../assets/icons/bell-icon.svg'
import betrothedIcon from '../../assets/icons/betrothed-icon.svg'
import ringIcon from '../../assets/icons/ring-icon.svg'
import carIcon from '../../assets/icons/car-icon.svg'

interface TimelineItemProps {
  time: string;
  title: string;
  location?: string; // Optional prop
  locationLink?: string; // Optional prop for location link
  icon: string;
  align?: "left" | "right"; // Default is "left"
}

export default function Schedule(){

    return(
      <section className="section-style">
          <SealND/>

      <div className="relative py-8 px-4 w-full min-w-2xs">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-[calc(75%-3rem)] translate-y-[calc(25%-5rem)] md:translate-y-[calc(25%-6rem)] border-l-2 border-brown-700 ease-linear"></div>

      <div className="space-y-1">
        <TimelineItem
          time="2:00 PM"
          title="Groom's Invitation Gathering"
          location="At Raselmatten, Salha Hall"
          locationLink="https://maps.app.goo.gl/gp1Ns7BpszkRmbgH9"
          icon={bellIcon}
          align="left"
        />
        <TimelineItem
          time="2:30 PM"
          title="Bride's Invitation Gathering"
          location='At Khraybi, Main Hall'
          locationLink="https://maps.app.goo.gl/gcYeG6pK9eQzMuHt5"
          icon={ringIcon}
          align="right"
        />
        <TimelineItem
          time="5:30 PM"
          title="Post-Ceremony Reception"
          location="At Raselmatten, Salha Hall"
          locationLink ="https://maps.app.goo.gl/gp1Ns7BpszkRmbgH9"
          icon={carIcon}
          align="left"
        />
        <TimelineItem
          time="8:30 PM"
          title="Evening"
          location="At Sama Chtoura"
          locationLink="https://maps.app.goo.gl/jxmUZseqVPFCHYAMA"	
          icon={betrothedIcon}
          align="right"
        />
      </div>
      </div>
      </section>
    )
}


const TimelineItem: React.FC<TimelineItemProps> = ({ time, title, location,locationLink, icon, align = "left" }) => {
  return (
    <div>
    <div className={`flex w-full ${align === "left" ? "justify-start" : "justify-end"} -mt-30 md:-mt-40`}>
      <div className={`relative w-1/2 px-4 py-6`}>
        <div className={`absolute ${align === "left" ? "-right-3" : "-left-3"} top-1/2 aspect-square  w-6 sm:w-8 md:w-10  z-10`}>
        <img src={locationIcon} alt="icon" className="aspect-square w-full animate-bounce" /></div> 
        <div className="flex flex-col items-center text-center text-brown-800">
        <img src={icon} alt="icon" className="aspect-square w-1/2 max-w-32 my-2 text-accent" />
          <p className="w-full font-semibold border-b-1">{time}</p>
          <p className="text-md font-medium">{title}</p>
          {location && <a className="whitespace-pre-line pointer-coarse text-2xl hover:font-semibold hover:underline font-seasons" href={locationLink} target="_blank" rel="noopener noreferrer">{location} </a>}
        </div>
      </div>
    </div>
    </div>
  );
};