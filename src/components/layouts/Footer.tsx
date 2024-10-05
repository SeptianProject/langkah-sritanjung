import { footerAssets } from '../../assets/asset'
import FooterItems from '../fragments/FooterItems'

const Footer = () => {
     return (
          <footer className='container mx-auto my-20 px-10'>
               <div className='lg:flex items-center gap-x-10'>
                    <div className='hidden lg:block'>
                         <img src={footerAssets.logo} alt="" />
                    </div>
                    <FooterItems />
               </div>
               <div className='mt-10 flex flex-col items-center gap-y-5'>
                    <div className='h-[0.5px] w-full bg-tertiary' />
                    <p className='text-sm font-normal tracking-wide text-tertiary'>{footerAssets.textFooter}</p>
               </div>
          </footer>
     )
}

export default Footer