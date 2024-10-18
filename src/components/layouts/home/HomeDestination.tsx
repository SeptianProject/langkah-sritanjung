import { useEffect, useState } from 'react'
import CardBasic from '../../fragments/cards/CardBasic'
import TextGroup from '../../elements/text/TextGroup'
import DropdownButton from '../../fragments/dropdowns/DropdownButton'
import CardHomeDestination from '../cards/CardHomeDestination'
import { Element } from 'react-scroll'
import { baseUrl } from '../../elements/Core'
import axios from 'axios'
import Loading from 'react-loading'

interface Image {
     data: {
          attributes: {
               url: string;
               name: string;
          }
     }
}

interface Destination {
     id: number;
     attributes: {
          name: string;
          slug: string;
          image: Image;
     }
}

interface Category {
     id: number;
     attributes: {
          name: string;
          slug: string;
     }
}
interface CategoryListResponse {
     data: Category[];
}

interface CategoryResponse {
     data: {
          id: number;
          attributes: {
               name: string;
               slug: string;
               destinasi_wisatas: {
                    data: Destination[];
               }
          }
     };
}

const HomeDestination = () => {
     const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
     const [categories, setCategories] = useState<Category[]>([])
     const [selectedCategory, setSelectedCategory] = useState<string>('')
     const [destinations, setDestinations] = useState<Destination[]>([])
     const [loading, setLoading] = useState<boolean>(true)

     useEffect(() => {
          fetchCategories()
     }, [])

     useEffect(() => {
          if (selectedCategory) {
               fetchDestinations(selectedCategory)
          }
     }, [selectedCategory])

     const fetchCategories = async () => {
          try {
               const response = await axios.get<CategoryListResponse>(`${baseUrl}/kategori-wisatas`)
               const data = response.data.data
               setCategories(data)
               if (data.length > 0) {
                    setSelectedCategory(response.data.data[0].attributes.slug)
               }
          } catch (error) {
               console.log('Error fetching categories:', error)
          }
     }

     const fetchDestinations = async (categorySlug: string) => {
          setLoading(true)
          try {
               const response = await axios.get<CategoryResponse>(`${baseUrl}/kategori-wisatas/${categorySlug}?populate=destinasi_wisatas.image`)
               console.log('response:', response)
               const data = response.data.data.attributes

               if (data?.destinasi_wisatas?.data) {
                    setDestinations(data.destinasi_wisatas.data)
               } else {
                    console.error('Unexpected data structure:', response.data)
                    setDestinations([])
               }
          } catch (error) {
               console.error('Error fetching destinations:', error)
          } finally {
               setLoading(false)
          }
     }

     const handleDropdownOpen = () => {
          setDropdownOpen(!dropdownOpen)
     }

     const handleCategorySelect = (categorySlug: string) => {
          setSelectedCategory(categorySlug)
          setDropdownOpen(false)
     }

     const cardStackItems = {
          item: {
               value: destinations.map(dest => ({
                    id: dest.id.toString(),
                    img: dest.attributes.image.data.attributes.url,
                    title: dest.attributes.name,
               }))
          }
     }

     return (
          <Element name='destinasi' className='flex flex-col gap-y-20'>
               {/* Card Bento grid */}
               <div className='flex flex-col gap-y-14 items-center lg:min-h-screen'>
                    <h1 className='text-xl xs:text-2xl font-bold w-80 xs:w-96 text-center 
                    md:text-3xl md:w-96 lg:text-3xl lg:w-[30rem]'>
                         Destinasi Wisata Terfavorit Bulan Ini
                    </h1>
                    <CardBasic />
               </div>
               {/* Cardtext blue Dropdown */}
               <div className='lg:min-h-full lg:w-full px-10 lg:mt-10'>
                    <div className='relative bg-blueCard bg-opacity-20 
                    w-full h-60 lg:h-80
                    rounded-2xl py-5 px-2 sm:px-5'>
                         <TextGroup />
                         <DropdownButton
                              dropdownOpen={dropdownOpen}
                              handleDropdownOpen={handleDropdownOpen}
                              categories={categories}
                              selectedCategory={selectedCategory}
                              onCategorySelect={handleCategorySelect}
                         />
                    </div>
               </div>
               {/* Card */}
               <div className={`lg:min-h-screen px-10 lg:mt-20 ${dropdownOpen ? 'mt-60' : 'mt-0'} transition-all duration-300`}>
                    {
                         loading ? (
                              <Loading className="text-center"
                                   color="#233028"
                                   height={50}
                                   width={50}
                                   type="cylon" />
                         ) : (
                              <CardHomeDestination
                                   cardStackItems={cardStackItems} />
                         )
                    }
               </div>
          </Element>
     )
}

export default HomeDestination