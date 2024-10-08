import { useEffect, useState } from 'react'
import CardStack from './CardStack'
import { cardStackAssets } from '../../../assets/asset'

const CardHomestay = () => {
     const [isDesktop, setIsDesktop] = useState<boolean>(false)

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
          <div className='flex flex-col gap-y-10'>
               <CardStack cardStackItems={{
                    item: { value: cardStackAssets.cardHomestay.value }
               }} />
               {
                    isDesktop &&
                    <CardStack cardStackItems={{
                         item: { value: cardStackAssets.cardHomestay.value }
                    }} />
               }
               <button className='text-white bg-primary w-32 mx-auto py-2 rounded-lg'>
                    Lainnya
               </button>
          </div>
     )
}

export default CardHomestay