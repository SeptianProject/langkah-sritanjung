import { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'


interface Category {
     id: number
     attributes: {
          nama: string
          slug: string
     }
}

type DropdownButtonProps = {
     dropdownOpen: boolean
     handleDropdownOpen: () => void
     categories: Category[]
     selectedCategory: string
     onCategorySelect: (slug: string) => void
}

const DropdownButton =
     ({
          dropdownOpen,
          handleDropdownOpen,
          categories,
          selectedCategory,
          onCategorySelect
     }: DropdownButtonProps) => {
          const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768)

          useEffect(() => {
               const handleResize = () => setIsDesktop(window.innerWidth >= 768)
               window.addEventListener('resize', handleResize)
               return () => {
                    window.removeEventListener('resize', handleResize)
               }
          }, [])

          const selectedCategoryName = categories.find(cat => cat.attributes.slug === selectedCategory)?.attributes.nama || 'Pilih Kategori'

          return (
               <>{isDesktop ? (
                    <div className='hidden md:flex justify-center mt-20 gap-x-5 lg:gap-x-10 lg:mt-16'>
                         {categories.map((category) => (
                              <button key={category.id}
                                   className={`text-primary bg-white border border-primary 
                                        md:py-2 md:w-full lg:py-4 lg:w-40
                                        rounded-bl-xl rounded-tr-xl font-semibold
                                        ${category.attributes.slug === selectedCategory ? 'bg-primary text-white' : ''}`}
                                   onClick={() => onCategorySelect(category.attributes.slug)}>
                                   {category.attributes.nama}
                              </button>
                         ))}
                    </div>
               ) : (
                    <div className='md:hidden flex flex-col justify-center w-40 mx-auto mt-10 xs:mt-16 sm:mt-[7rem]'>
                         <button onClick={handleDropdownOpen}
                              className='text-primary bg-white border border-primary 
                                   py-3 px-3 w-full rounded-bl-xl rounded-tr-xl flex 
                                   items-center justify-between font-semibold'>
                              {selectedCategoryName}
                              <BiChevronDown className={`text-primary 
                              size-7 transform transition-all duration-300
                              ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`} />
                         </button>
                         {dropdownOpen && (
                              <div className='absolute mt-12 w-40 bg-white border border-primary rounded-bl-xl rounded-tr-xl'>
                                   {categories.map((category) => (
                                        <button
                                             key={category.id}
                                             className='w-full text-left px-3 py-2 hover:bg-gray-100'
                                             onClick={() => onCategorySelect(category.attributes.slug)}
                                        >
                                             {category.attributes.nama}
                                        </button>
                                   ))}
                              </div>
                         )}
                    </div>
               )}</>
          )
     }

export default DropdownButton