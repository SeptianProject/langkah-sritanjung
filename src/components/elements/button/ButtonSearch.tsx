type ButtonSearchProps = {
  text: string,
  clasName?: string
}

const ButtonSearch = ({ text, clasName }: ButtonSearchProps) => {

  return (
    <button
      className={`bg-white rounded-bl-xl rounded-tr-xl 
    font-medium text-tertiary text-opacity-80 text-sm text-nowrap ${clasName}`}>
      {text}
    </button>
  )
}

export default ButtonSearch