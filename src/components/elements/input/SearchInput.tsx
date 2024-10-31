import Input from './Input'
import { inputAssets } from '../../../assets/asset'
import { ChangeEvent, FormEvent, } from 'react';
// import { Link } from 'react-scroll';

type SearchInputProps = {
     placeholder: string;
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
     onSearch: (value: string) => void;
     value: string
}

const SearchInput = ({ placeholder, onSearch, onChange, value }: SearchInputProps) => {
     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSearch(value)
     }

     const handleClick = () => {
          onSearch(value)
     }

     return (
          <form onSubmit={handleSubmit} className='relative w-64 lg:w-[30rem]'>
               <Input type='text'
                    placeholder={placeholder || inputAssets.search.placeholder}
                    onChange={onChange}
                    value={value}
                    className='py-3 px-4' />
               <button onClick={handleClick} type='submit'
                    className='absolute right-3 top-3 flex items-center justify-center 
                    text-white bg-secondary h-6 px-1 lg:px-3 lg:right-6
                    text-xs font-light tracking-wide'>
                    Jelajahi
               </button>
               {/* <Link to='dropdown-card' onClick={handleClick} type='submit'
                    className='absolute right-3 top-3 flex items-center justify-center 
                    text-white bg-secondary h-6 px-1 lg:px-3 lg:right-6
                    text-xs font-light tracking-wide'>
                    Jelajahi
               </Link> */}
          </form>
     )
}

export default SearchInput