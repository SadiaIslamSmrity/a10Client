import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";

const Swiperpage = () => {
  return (
    <div>
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        spaceBetween={30}
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false
        }}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
      >
        <SwiperSlide>
          <img src="/overflowingtrashbin.jpg" className="h-[50vh] w-full object-cover" />
          <p className='text-xl font-bold text-center text-gray-500 mt-4'>Garbage Issue</p>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/volunteer1.jpg" className="h-[50vh] w-full object-cover" />
          <p className='text-xl font-bold text-center text-gray-500 mt-4'>Community Cleaning</p>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/sustain1.jpeg" alt="Sustainability Action" className="h-[50vh] w-full object-cover" />
          <p className='text-xl font-bold text-center text-gray-500 mt-4'>Sustainability Action</p>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/pilesoflitter.jpg" alt="Garbage Issue" className="h-[50vh] w-full object-cover" />
          <p className='text-xl font-bold text-center text-gray-500 mt-4'>Garbage Issue</p>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/volunteer2.webp" alt="Community Cleaning" className="h-[50vh] w-full object-cover" />
          <p className='text-xl font-bold text-center text-gray-500 mt-4'>Community Cleaning</p>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/sustain2.webp" alt="Sustainability Action" className="h-[50vh] w-full object-cover" />
          <p className='text-xl font-bold text-center text-gray-500 mt-4'>Sustainability Action</p>
        </SwiperSlide>

        {/* You can duplicate slides if needed for smoother looping */}
      </Swiper>
    </div>
  )
}

export default Swiperpage