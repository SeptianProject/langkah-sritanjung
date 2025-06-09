import Slider from 'react-slick'
import { useEffect, useState } from 'react'
import ButtonSecondary from '../../elements/button/ButtonSecondary'

interface CardStackProps {
     cardStackItems: {
          item: {
               value: {
                    id: string
                    img: string
                    title: string
                    price: string
                    onDetailClick?: () => void
                    onContactClick?: () => void
               }[]
          }
     }
}

const CardStack = ({ cardStackItems }: CardStackProps) => {
     const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth >= 768)
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 1024)

     useEffect(() => {
          const handleTabletSIze = () => setIsTablet(window.innerWidth >= 768)
          const handleDeskSize = () => setIsDesktop(window.innerWidth >= 1024)
          window.addEventListener('resize', handleTabletSIze)
          window.addEventListener('resize', handleDeskSize)
          return () => {
               window.removeEventListener('resize', handleTabletSIze)
               window.removeEventListener('resize', handleDeskSize)
          }
     }, [])

     return (
          <div className='slider-container'>
               <Slider speed={500} infinite={false} dots={false}
                    slidesToShow={isDesktop ? 3 : isTablet ? 2 : 1}
                    slidesToScroll={isDesktop ? 3 : isTablet ? 2 : 1}>
                    {cardStackItems?.item?.value?.map((item, index) => (
                         <div key={index} className='px-2 transition-all duration-500' >
                              <div className='relative bg-cover bg-center w-full min-h-96 xs:min-h-[26rem]  xl:min-h-[30rem]' style={{ backgroundImage: `url(${item.img})` }}>
                                   <div className='absolute top-0 left-0 bg-primary py-2 px-3 rounded-br-2xl'>
                                        <h4 className='text-white text-sm'>{item.price}</h4>
                                   </div>
                                   <div className='absolute bottom-0 bg-tertiary bg-opacity-85 w-full flex flex-col gap-y-3 py-5 items-center rounded-t-3xl'>
                                        <h2 className='text-lg px-2 text-center font-semibold text-white'>{item.title}</h2>
                                        <div className='flex gap-x-3 w-full items-center justify-center'>
                                             <ButtonSecondary text='Lihat Detail' onClick={item.onDetailClick} />
                                             <ButtonSecondary text='Hubungi' onClick={item.onContactClick} />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    ))}
               </Slider>
          </div>
     )
}

export default CardStack