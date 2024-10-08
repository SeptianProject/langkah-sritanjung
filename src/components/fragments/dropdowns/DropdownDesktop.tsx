import { destinationsCategory } from "../../../assets/asset"

const DropdownDesktop = () => {
     return (
          <div className='hidden md:flex justify-center mt-20 gap-x-5 lg:gap-x-10 lg:mt-16'>
               {
                    destinationsCategory.category.map((item, index) => (
                         <button key={index}
                              className='text-primary bg-white border border-primary 
                                        md:py-2 md:w-full lg:py-4 lg:w-40
                                        rounded-bl-xl rounded-tr-xl font-semibold'>
                              {item.title}
                         </button>
                    ))
               }
          </div>
     )
}

export default DropdownDesktop