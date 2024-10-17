import SearchInput from '../elements/input/SearchInput'
import ButtonSearch from '../elements/button/ButtonSearch'
import { textButton } from '../../assets/asset'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Destination {
     path: string;
     text: string;
}

const ButtonHeader = () => {
     const [destinations, setDestinations] = useState<Destination[]>([])
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
     }, [])

     useEffect(() => {
          const fetchDestinations = async () => {
               try {
                    const response = await axios.get('https://striking-egg-9d9efcd8e6.strapiapp.com/api/destinasi-wisatas')
                    const data = response.data

                    const formattedDestination = data.map((item) => ({
                         path: item.slug,
                         text: item.name
                    }))

                    setDestinations(formattedDestination)
                    console.log(formattedDestination)
               } catch (error) {
                    console.error(error)
               }
          }
          fetchDestinations()
     }, [])

     return (
          <div className=''>
               <SearchInput />
               <div className='mt-4 flex gap-x-4'>
                    {destinations.slice(0, 2).map((destination, index) => (
                         <ButtonSearch
                              key={index}
                              destination={destination.path}
                              text={destination.text}
                              clasName='px-4 py-2' />
                    ))}
                    {isDesktop ?
                         <ButtonSearch
                              destination={textButton.search.tamanBaluran.path}
                              text={textButton.search.tamanBaluran.text}
                              clasName='px-4 py-2' />
                         : null}
               </div>
          </div>
     )
}

export default ButtonHeader