
import BackgroundImage from '../elements/BackgroundImage'
import CardBasic from '../layouts/cards/CardBasic'
import CardText from '../layouts/cards/CardText'
import Header from '../layouts/Header'

const HomePage = () => {
  return (
    <div className='flex flex-col mx-auto overflow-hidden '>
      <BackgroundImage />
      <div>
        <div className='mt-10 px-10 md:px-14 lg:px-20 md:mt-16 lg:mt-32'>
          <Header />
        </div>
        <div className='mt-[7.5rem] sm:mt-[8.7rem] lg:mt-[11.5rem]'>
          <CardText />
        </div>
      </div>
      <div className='flex flex-col gap-y-10 items-center mt-32'>
        <h1 className='text-xl font-bold w-80 text-center lg:text-3xl lg:w-[30rem]'>Destinasi Wisata Terfavorit Bulan Ini</h1>
        <CardBasic />
      </div>
    </div>
  )
}

export default HomePage