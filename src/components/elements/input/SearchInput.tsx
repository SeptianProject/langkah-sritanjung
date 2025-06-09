import Input from './Input'
import { inputAssets } from '../../../assets/asset'
import { ChangeEvent, FormEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import { Destination } from '../../../types/common';

type SearchInputProps = {
     placeholder: string;
     destinations: Destination[] | undefined;
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
     value: string;
}

const CATEGORY_KEYWORDS = [
     'pantai', 'gunung', 'air', 'air terjun', 'hutan', 'desa', 'taman'
];

const SearchInput = ({ placeholder, destinations = [], onChange, value }: SearchInputProps) => {
     const navigate = useNavigate();

     const searchResult = useMemo(() => {
          const normalizedSearch = value.toLowerCase().trim();
          if (!normalizedSearch) return null;

          if (CATEGORY_KEYWORDS.includes(normalizedSearch)) {
               return { action: 'scroll', target: 'dropdown-card' };
          }

          const matchDestination = destinations.find(dest =>
               dest.name.toLowerCase().includes(normalizedSearch) ||
               (dest.name && dest.name.toLowerCase().includes(normalizedSearch))
          );

          if (matchDestination) {
               return {
                    action: 'navigate',
                    target: `/detail/${matchDestination.slug}`
               };
          }

          return { action: 'scroll', target: 'dropdown-card' };
     }, [value, destinations]);

     const isScrollAction = searchResult?.action === 'scroll';

     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!searchResult) return;

          if (searchResult.action === 'navigate') {
               navigate(searchResult.target);
          } else {
               const element = document.getElementById(searchResult.target);
               if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
               }
          }
     }

     const handleClick = () => {
          if (searchResult?.action === 'navigate') {
               navigate(searchResult.target);
          }
     };

     return (
          <form onSubmit={handleSubmit} className='relative w-64 lg:w-[30rem]'>
               <Input
                    type='text'
                    placeholder={placeholder || inputAssets.search.placeholder}
                    onChange={onChange}
                    value={value}
                    className='py-3 px-4'
               />
               {isScrollAction ? (
                    <button type='submit'>
                         <Link
                              to='dropdown-card'
                              spy={true}
                              offset={100}
                              duration={1000}
                              smooth={true}
                              className='absolute right-3 top-3 flex items-center justify-center 
                              text-white bg-secondary h-6 px-1 lg:px-3 lg:right-6
                              text-xs font-light tracking-wide'
                         >
                              Jelajahi
                         </Link>
                    </button>
               ) : (
                    <button
                         onClick={handleClick}
                         type='submit'
                         className='absolute right-3 top-3 flex items-center justify-center 
                         text-white bg-secondary h-6 px-1 lg:px-3 lg:right-6
                         text-xs font-light tracking-wide'
                    >
                         Jelajahi
                    </button>
               )}
          </form>
     );
};

export default SearchInput;