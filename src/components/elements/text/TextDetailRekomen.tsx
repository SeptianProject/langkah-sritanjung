type TextDetailRekomenProps = {
     title: string
     description: string
}

const TextDetailRekomen = ({ title, description }: TextDetailRekomenProps) => {
     return (
          <div className="flex flex-col text-start">
               <h3 className="text-tertiary text-opacity-90 font-bold text-lg md:text-xl">
                    {title}
               </h3>
               <p className="text-tertiary text-opacity-80 font-medium text-sm lg:text-base">
                    {description}
               </p>
          </div>
     )
}

export default TextDetailRekomen