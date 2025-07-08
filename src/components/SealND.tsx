
import sealND from '../assets/sealN&D.svg';


export default function SealND() {
  return (
    <div className="mt-6 aspect-square min-w-16 w-1/4 max-w-44 text-shadow-accent flex  items-center justify-center font-bold text-yellow-500  text-5xl ">
              <img loading="lazy" src={sealND} alt="Seal" className="w-full h-full object-cover rounded-full"/>
            </div>
  );
}