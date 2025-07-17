
import img from '../../assets/N&DHero.png'
import sealND from '../../assets/sealN&D.svg'
import videoSrc from '/videos/SaveTheDate.mp4'

export default function HeroSection(){

    return(
      
        <section className="section-style">
          <link rel="preload" as="image" href={img} />
          <div className="mt-6 aspect-square min-w-40 w-1/4 text-shadow-accent flex  items-center justify-center font-bold text-yellow-500  text-5xl ">
              <img loading="lazy" src={sealND} alt="Seal" className="w-full h-full object-cover rounded-full"/>
              {/* <ThemeToggle/>  */}
            </div>

            <video src={videoSrc} controls playsInline preload="auto"
            className="aspect-[53/30] min-w-64 w-5/6 object-cover rounded-4xl shadow-md"
            poster={img}
          />
      <h1 className="my-1 text-6xl  mb-4">Naeem Karkout 
        <br/>& <br/> Dima Al Banna</h1>
      <p>It is impossible to imagine this day without our closest people. Thus, we are happy to invite you to join and share this wonderful occasion with us</p>
    </section>
    )
}