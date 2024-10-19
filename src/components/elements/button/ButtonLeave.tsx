
interface ButtonLeaveProps {
     text: string
     onClick: () => void
}

const ButtonLeave = ({ text, onClick }: ButtonLeaveProps) => {
     return (
          <button onClick={onClick}
               className='text-white bg-primary rounded-bl-lg 
          rounded-tr-lg px-2 py-1 font-medium text-sm'>
               {text}
          </button>
     )
}

export default ButtonLeave