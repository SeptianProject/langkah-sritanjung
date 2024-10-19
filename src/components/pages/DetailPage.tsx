/* eslint-disable @typescript-eslint/no-explicit-any */
import { assets, cardStackAssets, textHeader } from '../../assets/asset'
import TextHeader from '../fragments/TextHeader'
import DotDashCustom from '../fragments/DotDashCustom'
import CardStack from '../fragments/cards/CardStack'
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../elements/Core';
import ActionCard from '../layouts/detail/ActionCard';
import Loading from 'react-loading';

type CardDestination = {
     name: string,
     desc: string,
     address: string,
     telp: string,
     price: string,
     url: string,
     slug: string,
     image: {
          url: string,
          name: string
     }
}

interface DestinationDetail {
     name: string;
     image: string;
     main: {
          title: string,
          timelist: {
               title: string,
               desc: string
          }[],
          actions: {
               title: string
          }[]
     },
     transportasis: CardDestination[],
     homestays: CardDestination[],
     kuliners: CardDestination[]
}

interface LoadingProps {
     setIsLoading: (isLoading: boolean) => void
}

const DetailPage = ({ setIsLoading }: LoadingProps) => {
     const { slug } = useParams<{ slug: string }>()
     const navigate = useNavigate()
     const [destinationDetail, setDestinationDetail] = useState<DestinationDetail | null>(null)
     const [loading, setLoading] = useState(true)

     const fetchDestinationDetail = useCallback(async () => {
          setIsLoading(true)
          setLoading(true)
          try {
               const response = await axios.get(`${baseUrl}/destinasi-wisatas/${slug}`)
               const data = response.data.data.attributes

               setDestinationDetail({
                    name: data.name,
                    image: data.image?.data?.attributes?.url || assets.bgHome,
                    main: {
                         title: data.main.title,
                         timelist: data.main.timelist.map((item: any) => ({
                              title: item.title,
                              desc: item.description
                         })),
                         actions: data.main.actions.map((item: any) => ({
                              title: item.title
                         }))
                    },
                    transportasis: data.transportasis.data.map((item: any) => ({
                         name: item.attributes.name,
                         desc: item.attributes.description,
                         address: item.attributes.address,
                         telp: item.attributes.noTelp,
                         price: item.attributes.price,
                         url: item.attributes.url,
                         slug: item.attributes.slug,
                         image: {
                              url: item.attributes.image?.data?.attributes?.url,
                              name: item.attributes.image?.data?.attributes?.name
                         }
                    })),
                    homestays: data.homestays.data.map((item: any) => ({
                         name: item.attributes.name,
                         desc: item.attributes.description,
                         address: item.attributes.address,
                         telp: item.attributes.telp,
                         price: item.attributes.price,
                         url: item.attributes.url,
                         slug: item.attributes.slug,
                         image: {
                              url: item.attributes.image?.data?.attributes?.url,
                              name: item.attributes.image?.data?.attributes?.name
                         }
                    })),
                    kuliners: data.kuliners.data.map((item: any) => ({
                         name: item.attributes.name,
                         desc: item.attributes.description,
                         address: item.attributes.address,
                         telp: item.attributes.telp,
                         price: item.attributes.price,
                         url: item.attributes.url,
                         slug: item.attributes.slug,
                         image: {
                              url: item.attributes.image?.data?.attributes?.url,
                              name: item.attributes.image?.data?.attributes?.name
                         }
                    }))
               })
          } catch (error) {
               console.error(error)
          } finally {
               setIsLoading(false)
               setLoading(false)
          }
     }, [slug, setIsLoading])

     useEffect(() => {
          fetchDestinationDetail()
     }, [fetchDestinationDetail])

     const handleDetailClick = (item: CardDestination, type: 'transportasi' | 'homestay' | 'kuliner') => {
          navigate(`/detail/${slug}/${type}/${item.slug}`);
     };

     const handleContactClick = (url: string) => {
          if (url) {
               window.open(url, '_blank');
          }
     };

     if (!destinationDetail || loading) {
          return <div>
               <Loading className="min-h-screen flex justify-center items-center m-auto"
                    color="#EA8104"
                    height={60}
                    width={60}
                    type="cylon" />
          </div>
     }

     return (
          <div className='flex flex-col gap-y-12'>
               <div className='relative min-h-[25rem] lg:min-h-[30rem] xl:min-h-[35rem] bg-cover bg-center w-full flex flex-col 
                    justify-center px-10 md:px-20' style={{ backgroundImage: `url(${destinationDetail.image})` }}>
                    <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0 ' />
                    <div className='z-10'>
                         <TextHeader headerItems={{
                              item: {
                                   title: destinationDetail.name,
                                   description: textHeader.headerDestinasi.description
                              }
                         }} />
                    </div>
                    <div className='z-10 mt-5'>
                         <button
                              onClick={() => navigate(`/loading-tour/${slug}`)}
                              className='bg-primary text-white w-24 py-2 text-sm font-medium rounded-md'>
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
                              {destinationDetail.main.title}
                         </h1>
                         <div className='flex gap-x-6 h-[32rem] w-[20rem] md:h-[29rem] md:gap-x-7 md:w-[30rem] md:mx-auto lg:mx-0'>
                              <DotDashCustom itemCount={destinationDetail.main.timelist.length} />
                              <div className='flex flex-col h-full justify-between md:gap-y-[2.5rem] md:justify-start'>
                                   {
                                        destinationDetail.main.timelist.map((text, index) => (
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
                         <img src={destinationDetail.image} className='object-cover h-full w-full rounded-tl-3xl rounded-br-3xl' alt="image" />
                         <div className='bg-blueCard bg-opacity-30 absolute w-80 h-[30rem] xl:h-[31rem] -top-8 right-0 -z-10' />
                    </div>
               </div>
               {/* List Places Rekomen */}
               <div className='flex flex-col gap-y-10 px-10'>
                    <h1
                         className="text-xl text-center font-bold w-60 md:w-80 mx-auto">
                         Hal Yang Bisa Kamu Lakukan Di Tempat Ini
                    </h1>
                    <ActionCard
                         actionItems={{
                              item: {
                                   value: destinationDetail.main.actions.map((action) => ({
                                        title: action.title
                                   }))
                              }
                         }}
                    />
               </div>
               <div className='mt-10 md:mt-6 flex flex-col gap-y-16 px-5'>
                    {/* Transportasi */}
                    <div className='flex flex-col gap-y-5'>
                         <h1 className='text-center text-xl font-bold w-60  sm:w-full mx-auto'>{cardStackAssets.cardTransport.cardTitle}</h1>
                         <CardStack
                              cardStackItems={{
                                   item: {
                                        value: destinationDetail.transportasis.map((transport) => ({
                                             id: transport.slug!,
                                             img: transport.image.url,
                                             title: transport.name,
                                             price: transport.price,
                                             onDetailClick: () => handleDetailClick(transport, 'transportasi'),
                                             onContactClick: () => handleContactClick(transport.url)
                                        }))
                                   }
                              }}
                         />
                    </div>
                    {/* Homestay */}
                    <div className='flex flex-col gap-y-5'>
                         <h1 className='text-center text-xl font-bold w-60  sm:w-full mx-auto'>{cardStackAssets.cardHomestay.cardTitle}</h1>
                         <CardStack
                              cardStackItems={{
                                   item: {
                                        value: destinationDetail.homestays.map((homestay) => ({
                                             id: homestay.slug!,
                                             img: homestay.image.url,
                                             title: homestay.name,
                                             price: homestay.price,
                                             onDetailClick: () => handleDetailClick(homestay, 'homestay'),
                                             onContactClick: () => handleContactClick(homestay.url)
                                        }))
                                   }
                              }}
                         />
                    </div>
                    {/* Kuliner */}
                    <div className='flex flex-col gap-y-5'>
                         <h1 className='text-center text-xl font-bold  w-40 sm:w-full mx-auto'>{cardStackAssets.cardCulinary.cardTitle}</h1>
                         <CardStack
                              cardStackItems={{
                                   item: {
                                        value: destinationDetail.kuliners.map((kuliner) => ({
                                             id: kuliner.slug!,
                                             img: kuliner.image.url,
                                             title: kuliner.name,
                                             price: kuliner.price,
                                             onDetailClick: () => handleDetailClick(kuliner, 'kuliner'),
                                             onContactClick: () => handleContactClick(kuliner.url)
                                        }))
                                   }
                              }}
                         />
                    </div>
               </div>
          </div>
     )
}

export default DetailPage