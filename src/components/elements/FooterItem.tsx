import { Link } from 'react-router-dom'

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
               <div className={`${hasIcon ? ' flex-row gap-x-3 md:gap-x-4' : 'flex-col gap-y-1 md:gap-y-2'} flex`}>
                    {footerItems.item.value.map((item, index) => (
                         <Link className='text-sm text-tertiary font-normal md:font-medium lg:text-base
                         text-opacity-80 hover:text-opacity-100 transition duration-300'
                              key={index} to={item.link}>
                              {
                                   item.icon && <img src={item.icon} className='size-5 md:size-10' alt="icon" />
                                   || item.text && item.text
                              }
                         </Link>
                    ))}
               </div>
          </div>
     )
}

export default FooterItem