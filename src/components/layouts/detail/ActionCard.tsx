import { useEffect, useState } from "react"
import { settings } from "../../elements/carousel/CarouselSetting"
import Slider from "react-slick"


type ActionCardProps = {
     actionItems: {
          item: {
               value: {
                    title: string
               }[]
          }
     }
}

const ActionCard = ({ actionItems }: ActionCardProps) => {
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768)

     const handleResize = () => {
          setIsDesktop(window.innerWidth >= 768)
     }

     useEffect(() => {
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     return (
          <>{isDesktop ?
               (<div className="grid grid-cols-3 w-full gap-3">
                    {actionItems.item.value.map((action, index) => (
                         <div key={index} className='py-7 rounded-xl
                                   border border-primary flex items-center justify-center'>
                              <h1 className="text-sm text-center font-medium">
                                   {action.title}
                              </h1>
                         </div>
                    ))}
               </div>
               ) : (<Slider {...settings} >
                    {actionItems.item.value.map((action, index) => (
                         <div key={index} className="w-60 py-7 rounded-xl
                                   border border-primary flex items-center
                                   justify-center gap-x-10">
                              <h1 className="text-sm text-center font-medium">
                                   {action.title}
                              </h1>
                         </div>
                    ))}
               </Slider>
               )
          }</>
     )
}

export default ActionCard