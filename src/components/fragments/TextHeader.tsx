import { BounceInBottom, BounceInRight } from "../animation/BounceAnimate"

type TextHeaderProps = {
     headerItems: {
          item: {
               title: string
               description: string
          }
     }
}

const TextHeader = ({ headerItems }: TextHeaderProps) => {
     return (
          <div className='text-white flex flex-col justify-center gap-y-2 '>
               <BounceInRight delayVal={0}>
                    <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-6xl">
                         {headerItems.item.title}
                    </h1>
               </BounceInRight>
               <BounceInBottom delayVal={0}>
                    <p className='w-80 text-base font-extralight tracking-wide mt-2
                    sm:w-[30rem] md:text-lg md:w-[31rem] lg:text-2xl lg:w-[45rem] lg:tracking-wider'>
                         {headerItems.item.description}
                    </p>
               </BounceInBottom>
          </div>
     )
}

export default TextHeader