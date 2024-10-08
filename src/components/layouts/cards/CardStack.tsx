import { settings } from '../../elements/carousel/CarouselSetting'
import Slider from 'react-slick'
import { useEffect, useState } from 'react'
import CardStackItems from '../../fragments/CardStackItems'

type CardStackProps = {
     cardStackItems: {
          item: {
               value: {
                    img: string
                    title: string
                    price: string
               }[]
          }
     }
}

const CardStack = ({ cardStackItems }: CardStackProps) => {
     const [isCardDesktop, setIsCardDesktop] = useState<boolean>(false)

     const handleResize = () => {
          if (window.innerWidth >= 768) {
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
                    isCardDesktop
                         ?
                         <div className='gap-4 flex flex-col items-center justify-center w-full h-full 
                         md:grid md:grid-cols-2 md:place-content-center lg:grid-cols-3'>
                              <CardStackItems cardStackItems={{
                                   item: { value: cardStackItems.item.value }
                              }} />
                         </div>
                         :
                         <Slider {...settings}>
                              {
                                   cardStackItems.item.value.map((item, index) => (
                                        <div key={index} >
                                             <div className='relative bg-cover bg-center w-full min-h-96' style={{ backgroundImage: `url(${item.img})` }}>
                                                  <div className='absolute top-0 left-0 bg-primary py-2 px-3 rounded-br-2xl'>
                                                       <h4 className='text-white text-sm'>{item.price}</h4>
                                                  </div>
                                                  <div className='absolute bottom-0 bg-tertiary bg-opacity-85 w-full flex flex-col gap-y-3 py-5 items-center rounded-t-3xl'>
                                                       <h2 className='text-lg font-semibold text-white'>{item.title}</h2>
                                                       <div className='flex gap-x-3 w-full items-center justify-center'>
                                                            <button className='bg-secondary text-white border border-opacity-50 border-white py-1 w-24 rounded-bl-xl rounded-tr-xl text-sm'>Lihat Detail</button>
                                                            <button className='bg-secondary text-white border border-opacity-50 border-white py-1 w-24 text-sm rounded-bl-xl rounded-tr-xl'>Hubungi</button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   ))
                              }
                         </Slider>


               }
          </>
     )
}

export default CardStack