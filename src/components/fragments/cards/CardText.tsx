import Slider from "react-slick";
import { textCardCategory } from "../../../assets/asset";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from "react";
import { settings } from "../../elements/carousel/CarouselSetting";

const CardText = () => {
     const [isCardDesktop, setIsCardDesktop] = useState<boolean>(false)

     const handleResize = () => {
          if (window.innerWidth >= 1024) {
               setIsCardDesktop(true)
          } else {
               setIsCardDesktop(false)
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
                    isCardDesktop ?
                         <div className="flex justify-center items-center">
                              {textCardCategory.map((item, index) => (
                                   <div key={index} className="bg-blueCard w-full mx-auto py-8 
                                   lg:px-8 xl:px-16 h-60 bg-opacity-15">
                                        <h1 className="text-2xl font-bold text-tertiary text-opacity-90">{item.title}</h1>
                                        <p className="text-base font-normal w-48 mt-2">{item.desc}</p>
                                   </div>
                              ))}
                         </div>
                         : <Slider  {...settings} >
                              {textCardCategory.map((item, index) => (
                                   <div key={index} className="bg-blueCard text-center w-full h-52 py-8
                                   lg:px-8 xl:px-16 bg-opacity-15">
                                        <h1 className="text-2xl font-bold text-tertiary text-opacity-90">{item.title}</h1>
                                        <p className="text-base font-normal w-60 mt-2 mx-auto">{item.desc}</p>
                                   </div>
                              ))}
                         </Slider>
               }
          </>
     );
};

export default CardText;
