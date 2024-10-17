

type ButtonSearchProps = {
  text: string,
  clasName?: string
  onSearch: (text: string) => void
}

const ButtonSearch = ({ text, clasName, onSearch }: ButtonSearchProps) => {

  const handleOnClick = () => {
    onSearch(text)
  }

  return (
    <button
      onClick={handleOnClick}
      className={`bg-white rounded-bl-xl rounded-tr-xl 
    font-medium text-tertiary text-opacity-80 text-sm text-nowrap ${clasName}`}>
      {text}
    </button>
  )
}

export default ButtonSearch