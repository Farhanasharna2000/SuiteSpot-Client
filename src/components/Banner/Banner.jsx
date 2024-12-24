
import { Swiper, SwiperSlide } from 'swiper/react'


import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay,  Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../../assets/images/banner1.jpg'
import bgimg2 from '../../assets/images/banner2.jpg'
import bgimg3 from '../../assets/images/banner3.jpg'

export default function Banner() {
  return (
    <div >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,  Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='Welcome To SuiteSpot Hotel'
            description='A New Vision Of Comfort'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Enjoy a Luxury  Experience'
             description='Enjoy and explore'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Join Festivals And Events'
             description='Enjoy and explore'

          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
