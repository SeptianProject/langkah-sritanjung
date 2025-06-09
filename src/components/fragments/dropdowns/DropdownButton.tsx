import { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { BounceInRight } from '../../animation/BounceAnimate'
import { Category } from '../../../types/common'

type DropdownButtonProps = {
     dropdownOpen: boolean
     handleDropdownOpen: () => void
     categories: Category[]
     onSelectCategory: (slug: string) => void
     selectedCategory?: string
}

const DropdownButton = ({
     dropdownOpen,
     categories,
     handleDropdownOpen,
     onSelectCategory,
     selectedCategory: selectedCategorySlug
}: DropdownButtonProps) => {
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768)

     // Find the active category from the slug
     const activeCategory = selectedCategorySlug
          ? categories.find(cat => cat.slug === selectedCategorySlug) || null
          : null;

     const handleSelectCategory = (category: Category) => {
          onSelectCategory(category.slug)
     }

     useEffect(() => {
          const handleResize = () => setIsDesktop(window.innerWidth >= 768)
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     // Define reusable class names for buttons
     const buttonBaseClass = `border border-primary rounded-bl-xl rounded-tr-xl font-semibold`;
     const activeButtonClass = `bg-primary text-white`;
     const inactiveButtonClass = `text-primary bg-white hover:bg-primary hover:text-white`;

     return (
          <>
               {isDesktop ? (
                    <div className='hidden md:flex justify-center mt-20 gap-x-5 lg:gap-x-10 lg:mt-16'>
                         {categories.map((category, index) => (
                              <BounceInRight key={index} delayVal={index * 0.5}>
                                   <button
                                        onClick={() => handleSelectCategory(category)}
                                        className={`${buttonBaseClass} md:py-2 md:w-28 lg:py-4 lg:w-40 transition-all duration-500
                                        ${selectedCategorySlug === category.slug ? activeButtonClass : inactiveButtonClass}`}>
                                        {category.name}
                                   </button>
                              </BounceInRight>
                         ))}
                    </div>
               ) : (
                    <div className='flex justify-center'>
                         <div className='md:hidden flex flex-col justify-center w-40 mx-auto mt-10 sm:mt-[7rem]'>
                              <button
                                   onClick={handleDropdownOpen}
                                   className={`${buttonBaseClass} text-primary bg-white py-3 px-3 w-full
                                   flex items-center justify-around`}>
                                   {activeCategory ? activeCategory.name : 'Kategori'}
                                   <BiChevronDown className={`text-primary
                                   size-7 transform transition-all duration-300
                                   ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`} />
                              </button>
                         </div>
                         {dropdownOpen && (
                              <div className='absolute mt-[6.2rem] md:mt-0 flex flex-col gap-y-[5px] w-40'>
                                   {categories.map((category) => (
                                        <button
                                             key={category.slug}
                                             onClick={() => handleSelectCategory(category)}
                                             className={`${buttonBaseClass} transition-all duration-700 py-3 px-7 
                                                  w-full flex items-center justify-between
                                                  ${selectedCategorySlug === category.slug ?
                                                       'bg-white text-primary border border-primary' : ''}`}>
                                             {category.name}
                                        </button>
                                   ))}
                              </div>
                         )}
                    </div>
               )}
          </>
     )
}

export default DropdownButton