import { settings } from '../../elements/carousel/CarouselSetting'
import Slider from 'react-slick'
import CardStackItems from '../CardStackItems'
import { useEffect, useState } from 'react'
import ButtonSecondary from '../../elements/button/ButtonSecondary'

type CardStackProps = {
     cardStackItems: {
          item: {
               value: {
                    id: string
                    img: string
                    title: string
                    price: string
                    onDetailClick: () => void
                    onContactClick: () => void
               }[]
          }
     }
}

const CardStack = ({ cardStackItems }: CardStackProps) => {
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768)

     useEffect(() => {
          const handleResize = () => setIsDesktop(window.innerWidth >= 768)
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     return (
          <>
               {
                    isDesktop ? (
                         <div className='gap-4 flex flex-col items-center justify-center w-full h-full 
                         md:grid md:grid-cols-2 md:place-content-center lg:grid-cols-3'>
                              <CardStackItems cardStackItems={cardStackItems} />
                         </div>
                    ) : (
                         <Slider {...settings}>
                              {cardStackItems.item.value.map((item, index) => (
                                   <div key={index} >
                                        <div className='relative bg-cover bg-center w-full min-h-96' style={{ backgroundImage: `url(${item.img})` }}>
                                             <div className='absolute top-0 left-0 bg-primary py-2 px-3 rounded-br-2xl'>
                                                  <h4 className='text-white text-sm'>{item.price}</h4>
                                             </div>
                                             <div className='absolute bottom-0 bg-tertiary bg-opacity-85 w-full flex flex-col gap-y-3 py-5 items-center rounded-t-3xl'>
                                                  <h2 className='text-lg font-semibold text-white'>{item.title}</h2>
                                                  <div className='flex gap-x-3 w-full items-center justify-center'>
                                                       <ButtonSecondary text='Lihat Detail' onClick={item.onDetailClick} />
                                                       <ButtonSecondary text='Hubungi' onClick={item.onContactClick} />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </Slider>
                    )
               }
          </>
     )
}

export default CardStack