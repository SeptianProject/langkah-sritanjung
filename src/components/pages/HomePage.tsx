import { assets } from '../../assets/asset'
import CardText from '../fragments/cards/CardText'
import Header from '../layouts/Header'
import HomeDestination from '../layouts/home/HomeDestination'
import HomeAbout from '../layouts/home/HomeAbout'

const HomePage = () => {


     return (
          <div className='flex flex-col gap-y-20'>
               {/* Header */}
               <section className='flex flex-col items-center'>
                    <div className='relative min-h-[40rem] lg:min-h-screen w-full bg-cover bg-center
                         flex flex-col justify-center px-10 md:px-20' style={{ backgroundImage: `url(${assets.bgHome})` }}>
                         <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0 ' />
                         <div className='z-10'>
                              <Header />
                         </div>
                    </div>
                    <div className='w-full'>
                         <CardText />
                    </div>
               </section>
               {/* Destination */}
               <HomeDestination />
               {/* About */}
               <HomeAbout />
          </div >
     )
}

export default HomePage