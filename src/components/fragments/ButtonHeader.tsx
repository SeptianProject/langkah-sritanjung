import SearchInput from '../elements/input/SearchInput'
import ButtonSearch from '../elements/button/ButtonSearch'
import { textButton } from '../../assets/asset'
import { useEffect, useState } from 'react'

const ButtonHeader = () => {
     const [isDesktop, setIsDesktop] = useState<boolean>(false)

     const handleResize = () => {
          if (window.innerWidth >= 1024) {
               setIsDesktop(true)
          } else {
               setIsDesktop(false)
          }
     }

     useEffect(() => {
          handleResize()
          window.addEventListener('resize', handleResize)
          return () => window.removeEventListener('resize', handleResize)
     })

     return (
          <div className=''>
               <SearchInput />
               <div className='mt-4 flex gap-x-4'>
                    <ButtonSearch
                         text={textButton.search.search1}

                         clasName='px-4 py-2' />
                    <ButtonSearch
                         text={textButton.search.search2}
                         clasName='px-4 py-2' />
                    {isDesktop ?
                         <ButtonSearch
                              text={textButton.search.search3}
                              clasName='px-4 py-2' />
                         : null}
               </div>
          </div>
     )
}

export default ButtonHeader