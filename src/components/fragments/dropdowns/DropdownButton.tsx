import DropdownItem from './DropdownItem'
import DropdownMobile from './DropdownMobile'
import DropdownDesktop from './DropdownDesktop'

type CategoryItem = {
     name: string
     slug: string
}

type DropdownButtonProps = {
     dropdownOpen: boolean
     handleDropdownOpen: () => void
     category: CategoryItem[]
}

const DropdownButton = ({ dropdownOpen, handleDropdownOpen, category }: DropdownButtonProps) => {
     return (
          <>
               <DropdownMobile dropdownOpen={dropdownOpen}
                    handleDropdownOpen={handleDropdownOpen} />
               <DropdownItem dropdownOpen={dropdownOpen} />
               <DropdownDesktop categorys={ category } />
          </>
     )
}

export default DropdownButton