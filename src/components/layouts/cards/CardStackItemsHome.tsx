type CardStackProps = {
     cardStackItems: {
          id: string
          name: string
          image: {
               url: string
               name: string
          }
     }[]
}

const CardStackItemsHome = ({ cardStackItems }: CardStackProps) => {
     return (
          <>
               {
                    cardStackItems.map((item) => (
                         <div key={item.id} >
                              <div className='relative bg-cover bg-center  min-h-96 md:min-h-[26rem] lg:min-h-[28rem] xl:min-h-[30rem]' style={{ backgroundImage: `url(${item.image.url})` }}>
                                   <div className='absolute top-0 left-0 bg-primary py-2 px-3 rounded-br-2xl'>
                                        <h4 className='text-white text-sm'>{item.name}</h4>
                                   </div>
                                   <div className='absolute bottom-0 bg-tertiary bg-opacity-85 w-full flex flex-col gap-y-3 py-5 items-center rounded-t-3xl'>
                                        <h2 className='text-lg font-semibold text-white'>{item.name}</h2>
                                        <div className='flex gap-x-3 w-full items-center justify-center'>
                                             <button className='bg-secondary text-white border border-opacity-50 border-white py-1 w-24 rounded-bl-xl rounded-tr-xl text-sm'>Lihat Detail</button>
                                             <button className='bg-secondary text-white border border-opacity-50 border-white py-1 w-24 text-sm rounded-bl-xl rounded-tr-xl'>Hubungi</button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    ))
               }
          </>
     )
}

export default CardStackItemsHome