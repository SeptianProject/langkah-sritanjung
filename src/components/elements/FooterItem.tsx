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
          <div className='flex flex-col gap-y-2'>
               <h2 className='font-bold text-sm'>{footerItems.item.title}</h2>
               <div className={`${hasIcon ? ' flex-row gap-x-3' : 'flex-col gap-y-1'} flex`}>
                    {footerItems.item.value.map((item, index) => (
                         <Link className='text-xs font-normal'
                              key={index} to={item.link}>
                              {
                                   item.icon && <img src={item.icon} alt="icon" />
                                   || item.text && item.text
                              }
                         </Link>
                    ))}
               </div>
          </div>
     )
}

export default FooterItem