/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../elements/Core';
import { useNavigate } from 'react-router-dom';
import ButtonLeave from '../../elements/button/ButtonLeave';
import Loading from 'react-loading';

interface ListDestination {
     id: number;
     name: string;
     slug: string;
     image: {
          url: string;
          name: string;
     }
}

const BentoGrid = () => {
     const navigate = useNavigate()
     const [destinations, setDestinations] = useState<ListDestination[]>([])
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          const fetchDestinations = async () => {
               setLoading(true)
               try {
                    const response = await axios.get(`${baseUrl}/destinasi-wisatas?sort=id:asc`)
                    const data = response.data
                    const formattedData = data.map((item: any) => ({
                         id: item.id,
                         name: item.name,
                         slug: item.slug,
                         image: {
                              url: item.image?.url,
                              name: item.image?.name
                         }
                    }))
                    setDestinations(formattedData)
               } catch (error) {
                    console.error(error)
               } finally {
                    setLoading(false)
               }
          }
          fetchDestinations()
     }, [])

     const handleClickDetail = (slug: string) => {
          navigate(`/detail/${slug}`)
     }

     const handleClickToure = (slug: string) => {
          navigate(`/tour-guide/${slug}`)
     }

     if (!destinations || loading) return (
          <Loading className="text-center w-full mx-auto"
               color="#EA8104"
               height={50}
               width={50}
               type="cylon" />
     )

     return (
          <div className='w-full px-10'>
               <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-rows-2
               lg:grid-cols-3 md:h-[calc(100vh-50px)] transition-all duration-700'>
                    {destinations.slice(0, 4).map((item, index) => {
                         return (
                              <div key={item.id}
                                   className={`relative rounded-xl overflow-hidden h-64 md:h-auto
                              ${index === 0 ? 'md:col-span-1 md:row-span-2' :
                                             index === 3 ? 'md:col-span-2 md:row-span-1' : ''}`}>
                                   <img className='absolute inset-0 w-full h-full object-cover'
                                        src={item.image.url}
                                        alt={item.name} />
                                   <div className='absolute inset-0 bg-gradient-to-t from-tertiary/90 to-transparent' />
                                   <div className='absolute bottom-5 left-5 right-5'>
                                        <h2 className='text-xl font-semibold text-white mb-3'>{item.name}</h2>
                                        <div className='flex flex-row space-x-4'>
                                             <ButtonLeave text='Lihat Detail' onClick={() => handleClickDetail(item.slug)} />
                                             <ButtonLeave text='Mulai Tur' onClick={() => handleClickToure(item.slug)} />
                                        </div>
                                   </div>
                              </div>
                         )
                    })}
               </div>
          </div>
     )
}

export default BentoGrid