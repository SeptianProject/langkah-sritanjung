import { destinationsCategory } from '../../../assets/asset'


type DropdownItemProps = {
     dropdownOpen: boolean
}

const DropdownItem = ({ dropdownOpen }: DropdownItemProps) => {
     return (
          <div className='relative flex flex-col items-center gap-y-2 mt-2'>
               {
                    dropdownOpen &&
                    destinationsCategory.category.map((category, index) => (
                         <button key={index} className='text-primary bg-white border border-primary
                                             py-3 w-40 rounded-bl-xl rounded-tr-lg top-0 z-10'>
                              {category.title}
                         </button>
                    ))
               }
          </div>
     )
}

export default DropdownItem