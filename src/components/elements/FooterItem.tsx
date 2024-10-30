import { Link } from "react-scroll"


type FooterItemsProps = {
     footerItems: {
          item: {
               title: string,
               value: {
                    text?: string,
                    icon?: string,
                    link: string
               }[]
          }
     }
}

const FooterItem = ({ footerItems }: FooterItemsProps) => {
     const hasIcon = footerItems.item.value.some((item) => item.icon)

     return (
          <div className='flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-4'>
               <h2 className='font-bold text-sm md:text-base lg:text-lg text-tertiary text-opacity-90'>{footerItems.item.title}</h2>
               <div className={`flex ${hasIcon
                    ? 'flex-row items-center justify-start gap-x-3 md:gap-x-4'
                    : 'flex-col gap-y-1 md:gap-y-2'}`}>
                    {footerItems.item.value.map((item, index) => (
                         <Link key={index} to={item.link} smooth={true} offset={-50} duration={500}
                              className={`text-sm text-tertiary font-normal md:font-medium 
                         lg:text-base w-fit text-opacity-80 hover:text-opacity-100
                         transition duration-300 cursor-pointer
                         ${hasIcon ? 'inline-flex items-center justify-center' : 'w-fit'}
                         ${item.icon ? 'hover:scale-105' : 'hover:translate-x-1'}`}>
                              {item.icon ? (
                                   <img className='size-5 md:size-12 hover:scale-105'
                                        alt={`icon-${index}`} src={item.icon} />
                              ) : (
                                   item.text
                              )}
                         </Link>
                    ))}
               </div>
          </div>
     )
}

export default FooterItem