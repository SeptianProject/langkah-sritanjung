import Loading from 'react-loading'
import TextHeader from '../fragments/TextHeader'
import { Culinary, Destination, DetailType, HomeStay, Transportation } from '../../types/common'
import ActionCard from '../layouts/detail/ActionCard'
import DotDashCustom from '../fragments/DotDashCustom'
import { fetchResource } from '../../services/apiService'
import { cardStackAssets, textHeader } from '../../assets/asset'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import CardStack from '../fragments/cards/CardStack'

type RecommendationItem = Transportation | HomeStay | Culinary;

const DetailPage = () => {
     const navigate = useNavigate()
     const { slug } = useParams<{ slug: string }>()
     const { data, isLoading, error } = useQuery<Destination>({
          queryKey: ['destinations', slug],
          queryFn: async () => fetchResource('destinations', slug),
          enabled: !!slug,
     })

     const handleDetailClick = (item: RecommendationItem, type: DetailType) => {
          navigate(`/detail/${slug}/${type}/${item.slug}`)
     }

     const handleContactClick = (url: string) => {
          if (url) {
               window.open(url, '_blank', 'noopener,noreferrer')
          }
     }

     if (!data || isLoading) {
          return (
               <div>
                    <Loading className="min-h-screen flex justify-center items-center m-auto"
                         color="#EA8104"
                         height={60}
                         width={60}
                         type="cylon" />
               </div>
          )
     } else if (error) {
          return (
               <div className='flex flex-col items-center justify-center min-h-screen'>
                    <h1 className='text-2xl font-bold text-red-600'>Error: {error.message}</h1>
                    <p className='text-lg text-gray-600'>Something went wrong while fetching the data.</p>
               </div>
          )
     }

     const renderCardStack = (
          title: string,
          items: { [key: string]: RecommendationItem }[] | undefined,
          itemKey: string,
          type: DetailType
     ) => (
          <div className='flex flex-col gap-y-5'>
               <h1 className='text-center text-xl font-bold w-60 sm:w-full mx-auto'>{title}</h1>
               <CardStack
                    cardStackItems={{
                         item: {
                              value: items?.map((item) => ({
                                   id: item[itemKey].slug,
                                   img: item[itemKey].image,
                                   title: item[itemKey].name,
                                   price: item[itemKey].price,
                                   onDetailClick: () => handleDetailClick(item[itemKey], type),
                                   onContactClick: () => handleContactClick(item[itemKey].url)
                              })) ?? []
                         }
                    }}
               />
          </div>
     )

     return (
          <div className='flex flex-col gap-y-12'>
               <div className='relative min-h-[25rem] lg:min-h-[30rem] xl:min-h-[35rem] bg-cover bg-center w-full flex flex-col 
                    justify-center px-10 md:px-20' style={{ backgroundImage: `url(${data.image})` }}>
                    <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0 ' />
                    <div className='z-10'>
                         <TextHeader headerItems={{
                              item: {
                                   title: data.name,
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
                              {data.name}
                         </h1>
                         <div className='flex gap-x-6 h-[32rem] w-[20rem] md:h-[29rem] md:gap-x-7 md:w-[30rem] md:mx-auto lg:mx-0'>
                              <DotDashCustom itemCount={data.timelist?.length} />
                              <div className='flex flex-col h-full justify-between md:gap-y-[2.5rem] md:justify-start'>
                                   {
                                        data.timelist?.map((text, index) => (
                                             <div key={index} className='flex flex-col'>
                                                  <h3 className='text-base font-semibold text-tertiary text-opacity-90'>{text.title}</h3>
                                                  <p className='text-sm font-normal md:font-medium text-tertiary text-opacity-90'>{text.description}</p>
                                             </div>
                                        ))
                                   }
                              </div>
                         </div>
                    </div>
                    {/* Image */}
                    <div className='hidden lg:block lg:mt-10 xl:mt-7 relative w-full h-[26rem] xl:h-[27rem]'>
                         <img src={data.image} className='object-cover h-full w-full rounded-tl-3xl rounded-br-3xl' alt="image" />
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
                                   value: data.actions?.map((action) => ({
                                        title: action
                                   }))
                              }
                         }}
                    />
               </div>
               <div className='mt-10 md:mt-6 flex flex-col gap-y-16 px-5'>
                    {/* Transportasi */}
                    {renderCardStack(
                         cardStackAssets.cardTransport.cardTitle,
                         data?.destinations_transportations,
                         'transportation',
                         'transportation'
                    )}

                    {/* Homestay */}
                    {renderCardStack(
                         cardStackAssets.cardHomestay.cardTitle,
                         data?.destinations_homestays,
                         'homestay',
                         'homestay'
                    )}

                    {/* Kuliner */}
                    {renderCardStack(
                         cardStackAssets.cardCulinary.cardTitle,
                         data?.destinations_culinaries,
                         'culinary',
                         'culinary'
                    )}
               </div>
          </div>
     )
}

export default DetailPage