
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {Autoplay,EffectCoverflow, Navigation, Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import SealND from '../SealND'
import '../envelope.css';

 import '../../../node_modules/swiper/swiper-bundle.min.css';
 import '../../../node_modules/swiper/swiper.min.css';	
 import '../../../node_modules/swiper/modules/pagination.css'

//  import 'swiper/css';
const images = [
    '/photos/img1.webp',
    '/photos/img2.webp',
    '/photos/img3.webp',
    '/photos/img4.webp',
    '/photos/img5.webp',
    '/photos/img6.webp',
    '/photos/img7.webp',
    '/photos/img8.webp',
  ];

export default function PhotoGallery() {

        const Images =images.map((src, idx) => ( 
        <SwiperSlide key={idx} className={`
          transition-all duration-500 ease-in-out bg-accent rounded`}>	
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-auto object-cover rounded border-accent border-2 shadow-md shadow-text backdrop-blur-3xl "
                loading="lazy"
              />
            </SwiperSlide>
            ));

return (
    <section className="section-style">
    <SealND/>
    {/* Heading */}
    <h3 className="border-y-2 w-full p-3 text-4xl">Officially Wed</h3>
    <p className=" text-text dark:text-text text-center  mb-4">
    11/06/2024
    </p>
    {/* swiper  */}
    <Swiper
    style={{
          // @ts-ignore: Allow custom CSS variables
          '--swiper-pagination-color': '#864825',
        } as React.CSSProperties}
     className="w-full swiper-container"
    effect="coverflow"
    grabCursor={true}
    centeredSlides={true}
     loop={true}
    coverflowEffect={{
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    autoplay={{
      delay: 3500,
      disableOnInteraction: true,
    }}
    modules={[Autoplay,EffectCoverflow,Navigation, Pagination]}
    navigation={{
      nextEl: '.swipe-button-next',
      prevEl: '.swipe-button-prev',
    }}
    pagination={{el:'.swiper-pagination',dynamicBullets: true, clickable: true }}
      spaceBetween={0}
      slidesPerView={1}
      breakpoints={{
    768: { slidesPerView: 3 },   // md: 768px and up
    // 1024: { slidesPerView: 5 },  // lg: 1024px and up
  }}
    >
      {Images}
      <div className="slider-controller w-full flex justify-between items-center">
      <div className="swipe-button-next slider-arrow">
          <FaArrowLeft className="arrow-forward-next text-text dark:text-text-dark" />
        </div>
        <div className="swipe-button-prev slider-arrow">
          <FaArrowRight className="arrow-back-outline text-text dark:text-text-dark" />
        </div>
  
        <div className="swiper-pagination " ></div>
      </div>
    </Swiper>   
  </section>
    )
}