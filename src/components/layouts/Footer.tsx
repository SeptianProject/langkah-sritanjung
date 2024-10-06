import { footerAssets } from '../../assets/asset'
import FooterItems from '../fragments/FooterItems'

const Footer = () => {
     return (
          <footer className='container max-w-full mx-auto mt-32 mb-20 px-10 md:px-20'>
               <div className='lg:flex items-center gap-x-10'>
                    <div className='hidden lg:block w-40'>
                         <img src={footerAssets.logo} alt="" />
                    </div>
                    <FooterItems />
               </div>
               <div className='mt-20 flex flex-col items-center gap-y-10'>
                    <div className='h-[1px] w-full bg-tertiary' />
                    <p className='text-sm font-normal tracking-wide text-tertiary md:text-base md:font-medium'>{footerAssets.textFooter}</p>
               </div>
          </footer>
     )
}

export default Footer