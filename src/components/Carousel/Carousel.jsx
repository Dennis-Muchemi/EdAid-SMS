
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import school_image from "../../assets/school_1.jpg";
import students from "../../assets/students.jpg";
import class_pic from "../../assets/class.jpg";
import happy_student from "../../assets/happy_student.jpg";

import { Navigation,Autoplay } from 'swiper/modules';
const Carousel = () => {

    return (
        <>
      <Swiper
       navigation={true}
        loop={true} 
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
         modules={[Navigation,Autoplay]}  className="mySwiper">

        <SwiperSlide className=''>
            <div id="slide1" className="carousel-item relative w-full  ">
                
                <img src={school_image} className="w-full h-[500px] object-cover" />
        </div>
            </SwiperSlide>
        <SwiperSlide className=''>
        <div id="slide2" className="carousel-item relative w-full  ">
            
                <img src={students} className="w-full h-[500px] object-cover" />
        </div>
        </SwiperSlide>
        <SwiperSlide className=''>
        <div id="slide3" className="carousel-item relative w-full ">
            
                <img src={class_pic} className=" w-full h-[500px]  object-cover" />
            </div>
        </SwiperSlide>
        <SwiperSlide className=''>
        <div id="slide4" className="carousel-item relative w-full ">
            
                <img src={happy_student} className="w-full h-[500px] bg-center  object-cover" />
            </div>
        </SwiperSlide>
  
      
       

      </Swiper>
    </>

    );
};



export default Carousel;