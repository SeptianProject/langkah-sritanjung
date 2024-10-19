import { useEffect, useState } from 'react'
import CardStackHome from './CardStackHome'

type HomeDestinationProps = {
     cardStackItems: {
          id: string
          name: string
          image: {
               url: string
               name: string
          }
     }[]
     onClick: () => void
}

const CardHomeDestination = ({ cardStackItems, onClick }: HomeDestinationProps) => {
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768)
     const [showAll, setShowAll] = useState<boolean>(false)

     useEffect(() => {
          const handleResize = () => setIsDesktop(window.innerWidth >= 768)
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     const handleShowAll = () => {
          setShowAll(!showAll)
          onClick()
     }

     const displayedItems = isDesktop && !showAll ? cardStackItems.slice(0, 3) : cardStackItems

     return (
          <div className='flex flex-col gap-y-10'>
               <CardStackHome cardStackItems={displayedItems} />
               {isDesktop && cardStackItems.length > 3 && (
                    <button
                         onClick={handleShowAll}
                         className='text-white bg-primary w-32 mx-auto py-2 rounded-lg'>
                         {showAll ? 'Sembunyikan' : 'Lihat Semua'}
                    </button>
               )}
          </div>
     )
}

export default CardHomeDestination