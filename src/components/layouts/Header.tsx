import TextHeader from '../fragments/TextHeader'
import ButtonHeader from '../fragments/ButtonHeader'

const Header = () => {
     return (
          <div className='flex flex-col gap-y-10'>
               <TextHeader />
               <ButtonHeader />
          </div>
     )
}

export default Header