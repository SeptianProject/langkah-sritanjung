     import { useNavigate } from "react-router-dom"
     import { destinationsCategory } from "../../../assets/asset"

     type CategoryItem = {
          name: string
          slug: string
     }

     type itemProps = {
          categorys: CategoryItem[];
     }

     const DropdownDesktop = ({categorys}: itemProps) => {
          const navigate = useNavigate();

          const handleNavigation = (slug: string) => {
               navigate(`/?category=${slug}`); // Navigasi ke halaman yang sesuai berdasarkan slug
          };

          return (
               <div className='hidden md:flex justify-center mt-20 gap-x-5 lg:gap-x-10 lg:mt-16'>
                    {
                         categorys.map((item: CategoryItem, index: number) => (
                              <button 
                              key={index}
                              onClick={() => handleNavigation(item.slug)}
                              className='text-primary bg-white border border-primary 
                                        md:py-2 md:w-full lg:py-4 lg:w-40
                                        rounded-bl-xl rounded-tr-xl font-semibold'
                                        >
                                   {item.name}
                              </button>
                         ))
                    }
               </div>
          )
     }

     export default DropdownDesktop