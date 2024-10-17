import { ChangeEvent } from "react"

type InputProps = {
     placeholder: string,
     type?: string,
     className?: string
     value: string,
     onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ placeholder, type, className, value, onChange }: InputProps) => {
     return (
          <input
               type={type}
               autoComplete='off'
               className={`bg-white rounded-bl-xl rounded-tr-xl 
               font-medium text-tertiary text-opacity-80 placeholder:text-tertiary 
               placeholder:opacity-80 outline-none border-none pr-20
               text-base w-full ${className}`}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
          />
     )
}

export default Input