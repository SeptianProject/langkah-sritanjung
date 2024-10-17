import Input from './Input'
import { inputAssets } from '../../../assets/asset'
import { ChangeEvent } from 'react';

type SearchInputProps = {
     placeholder: string;
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
     onClick: () => void;
     value: string
}

const SearchInput = ({ placeholder, onClick, onChange, value }: SearchInputProps) => {
     return (
          <div className='relative w-64 lg:w-[30rem]'>
               <Input type='text'
                    placeholder={placeholder || inputAssets.search.placeholder}
                    onChange={onChange}
                    value={value}
                    className='py-3 px-4' />
               <button
                    onClick={onClick}
                    className='absolute right-3 top-3 text-white bg-secondary 
               h-6 px-1 lg:px-3 lg:right-6 text-xs font-light tracking-wide'>
                    Jelajahi
               </button>
          </div>
     )
}

export default SearchInput