import TextHeader from '../fragments/TextHeader'
import ButtonHeader from '../fragments/ButtonHeader'
import { textHeader } from '../../assets/asset'

const Header = () => {
     return (
          <div id='beranda' className='flex flex-col gap-y-10'>
               <TextHeader headerItems={{
                    item: {
                         title: textHeader.headerHome.title,
                         description: textHeader.headerHome.description
                    }
               }} />
               <ButtonHeader />
          </div>
     )
}

export default Header