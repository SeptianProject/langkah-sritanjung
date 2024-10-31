import TextAboutDestination from '../../fragments/TextAboutDestination'
import CardAboutDestination from '../../fragments/CardAboutDestination'
import StackImageDestination from '../../fragments/StackImagDestination'
import { BounceInLeft, BounceInRight } from '../../animation/BounceAnimate'

const HomeAbout = () => {
     return (
          <section id='tentang-kami' className='flex flex-col items-center px-10 
          lg:flex-row lg:justify-between lg:max-w-full lg:min-h-screen'>
               <BounceInRight delayVal={0.5}>
                    <StackImageDestination />
               </BounceInRight>
               <div className='relative flex flex-col gap-y-14 xl:w-[42rem] mx-auto'>
                    <BounceInLeft delayVal={0.5}>
                         <TextAboutDestination />
                    </BounceInLeft>
                    <BounceInRight delayVal={0.5}>
                         <CardAboutDestination />
                    </BounceInRight>
               </div>
          </section>
     )
}

export default HomeAbout