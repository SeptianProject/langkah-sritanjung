type ButtonPrimaryProps = {
     text: string
     onClick: () => void
}

const ButtonPrimary = ({ text, onClick }: ButtonPrimaryProps) => {


     return (
          <button onClick={onClick} className="text-white bg-primary text-sm 
          font-light rounded py-1 px-2">
               {text}
          </button>
     )
}

export default ButtonPrimary