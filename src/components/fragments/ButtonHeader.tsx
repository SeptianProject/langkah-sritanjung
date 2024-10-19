/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchInput from '../elements/input/SearchInput'
import ButtonSearch from '../elements/button/ButtonSearch'
import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../elements/Core';
import { useNavigate } from 'react-router-dom';
import { BounceInRight } from '../animation/BounceAnimate';

interface Destination {
     path: string;
     text: string;
}

const ButtonHeader = () => {
     const [destinations, setDestinations] = useState<Destination[]>([])
     const [isDesktop, setIsDesktop] = useState<boolean>(false)
     const [searchTerm, setSearchTerm] = useState<string>('')
     const [loading, setLoading] = useState<boolean>(true)
     const navigate = useNavigate()

     const handleResize = () => {
          setIsDesktop(window.innerWidth >= 1024)
     }

     useEffect(() => {
          handleResize()
          window.addEventListener('resize', handleResize)
          return () => window.removeEventListener('resize', handleResize)
     }, [])

     useEffect(() => {
          const fetchDestinations = async () => {
               setLoading(true)
               try {
                    const response = await axios.get(`${baseUrl}/destinasi-wisatas?sort=id:asc`)
                    const data = response.data

                    const formattedDestination = data.map((item: any) => ({
                         path: item.slug,
                         text: item.name
                    }))

                    setDestinations(formattedDestination)
               } catch (error) {
                    console.error(error)
               } finally {
                    setLoading(false)
               }
          }
          fetchDestinations()
     }, [])

     const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value)
     }

     const handleButtonSearch = (text: string) => {
          setSearchTerm(text)
     }

     const handleOnClick = () => {
          const foundDestination = destinations.find(
               (destinations) => destinations.text.toLowerCase().includes(searchTerm.toLowerCase()
               ))
          if (foundDestination) {
               navigate(`/detail/${foundDestination.path}`)
          } else {
               navigate('/')
               alert('Destinasi tidak tersedia')
          }
     }

     return (
          <div>
               <SearchInput
                    placeholder='Cari destinasi...'
                    value={searchTerm}
                    onChange={handleSearch}
                    onClick={handleOnClick} />
               <div className='mt-4 flex gap-x-4'>
                    {loading ? (
                         <>
                              {Array.from({ length: isDesktop ? 3 : 2 }).map((_, index) => (
                                   <BounceInRight key={index} delayVal={index ? index * 1 : 0.5}>
                                        <ButtonSearch onSearch={() => { }}
                                             text={''}
                                             clasName='px-[4.3rem] py-4' />
                                   </BounceInRight>
                              ))}
                         </>) : (
                         <>
                              {destinations.slice(0, isDesktop ? 3 : 2).map((destination, index) => (
                                   <BounceInRight key={index} delayVal={index ? index * 1 : 0.5}>
                                        <ButtonSearch
                                             text={destination.text}
                                             onSearch={handleButtonSearch}
                                             clasName='px-4 py-2' />
                                   </BounceInRight>
                              ))}
                         </>
                    )}
               </div>
          </div>
     )
}

export default ButtonHeader