import { footerAssets } from "../../assets/asset"
import FooterItem from "../elements/FooterItem"


const FooterItems = () => {
     return (
          <div className='flex flex-col lg:flex-row lg:gap-x-20 gap-y-10'>
               <div className='flex lg:gap-x-20 justify-between'>
                    <FooterItem
                         footerItems={{
                              item: {
                                   title: footerAssets.menu.title,
                                   value: footerAssets.menu.value
                              }
                         }} />
                    <FooterItem
                         footerItems={{
                              item: {
                                   title: footerAssets.more.title,
                                   value: footerAssets.more.value
                              }
                         }} />
               </div>
               <FooterItem
                    footerItems={{
                         item: {
                              title: footerAssets.contact.title,
                              value: footerAssets.contact.value
                         }
                    }} />
          </div>
     )
}

export default FooterItems