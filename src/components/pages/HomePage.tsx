import { assets } from '../../assets/asset'
import CardText from '../fragments/cards/CardText'
import Header from '../layouts/Header'
import HomeDestination from '../layouts/home/HomeDestination'
import HomeAbout from '../layouts/home/HomeAbout'
import {
     useQuery,
} from '@tanstack/react-query'
import { fetchResource } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import { Category, Destination } from '../../types/common'
import React from 'react'

const HomePage = () => {
     const navigate = useNavigate()
     const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

     const { data, isLoading } = useQuery({
          queryKey: ['destinations', 'categories'],
          queryFn: async () => {
               const destinations: Destination[] = await fetchResource('destinations')
               const categories: Category[] = await fetchResource('categories')
               return {
                    destinations: destinations,
                    categories: categories,
               }
          },
     })

     const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
          queryKey: ['category', selectedCategory],
          queryFn: async () => {
               if (!selectedCategory) return null
               return await fetchResource('categories', selectedCategory)
          },
          enabled: !!selectedCategory,
     })

     const handleDetailClick = (slug: string) => {
          navigate(`/detail/${slug}`)
     }
     const handleClickTour = (slug: string) => {
          navigate(`/tour-guide/${slug}`)
     }


     return (
          <div className='flex flex-col gap-y-20'>
               {/* Header */}
               <section className='flex flex-col items-center'>
                    <div className='relative min-h-[40rem] lg:min-h-screen w-full bg-cover bg-center
                         flex flex-col justify-center px-10 md:px-20' style={{ backgroundImage: `url(${assets.bgHome})` }}>
                         <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0 ' />
                         <div className='z-10'>
                              <Header />
                         </div>
                    </div>
                    <div className='w-full'>
                         <CardText />
                    </div>
               </section>
               {/* Destination */}
               <HomeDestination
                    categories={data?.categories || []}
                    destinations={data?.destinations || categoryData?.destination || []}
                    isLoading={{
                         destinations: isLoading,
                         destinationPerCategory: isCategoryLoading
                    }}
                    clickDetail={handleDetailClick}
                    clickTour={handleClickTour}
                    onSelectCategory={(slug: string) => {
                         setSelectedCategory(slug)
                    }}
                    selectedCategory={selectedCategory || ''}
               />
               {/* About */}
               <HomeAbout />
          </div >
     )
}

export default HomePage