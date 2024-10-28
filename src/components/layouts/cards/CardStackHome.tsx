import { settings } from '../../elements/carousel/CarouselSetting'
import Slider from 'react-slick'
import { useEffect, useState } from 'react'
import ButtonSecondary from '../../elements/button/ButtonSecondary'
import CardStackItemsHome from './CardStackItemsHome'

type CardStackProps = {
     cardStackItems: {
          id: string
          slug: string
          name: string
          image: {
               url: string
               name: string
          }
     }[]
     handleDetailClick: (slug: string) => void
}

const CardStackHome = ({ cardStackItems, handleDetailClick }: CardStackProps) => {
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
                              <CardStackItemsHome handleDetailClick={handleDetailClick} cardStackItems={cardStackItems} />
                         </div>
                    ) : (
                         <Slider {...settings}>
                              {cardStackItems.map(item => (
                                   <div key={item.id} >
                                        <div className='relative bg-cover bg-center w-full min-h-96' style={{ backgroundImage: `url(${item.image.url})` }}>
                                             <div className='absolute top-0 left-0 bg-primary py-2 px-3 rounded-br-2xl'>
                                                  <h4 className='text-white text-sm'>{item.name}</h4>
                                             </div>
                                             <div className='absolute bottom-0 bg-tertiary bg-opacity-85 w-full flex flex-col gap-y-3 py-5 items-center rounded-t-3xl'>
                                                  <h2 className='text-lg font-semibold text-white'>{item.name}</h2>
                                                  <div className='flex w-full items-center justify-center'>
                                                       <ButtonSecondary text='Lihat Detail' onClick={() => handleDetailClick(item.slug)} />
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

export default CardStackHome