import { useNavigate } from "react-router-dom"

type ButtonSearchProps = {
  text: string,
  clasName?: string
  destination: string
}

const ButtonSearch = ({ text, clasName, destination }: ButtonSearchProps) => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/tour-guide/${destination}`)
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