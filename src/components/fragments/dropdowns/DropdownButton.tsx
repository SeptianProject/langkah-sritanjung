import { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'


type Category = {
     name: string
     slug: string
}

type DropdownButtonProps = {
     dropdownOpen: boolean
     handleDropdownOpen: () => void
     categories: Category[]
     onSelectCategory: (slug: string) => void
}

const DropdownButton = ({ dropdownOpen, categories, handleDropdownOpen, onSelectCategory }: DropdownButtonProps) => {
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768)
     const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

     const handleSelectCategory = (category: Category) => {
          setSelectedCategory(category)
          onSelectCategory(category.slug)
     }

     useEffect(() => {
          if (categories.length > 0) {
               setSelectedCategory(categories[0])
          }
     }, [categories])

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
                         <div className='hidden md:flex justify-center mt-20 gap-x-5 lg:gap-x-10 lg:mt-16'>
                              {categories.map((category) => (
                                   <button key={category.slug} onClick={() => handleSelectCategory(category)}
                                        className={` border border-primary 
                                        md:py-2 md:w-full lg:py-4 lg:w-40 transition-all duration-500
                                        rounded-bl-xl rounded-tr-xl font-semibold
                                        ${selectedCategory?.slug === category.slug ? 'bg-primary text-white' : 'text-primary bg-white'}`}>
                                        {category.name}
                                   </button>
                              ))}
                         </div>
                    ) : (<div className='flex justify-center'>
                         <div className='md:hidden flex flex-col justify-center w-40 mx-auto mt-10 xs:mt-16 sm:mt-[7rem]'>
                              <button onClick={handleDropdownOpen}
                                   className='text-primary bg-white border border-primary 
                                   py-3 px-3 w-full rounded-bl-xl rounded-tr-xl flex 
                                   items-center justify-around font-semibold'>
                                   {selectedCategory?.slug ? selectedCategory.name : 'Kategori'}
                                   <BiChevronDown className={`text-primary
                              size-7 transform transition-all duration-300
                              ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`} />
                              </button>
                         </div>
                         {dropdownOpen && (
                              <div className='absolute mt-[6.2rem] xs:mt-[7.7rem] md:mt-0 flex flex-col gap-y-[5px] w-40 '>
                                   {categories.map((category) => (
                                        <button
                                             key={category.slug} onClick={() => handleSelectCategory(category)}
                                             className={`border border-primary transition-all duration-700  
                                                  py-3 px-7 w-full rounded-bl-xl rounded-tr-xl flex 
                                                  items-center justify-between font-semibold
                                                  ${selectedCategory?.slug === category.slug
                                                       ? ' bg-white text-primary border border-primary'
                                                       : ''}`}>
                                             {category.name}
                                        </button>
                                   ))}
                              </div>
                         )}
                    </div>)}
          </>
     )
}

export default DropdownButton