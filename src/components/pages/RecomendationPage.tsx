/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import TextDetailRekomen from "../elements/text/TextDetailRekomen"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../elements/Core";
import Loading from "react-loading";

interface RecommendationDetail {
     name: string,
     desc: string,
     address: string,
     telp: string,
     price: string,
     url: string,
     image: {
          url: string,
          name: string
     }
}

type ParamsType = {
     slug: string
     type: string
     name: string
}

interface LoadingProps {
     setIsLoading: (isLoading: boolean) => void
}

const DetailRekom = ({ setIsLoading }: LoadingProps) => {
     const { slug, type, name } = useParams<ParamsType>()
     const [recommendation, setRecommendation] = useState<RecommendationDetail | null>(null);
     const [loading, setLoading] = useState(true)
     const navigate = useNavigate()

     useEffect(() => {
          const fetchDetailData = async () => {
               setIsLoading(true)
               setLoading(true)
               try {
                    const response = await axios.get(`${baseUrl}/destinasi-wisatas/${slug}`);
                    const data = response.data.data.attributes

                    let selectedRecommendation
                    switch (type) {
                         case 'transportasi':
                              selectedRecommendation = data.transportasis.data.find((item: any) => item.attributes.slug === name);
                              break;
                         case 'homestay':
                              selectedRecommendation = data.homestays.data.find((item: any) => item.attributes.slug === name);
                              break;
                         case 'kuliner':
                              selectedRecommendation = data.kuliners.data.find((item: any) => item.attributes.slug === name);
                              break;
                         default:
                              throw new Error('Invalid recommendation type');
                    }

                    if (selectedRecommendation) {
                         setRecommendation({
                              name: selectedRecommendation.attributes.name,
                              desc: selectedRecommendation.attributes.description,
                              address: selectedRecommendation.attributes.address,
                              telp: selectedRecommendation.attributes.noTelp,
                              price: selectedRecommendation.attributes.price,
                              url: selectedRecommendation.attributes.url,
                              image: {
                                   url: selectedRecommendation.attributes.image.data.attributes.url,
                                   name: selectedRecommendation.attributes.image.data.attributes.name
                              }
                         })
                    }
               } catch (error) {
                    console.error('Error fetching detail data:', error);
               } finally {
                    setIsLoading(false)
                    setLoading(false)
               }
          };

          fetchDetailData();
     }, [slug, type, name, setIsLoading]);

     if (!recommendation || loading) {
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
                    <img src={recommendation.image.url} alt={recommendation.image.name}
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