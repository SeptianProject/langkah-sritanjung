import { destinationsCategory } from '../../../assets/asset'
import { BiChevronDown } from 'react-icons/bi'


type DropdownMobileProps = {
     dropdownOpen: boolean
     handleDropdownOpen: () => void
}

const DropdownMobile = ({ dropdownOpen, handleDropdownOpen }: DropdownMobileProps) => {
     return (
          <div className='md:hidden flex flex-col justify-center w-40 mx-auto mt-10 xs:mt-16 sm:mt-[7rem]'>
               <button
                    className='text-primary bg-white border border-primary 
                                   py-3 px-3 w-full rounded-bl-xl rounded-tr-xl flex 
                                   items-center justify-between font-semibold'
                    onClick={handleDropdownOpen}>
                    {destinationsCategory.category[0].title}
                    <BiChevronDown
                         className={`text-primary size-7 transform transition-all duration-300
                         ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`}
                    />
               </button>
          </div>
     )
}

export default DropdownMobile