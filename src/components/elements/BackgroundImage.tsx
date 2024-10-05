import { assets } from '../../assets/asset'

const BackgroundImage = () => {
     return (
          // <div className='absolute inset-0 min-h-screen max-w-full -z-10'>
          //      <div className='from-tertiary/80 to-transparent 
          //      bg-gradient-to-tr from-55% to-90% sm:from-60% sm:to-85%
          //      absolute inset-0' />
          //      <img src={assets.bgHome}
          //           className='object-cover w-full h-full'
          //           alt="bg-image" />
          // </div>
          <div className='absolute inset-0 -z-10 w-full h-[30rem] lg:h-full bg-red-400'>
               <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0' />
               <img src={assets.bgHome} alt=""
                    className='object-cover w-full h-full' />
          </div>
     )
}

export default BackgroundImage