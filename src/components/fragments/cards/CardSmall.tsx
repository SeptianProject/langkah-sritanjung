type CardSmallProps = {
     title: string
     description: string
     className?: string
}

const CardSmall = ({ title, description, className }: CardSmallProps) => {
     return (
          <div className={`bg-white border border-primary w-full h-[6.7rem]
          rounded-bl-xl rounded-tr-xl flex flex-col items-start justify-center px-5 
          md:px-2 md:w-[13rem] md:h-20 lg:w-[11rem]
          ${className}`}>
               <h3 className='text-primary text-lg font-bold md:text-base'>{title}</h3>
               <p className='text-tertiary font-semibold text-base md:text-sm text-opacity-90'>{description}</p>
          </div>
     )
}

export default CardSmall