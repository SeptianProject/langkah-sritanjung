import TextAboutDestination from '../../fragments/TextAboutDestination'
import CardAboutDestination from '../../fragments/CardAboutDestination'
import StackImageDestination from '../../fragments/StackImagDestination'

const HomeAbout = () => {
     return (
          <div className='flex flex-col items-center px-10
          md:mt-5 lg:flex-row lg:justify-between
          lg:max-w-full lg:min-h-screen'>
               <div className=''>
                    <StackImageDestination />
               </div>
               <div className='relative flex flex-col gap-y-14 xl:w-[42rem] mx-auto'>
                    <TextAboutDestination />
                    <CardAboutDestination />
               </div>
          </div>
     )
}

export default HomeAbout