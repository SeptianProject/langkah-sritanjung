import { assets } from "../../assets/asset";

const StackImageDestination = () => {
     return (
          <div className='relative w-80 h-[24rem] 
          md:hidden lg:block lg:w-[21rem] lg:h-[25rem] xl:w-[28rem] xl:h-[36rem]'>
               <img src={assets.mountOrange}
                    className='w-72 h-[22rem] lg:w-[19rem] lg:h-[23rem] xl:w-[26rem] xl:h-[34rem] 
                    object-cover rounded-3xl'
                    alt="Background" />
               <img src={assets.gandrung}
                    className='absolute bottom-0 right-0 w-52 h-60 rounded-3xl object-cover  
                    lg:h-64 lg:w-[13.2rem] xl:w-64 xl:h-80'
                    alt="Foreground" />
          </div>
     )
}

export default StackImageDestination;