/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import TextGroup from '../../elements/text/TextGroup'
import DropdownButton from '../../fragments/dropdowns/DropdownButton'
import CardHomeDestination from '../cards/CardHomeDestination'
import Loading from 'react-loading'
import axios from 'axios'
import { baseUrl } from '../../elements/Core'
import BentoGrid from '../../fragments/cards/BentoGrid'
import { BounceInBottom } from '../../animation/BounceAnimate'
import { useNavigate } from 'react-router-dom'

type Category = {
     id: string
     name: string
     slug: string
}

type DestinationItem = {
     id: string
     slug: string
     name: string
     image: {
          url: string
          name: string
     }
}

interface Categories {
     category: Category[]
}

const HomeDestination = () => {
     const navigate = useNavigate()
     const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
     const [loading, setLoading] = useState<boolean>(true)
     const [categories, setCategories] = useState<Categories | null>(null)
     const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
     const [destinationData, setDestinationData] = useState<DestinationItem[]>([])

     const handleDropdown = () => {
          setDropdownOpen(!dropdownOpen)
     }

     useEffect(() => {
          const fetchCategories = async () => {
               try {
                    const response = await axios.get(`${baseUrl}/kategori-wisatas`)
                    const data = response.data.data.map((item: any) => ({
                         id: item.id,
                         name: item.attributes.name,
                         slug: item.attributes.slug
                    }))

                    setCategories({ category: data })
                    if (data.length > 0) {
                         setSelectedSlug(data[0].slug)
                    }
               } catch (error) {
                    console.error(error)
               }
          }

          fetchCategories()
     }, [])

     useEffect(() => {
          if (selectedSlug) {
               const fetchDataCategory = async () => {
                    setLoading(true)
                    try {
                         const response = await axios.get(`${baseUrl}/kategori-wisatas/${selectedSlug}`)
                         const data = response.data.data.attributes.destinasi_wisatas.data

                         const fortmattingData: DestinationItem[] = data.map((item: any) => ({
                              id: item.id,
                              slug: item.attributes.slug,
                              name: item.attributes.name,
                              image: {
                                   url: item.attributes.image.data.attributes.url,
                                   name: item.attributes.image.data.attributes.name
                              },
                         }))
                         console.log(fortmattingData)
                         setDestinationData(fortmattingData)
                         setLoading(false)
                    } catch (error) {
                         console.error(error)
                         setLoading(false)
                    }
               }
               fetchDataCategory()
          }
     }, [selectedSlug])

     const handleDetailClick = (slug: string) => {
          navigate(`/detail/${slug}`)
     }


     return (
          <div id='destinasi' className='flex flex-col gap-y-20'>
               {/* Card Bento grid */}
               <div className='flex flex-col gap-y-14 items-center lg:min-h-screen'>
                    <BounceInBottom delayVal={0.5}>
                         <h1 className='text-xl xs:text-2xl font-bold w-80 xs:w-96 text-center 
                    md:text-3xl md:w-96 lg:text-3xl lg:w-[30rem] text-tertiary text-opacity-90'>
                              Destinasi Wisata Terfavorit Bulan Ini
                         </h1>
                    </BounceInBottom>
                    <BentoGrid />
               </div>
               {/* Cardtext blue Dropdown */}
               <div className='lg:min-h-full lg:w-full px-10 lg:mt-10'>
                    <div className='relative bg-blueCard bg-opacity-20 
                    w-full h-60 lg:h-80
                    rounded-2xl py-5 px-2 sm:px-5'>
                         <TextGroup />
                         <DropdownButton
                              onSelectCategory={(slug: string) => setSelectedSlug(slug)}
                              categories={categories?.category || []}
                              dropdownOpen={dropdownOpen}
                              handleDropdownOpen={handleDropdown}
                         />
                    </div>
               </div>
               {/* Card */}
               <div className={`px-10 lg:mt-5
                    ${dropdownOpen ? 'mt-60' : 'mt-0'} transition-all duration-300`}>
                    {
                         loading ? (
                              <Loading className="text-center w-full mx-auto"
                                   color="#EA8104"
                                   height={50}
                                   width={50}
                                   type="cylon" />
                         ) : (
                              <CardHomeDestination
                                   handleDetailClick={handleDetailClick}
                                   onClick={handleDropdown}
                                   cardStackItems={destinationData} />
                         )
                    }
               </div>
          </div>
     )
}

export default HomeDestination