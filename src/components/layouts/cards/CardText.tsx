import Slider from "react-slick";
import { textCardCategory } from "../../../assets/asset";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from "react";

const CardText = () => {
     const [isDesktop, setIsDesktop] = useState<boolean>(false)

     const settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
               {
                    breakpoint: 768,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1,
                         infinite: true,
                         dots: false
                    }
               },
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: 2,
                         slidesToScroll: 2,
                         infinite: true,
                         dots: false
                    }
               },
          ]
     };

     const handleResize = () => {
          if (window.innerWidth >= 1024) {
               setIsDesktop(true)
          } else {
               setIsDesktop(false)
          }
     }

     useEffect(() => {
          handleResize()
          window.addEventListener('resize', handleResize)
          return () => window.removeEventListener('resize', handleResize)
     })

     return (
          <>
               {
                    isDesktop ?
                         <div className="flex justify-center items-center">
                              {textCardCategory.map((item, index) => (
                                   <div key={index} className="bg-blueCard w-full mx-auto py-6 lg:px-8 xl:px-16 h-40 bg-opacity-15">
                                        <h1 className="text-2xl font-bold">{item.title}</h1>
                                        <p className="text-base font-normal w-48 mt-2">{item.desc}</p>
                                   </div>
                              ))}
                         </div>
                         : <Slider  {...settings} >
                              {textCardCategory.map((item, index) => (
                                   <div key={index} className="text-center bg-blueCard w-full py-10 px-10 h-40 bg-opacity-15">
                                        <h1 className="text-2xl font-bold">{item.title}</h1>
                                        <p>{item.desc}</p>
                                   </div>
                              ))}
                         </Slider>
               }
          </>
     );
};

export default CardText;
