import { destinationsCard } from '../../../assets/asset'

const CardBasic = () => {
     return (
          <div className='grid grid-cols-1 gap-y-10 w-full px-10 md:grid-cols-2 md:gap-6
          lg:grid-rows-2 lg:grid-cols-3 lg:gap-4 transition-all duration-700'>
               {
                    destinationsCard.map((item, index) => {
                         const cardClass =
                              index === 0 ?
                                   'lg:row-span-2 lg:col-span-1 lg:h-full' :
                                   index === 3 ? 'lg:col-span-2' :
                                        'col-span-1 h-[18rem] w-full';
                         return (
                              <div key={index} className={`relative h-[18rem] rounded-xl ${cardClass} `}>
                                   <div className=''>
                                        <img className='absolute -z-10 w-full h-full object-cover rounded-2xl transform lg:object-bottom'
                                             src={item.img}
                                             alt={`card-${index}`} />
                                        <div className='bg-gradient-to-t from-tertiary/80 to-transparent from-40% to-80% absolute inset-0 rounded-2xl' />
                                   </div>
                                   <div className='flex flex-col gap-y-3 absolute bottom-5 left-5'>
                                        <h2 className='text-xl font-semibold text-white'>{item.title}</h2>
                                        <div className='flex gap-x-5'>
                                             <button className='text-white bg-primary rounded-bl-lg rounded-tr-lg px-2 py-1 font-medium text-sm'>Lihat Detail</button>
                                             <button className='text-white bg-primary rounded-bl-lg rounded-tr-lg px-2 py-1 font-medium text-sm'>Mulai Tur</button>
                                        </div>
                                   </div>
                              </div>
                         )
                    })
               }
          </div>
     )
}

export default CardBasic