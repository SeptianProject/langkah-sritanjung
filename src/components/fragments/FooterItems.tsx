import { footerAssets } from "../../assets/asset"
import FooterItem from "../elements/FooterItem"


const FooterItems = () => {
     return (
          <div className='flex flex-col gap-y-10 md:flex-row md:justify-between xl:gap-x-5'>
               <div className='flex w-full justify-between md:justify-start md:gap-x-24'>
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