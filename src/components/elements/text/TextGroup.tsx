import { destinationsCategory } from '../../../assets/asset'
import { BounceInBottom } from '../../animation/BounceAnimate'

const TextGroup = () => {
     return (
          <div className='flex flex-col items-center text-center mx-auto gap-y-3 lg:mt-14'>
               <BounceInBottom delayVal={0}>
                    <h1 className='text-xl font-bold text-tertiary text-opacity-90 w-full
                              md:w-80 md:text-xl lg:text-3xl lg:w-[30rem]'>
                         {destinationsCategory.desTitle}
                    </h1>
               </BounceInBottom>
               <BounceInBottom delayVal={0.5}>
                    <p className='text-[13px] font-medium text-tertiary 
                    px-5 lg:text-lg lg:w-[52rem]'>
                         {destinationsCategory.description}
                    </p>
               </BounceInBottom>
          </div>
     )
}

export default TextGroup