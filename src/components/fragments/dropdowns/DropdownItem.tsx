import { useNavigate } from "react-router-dom"

type CategoryItem = {
     id: number
     name: string
     slug: string
}

type DropdownItemProps = {
     dropdownOpen: boolean
     category: CategoryItem[]
     onSelectedCategory: (category: CategoryItem) => void
}

const DropdownItem = ({ dropdownOpen, category, onSelectedCategory }: DropdownItemProps) => {
     const navigate = useNavigate();

     const handleNavigation = (slug: string) => {
          navigate(`/?category=${slug}`); // Navigasi ke halaman yang sesuai berdasarkan slug
     };

     return (
          <div className='relative flex flex-col items-center gap-y-2 mt-2'>
               {
                    dropdownOpen &&
                    category.map((category, index) => (
                         <button 
                         key={index} 
                         onClick={() => {
                              handleNavigation(category.slug)
                              onSelectedCategory(category) // Set kategori yang dipilih
                            }}
                         className='text-primary bg-white border border-primary
                                        py-3 w-40 rounded-bl-xl rounded-tr-lg top-0 z-10'>
                              {category.name}
                         </button>
                    ))
               }
          </div>
     )
}

export default DropdownItem