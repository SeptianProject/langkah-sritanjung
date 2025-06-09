/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import TextDetailRekomen from "../elements/text/TextDetailRekomen"
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { fetchResource } from "../../services/apiService";
import { Destination } from "../../types/common";
import { useQuery } from "@tanstack/react-query";

// Clean up interface - make it more consistent with the data structure
interface RecommendationDetail {
     name: string,
     desc: string,
     address: string,
     telp: string,
     price: string,
     url: string,
     image: string
}

type ParamsType = {
     slug: string
     type: string
     typeSlug: string
}

interface LoadingProps {
     setIsLoading: (isLoading: boolean) => void
}

const DetailRekom = ({ setIsLoading }: LoadingProps) => {
     const { slug, type, typeSlug } = useParams<ParamsType>()
     const navigate = useNavigate()
     const [recommendation, setRecommendation] = useState<RecommendationDetail | null>(null)

     const { data, isLoading } = useQuery<Destination>({
          queryKey: ['destinations', slug],
          queryFn: async () => fetchResource('destinations', slug),
          enabled: !!slug,
     })

     useEffect(() => {
          const fetchDetailData = async () => {
               setIsLoading(true)
               try {
                    let selectedRecommendation
                    switch (type) {
                         case 'transportation':
                              selectedRecommendation = data?.destinations_transportations?.find((item) => item.transportation.slug === typeSlug);
                              break;
                         case 'homestay':
                              selectedRecommendation = data?.destinations_homestays?.find((item) => item.homestay.slug === typeSlug);
                              break;
                         case 'cullinary':
                              selectedRecommendation = data?.destinations_culinaries?.find((item) => item.culinary.slug === typeSlug);
                              break;
                         default:
                              throw new Error(`Invalid recommendation type: ${type}`);
                    }

                    if (selectedRecommendation) {
                         let item;
                         if (type === 'transportation') {
                              item = (selectedRecommendation as { transportation: any }).transportation;
                         } else if (type === 'homestay') {
                              item = (selectedRecommendation as { homestay: any }).homestay;
                         } else if (type === 'cullinary') {
                              item = (selectedRecommendation as { culinary: any }).culinary;
                         }

                         if (item) {
                              setRecommendation({
                                   name: item.name,
                                   desc: item.description,
                                   address: item.address,
                                   telp: item.telephone,
                                   price: item.price,
                                   url: item.url,
                                   image: item.image
                              });
                         }
                    }
               } catch (error) {
                    console.error('Error fetching detail data:', error);
               } finally {
                    setIsLoading(false)
               }
          };

          if (data) {
               fetchDetailData();
          }
     }, [data, slug, type, typeSlug, setIsLoading]); // Fixed dependency array

     if (!recommendation || isLoading) {
          return <div>
               <Loading className="min-h-screen flex justify-center items-center m-auto"
                    color="#EA8104"
                    height={60}
                    width={60}
                    type="cylon" />
          </div>
     }


     return (
          <div className="p-10 flex flex-col gap-y-10 lg:flex-row lg:gap-x-20 xl:gap-x-20
          lg:justify-between lg:min-h-screen max-w-full xl:px-20">
               <div className="lg:w-full lg:h-full lg:m-auto">
                    <img src={recommendation.image} alt={recommendation.name}
                         className="size-80 xs:w-full xs:m-0 lg:w-full lg:h-[30rem]
                         object-cover object-center rounded-xl transition-all duration-700"/>
               </div>
               <div className="flex flex-col gap-y-6 lg:h-[28rem] lg:w-full m-auto transition-all duration-700">
                    <h1 className="text-4xl font-bold text-tertiary">{recommendation.name}</h1>
                    <TextDetailRekomen title='Deskripsi :' description={recommendation.desc} />
                    <TextDetailRekomen title="Alamat :" description={recommendation.address} />
                    <TextDetailRekomen title="No Telp :" description={recommendation.telp} />
                    <TextDetailRekomen title="Harga :" description={recommendation.price} />
                    <div className="flex gap-x-2 items-center">
                         <button
                              onClick={() => window.open(recommendation.url, '_blank')}
                              className="text-white bg-primary rounded-lg text-sm font-medium w-36 h-10">
                              Cek Ketersediaan
                         </button>
                         <button
                              onClick={() => navigate(-1)}
                              className="text-white bg-tertiary bg-opacity-80
                              rounded-lg text-sm font-medium w-36 h-10">
                              Kembali
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default DetailRekom