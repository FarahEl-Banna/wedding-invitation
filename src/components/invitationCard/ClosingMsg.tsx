import SealND from '../SealND'
import crownImg from '../../assets/crownTopbtn.png'


export default function ClosingMsg() {
    return (
      <section className="section-style">
        
        <div className="col-span-3 flex justify-center"><SealND /></div>
        <h3 className="border-y-2 p-3 text-3xl md:mx-36">Share your Wedding Photos and Videos here</h3>

          <p >
          We don’t want to miss any moment of this beautiful day
          </p>
          <div className="aspect-square w-1/2 max-w-60 mx-auto bg-accent/70 rounded-md flex items-center justify-center">
            The QR Code will be available on the wedding day
          </div>
          <p className='md:ml-50 lg:ml-0' >
          Scan The QR Code and upload your photos
          </p>
          <button className=" md:ml-50 border-2 border-accent text-text dark:text-text-dark w-full md:w-60 lg:ml-0 px-4 py-2 rounded-4xl hover:bg-accent/70 transition-colors">
            Upload Photos
          </button>

          <p className='md:pb-50 md:ml-50 md:pl-10 lg:ml-0 lg:pl-0' >
          We are blessed<br/> beyond words to have you celebrate with us.
          </p>
          <p className='text-2xl'>For any inquiries, please reach out to:</p>
          <ul className='font-serif'>
        <li >The Best Man: Hamza Karkot <a href="https://wa.me/96171722997" className="text-accent px-0.5 underline hover:font-semibold">+961 71 722997</a></li>
        <li>Maid of Honor: Farah El Banna <a href="https://wa.me/96171279066" className="text-accent underline hover:font-semibold">+961 71 279066</a> </li>
    </ul>

    <div className="w-full">
      <div className='w-full h-1/12 border-y-2 border-accent text-center ' >
          
          <p className='text-sm' >
            Designed by <a className='text-accent font-cursive text-[18px] tracking-wider' href='www.linkedin.com/in/sarah-el-banna'>SarahElBanna</a>& Developed by <a href='www.linkedin.com/in/farah-el-banna' className='text-accent font-cursive text-[18px] tracking-wider'>FarahElBanna</a>.<br/>© 2025 All rights reserved.</p>
          </div></div>
        
          

          
           
           <div className="absolute bottom-50 md:bottom-30 right-10 flex justify-center flex-col ">

      <img className='w-10 self-center translate-y-1' src={crownImg} alt='crow above the top btn'/>
      <button className="bg-white border border-brown-500 text-xs px-3 py-1 rounded-full shadow-md " onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        TOP
      </button>
    </div>
          

      </section>
    );}