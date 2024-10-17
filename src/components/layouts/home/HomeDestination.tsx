import { useState } from 'react'
import CardBasic from '../../fragments/cards/CardBasic'
import TextGroup from '../../elements/text/TextGroup'
import DropdownButton from '../../fragments/dropdowns/DropdownButton'
import CardHomestay from '../cards/CardHomestay'
import { Element } from 'react-scroll'

type CategoryItem = {
     name: string
     slug: string
}

interface DestinasiWisata {
     id: number;
  attributes: {
    name: string;
    slug: string;
    image: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }
}

interface KategoriDetail {
     id: number;
  attributes: {
    name: string;
    slug: string;
    destinasi_wisatas: {
      data: DestinasiWisata[];
    }
  }
}

type categoryProps = {
     category: CategoryItem[]
}


const HomeDestination = (
     { category } : categoryProps
) => {
     const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)


     const handleDropdownOpen = () => {
          setDropdownOpen(!dropdownOpen)
          console.log(category)
     }

     return (
          <Element name='destinasi' className='flex flex-col gap-y-20'>
               {/* Card Bento grid */}
               <div className='flex flex-col gap-y-14 items-center lg:min-h-screen'>
                    <h1 className='text-xl xs:text-2xl font-bold w-80 xs:w-96 text-center 
                    md:text-3xl md:w-96 lg:text-3xl lg:w-[30rem]'>
                         Destinasi Wisata Terfavorit Bulan Ini
                    </h1>
                    <CardBasic />
               </div>
               {/* Cardtext blue Dropdown */}
               <div className='lg:min-h-full lg:w-full px-10 lg:mt-10'>
                    <div className='relative bg-blueCard bg-opacity-20 
                    w-full h-60 lg:h-80
                    rounded-2xl py-5 px-2 sm:px-5'>
                         <TextGroup />
                         <DropdownButton dropdownOpen={dropdownOpen} handleDropdownOpen={handleDropdownOpen} category={category} />
                    </div>
               </div>
               {/* Homestay Card */}
               <div className={`lg:min-h-screen px-10 lg:mt-20 ${dropdownOpen ? 'mt-60' : 'mt-0'} transition-all duration-300`}>
                    <CardHomestay />
               </div>
          </Element>
     )
}

export default HomeDestination