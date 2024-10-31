import Input from './Input'
import { inputAssets } from '../../../assets/asset'
import { ChangeEvent, FormEvent, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

type SearchInputProps = {
     placeholder: string;
     destinations: Array<{
          path: string;
          text: string;
     }>;
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
     value: string
}

const SearchInput = ({ placeholder, destinations, onChange, value }: SearchInputProps) => {
     const navigate = useNavigate()
     const [isScrollSearch, setIsScrollSearch] = useState(false)

     const handleSearchLogic = (searchTerm: string) => {
          const normalizedSearch = searchTerm.toLowerCase().trim();

          if (normalizedSearch === "pantai"
               || normalizedSearch === "gunung"
               || normalizedSearch === "air"
               || normalizedSearch === "air terjun"
               || normalizedSearch === "hutan"
               || normalizedSearch === "desa"
               || normalizedSearch === "taman") {
               setIsScrollSearch(true);
               return {
                    action: 'scroll',
                    target: 'dropdown-card'
               };
          } else {
               setIsScrollSearch(false)
          }


          const matchDestination = destinations.find(dest =>
               dest.text.toLowerCase().includes(normalizedSearch)
          )

          if (matchDestination) {
               setIsScrollSearch(false);
               return {
                    action: 'navigate',
                    target: `/detail/${matchDestination.path}`
               }
          }

          setIsScrollSearch(true)
          return {
               action: 'scroll',
               target: 'dropdown-card'
          }
     }

     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const result = handleSearchLogic(value)

          if (result.action === 'navigate') {
               navigate(result.target);
          } else {
               const element = document.getElementById(result.target);
               if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
               }
          }
     }

     const handleClick = () => {
          const result = handleSearchLogic(value);

          if (result.action === 'navigate') {
               navigate(result.target);
          }
     };

     return (
          <form onSubmit={handleSubmit} className='relative w-64 lg:w-[30rem]'>
               <Input type='text'
                    placeholder={placeholder || inputAssets.search.placeholder}
                    onChange={onChange}
                    value={value}
                    className='py-3 px-4' />
               {isScrollSearch ? (
                    <button onClick={handleClick} type='submit'>
                         <Link to='dropdown-card' spy={true}
                              offset={100} duration={1000} smooth={true}
                              className='absolute right-3 top-3 flex items-center justify-center 
                    text-white bg-secondary h-6 px-1 lg:px-3 lg:right-6
                    text-xs font-light tracking-wide'>
                              Jelajahi
                         </Link>
                    </button>
               ) : (
                    <button onClick={handleClick} type='submit'
                         className='absolute right-3 top-3 flex items-center justify-center 
                    text-white bg-secondary h-6 px-1 lg:px-3 lg:right-6
                    text-xs font-light tracking-wide'>
                         Jelajahi
                    </button>

               )}
          </form>
     )
}

export default SearchInput