import DropdownItem from './DropdownItem'
import DropdownMobile from './DropdownMobile'
import DropdownDesktop from './DropdownDesktop'

type DropdownButtonProps = {
     dropdownOpen: boolean
     handleDropdownOpen: () => void
}

const DropdownButton = ({ dropdownOpen, handleDropdownOpen }: DropdownButtonProps) => {
     return (
          <>
               <DropdownMobile dropdownOpen={dropdownOpen}
                    handleDropdownOpen={handleDropdownOpen} />
               <DropdownItem dropdownOpen={dropdownOpen} />
               <DropdownDesktop />
          </>
     )
}

export default DropdownButton