import DropdownItem from './DropdownItem'
import DropdownMobile from './DropdownMobile'
import DropdownDesktop from './DropdownDesktop'
import { useState } from 'react'

type CategoryItem = {
     id: number
     name: string
     slug: string
}

type DropdownButtonProps = {
     dropdownOpen: boolean
     handleDropdownOpen: () => void
     category: CategoryItem[]
}

const DropdownButton = ({ dropdownOpen, handleDropdownOpen, category }: DropdownButtonProps) => {
     const [selectedCategory, setSelectedCategory] = useState<CategoryItem>(category[1])

     const handleSelectCategory = (selected: CategoryItem) => {
          setSelectedCategory(selected) // Update state dengan kategori yang dipilih
        }
     
     return (
          <>
               <DropdownMobile dropdownOpen={dropdownOpen}
                    handleDropdownOpen={handleDropdownOpen} selectedCategory={selectedCategory} />
               <DropdownItem dropdownOpen={dropdownOpen} category={category} onSelectedCategory={handleSelectCategory}/>
               <DropdownDesktop categorys={ category } />
          </>
     )
}

export default DropdownButton