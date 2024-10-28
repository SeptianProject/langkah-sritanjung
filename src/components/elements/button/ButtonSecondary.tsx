
type ButtonSecondaryProps = {
     onClick?: () => void
     text: string
}

const ButtonSecondary = ({ onClick, text }: ButtonSecondaryProps) => {
     return (
          <button
               onClick={onClick}
               className='bg-secondary text-white border border-opacity-50 border-white 
               py-2 w-28 lg:w-32  rounded-bl-xl rounded-tr-xl text-sm'>
               {text}
          </button>
     )
}

export default ButtonSecondary