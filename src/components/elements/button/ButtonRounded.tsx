
type ButtonRoundedProps = {
     text: string
     className?: string
     destination: string
}

const ButtonRounded = ({ text, className, }: ButtonRoundedProps) => {

     return (
          <button
               className={`bg-secondary text-white rounded-lg py-2 px-5 
               text-sm font-light ${className}`}>
               {text}
          </button>
     )
}

export default ButtonRounded