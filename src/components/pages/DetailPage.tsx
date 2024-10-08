import { assets, cardStackAssets, textHeader, textListTime } from '../../assets/asset'
import TextHeader from '../fragments/TextHeader'
import DotDashCustom from '../fragments/DotDashCustom'
import CardStack from '../fragments/cards/CardStack'


const DetailPage = () => {
     return (
          <div className='flex flex-col gap-y-12'>
               <div className='relative min-h-[25rem] bg-cover bg-center w-full flex flex-col 
                    justify-center px-10 md:px-20 lg:min-h-screen' style={{ backgroundImage: `url(${assets.bgHome})` }}>
                    <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0 ' />
                    <div className='z-10'>
                         <TextHeader headerItems={{
                              item: {
                                   title: textHeader.headerDestinasi.title,
                                   description: textHeader.headerDestinasi.description
                              }
                         }} />
                    </div>
                    <div className='z-10 mt-5'>
                         <button className='bg-primary text-white w-24 py-2 text-sm font-medium rounded-md'>
                              Mulai Tur
                         </button>
                    </div>
               </div>
               <div className='flex justify-between gap-x-10 items-center lg:items-start px-10 md:px-14 mt-10'>
                    {/* Listtime */}
                    <div className='flex flex-col items-center gap-y-10 w-full lg:items-start'>
                         <h1 className='text-start text-secondary font-bold text-lg 
                                        md:text-xl w-72 md:w-[21.5rem] md:mx-auto
                                        md:text-center lg:text-start lg:mx-0 lg:text-2xl'>
                              Kapan Waktu Terbaik Untuk Pergi Ke Kawah Ijen?
                         </h1>
                         <div className='flex gap-x-6 h-[32rem] w-[20rem] md:h-[29rem] md:gap-x-7 md:w-[30rem] md:mx-auto lg:mx-0'>
                              <DotDashCustom />
                              <div className='flex flex-col h-full justify-between md:gap-y-[2.5rem] md:justify-start'>
                                   {
                                        textListTime.map((text, index) => (
                                             <div key={index} className='flex flex-col'>
                                                  <h3 className='text-base font-semibold text-tertiary text-opacity-90'>{text.title}</h3>
                                                  <p className='text-sm font-normal md:font-medium text-tertiary text-opacity-90'>{text.desc}</p>
                                             </div>
                                        ))
                                   }
                              </div>
                         </div>
                    </div>
                    {/* Image */}
                    <div className='hidden lg:block lg:mt-10 xl:mt-7 relative w-full h-[26rem] xl:h-[27rem]'>
                         <img src={assets.bgHome} className='object-cover h-full w-full rounded-tl-3xl rounded-br-3xl' alt="image" />
                         <div className='bg-blueCard bg-opacity-30 absolute w-80 h-[30rem] xl:h-[31rem] -top-8 right-0 -z-10' />
                    </div>
               </div>
               <div className='mt-10 md:mt-0 flex flex-col gap-y-16 px-10'>
                    <div className='flex flex-col gap-y-5'>
                         <h1 className='text-center text-xl font-bold w-60 mx-auto'>{cardStackAssets.cardTransport.cardTitle}</h1>
                         <CardStack
                              cardStackItems={{
                                   item: { value: cardStackAssets.cardTransport.value }
                              }} />
                    </div>
                    <div className='flex flex-col gap-y-5'>
                         <h1 className='text-center text-xl font-bold  w-60 mx-auto'>{cardStackAssets.cardHomestay.cardTitle}</h1>
                         <CardStack cardStackItems={{
                              item: { value: cardStackAssets.cardHomestay.value }
                         }} />
                    </div>
               </div>
          </div>
     )
}

export default DetailPage