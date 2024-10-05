import Input from './Input'
import { inputAssets } from '../../../assets/asset'

const SearchInput = () => {
     return (
          <div className='relative w-64 lg:w-[30rem]'>
               <Input type='text'
                    placeholder={inputAssets.search.placeholder}
                    className='py-3 px-4' />
               <button className='absolute right-3 top-3 text-white bg-secondary 
               h-6 px-1 lg:px-3 lg:right-6 text-xs font-light tracking-wide'>
                    Jelajahi
               </button>
          </div>
     )
}

export default SearchInput