import { assets } from '../../assets/asset'
import CardBasic from '../layouts/cards/CardBasic'
import CardText from '../layouts/cards/CardText'
import Header from '../layouts/Header'

const LandingPage = () => {
  return (
    <div className='flex flex-col gap-y-24'>
      <div className='flex flex-col items-center'>
        <div className='relative min-h-[40rem] lg:min-h-screen w-full bg-cover bg-center
        flex flex-col justify-center px-10 md:px-20' style={{ backgroundImage: `url(${assets.bgHome})` }}>
          <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0 ' />
          <div className='z-10'>
            <Header />
          </div>
        </div>
        <div className='w-full'>
          <CardText />
        </div>
      </div>
      <div className='flex flex-col gap-y-14 items-center lg:min-h-screen'>
        <h1 className='text-xl font-bold w-80 text-center md:text-2xl md:w-96 lg:text-3xl lg:w-[30rem]'>Destinasi Wisata Terfavorit Bulan Ini</h1>
        <CardBasic />
      </div>
    </div >
  )
}

export default LandingPage