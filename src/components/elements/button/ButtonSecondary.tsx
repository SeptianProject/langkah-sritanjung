
type ButtonSecondaryProps = {
     onClick?: () => void
     text: string
}

const ButtonSecondary = ({ onClick, text }: ButtonSecondaryProps) => {
     return (
          <button
               onClick={onClick}
               className='bg-secondary text-white border border-opacity-50 border-white py-1 w-24 rounded-bl-xl rounded-tr-xl text-sm'>
               {text}
          </button>
     )
}

export default ButtonSecondary