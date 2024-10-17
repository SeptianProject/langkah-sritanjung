import { useParams } from "react-router-dom";
import TextDetailRekomen from "../elements/text/TextDetailRekomen"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../elements/Core";

interface RecommendationDetail {
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

const DetailRekom = () => {
     const { slug, type } = useParams<{ slug: string, type: string }>()
     const [recommendationDetail, setRecommendationDetail] = useState<RecommendationDetail | null>(null);

     useEffect(() => {
          const fetchDetailData = async () => {
               try {
                    const response = await axios.get(`${baseUrl}/destinasi-wisatas/${slug}`);
                    console.log(response);
                    const data = response.data.data.attributes

                    setRecommendationDetail({
                         name: data.name,
                         desc: data.description,
                         address: data.address,
                         telp: data.telp,
                         price: data.price,
                         slug: data.slug,
                         image: data.image?.data?.attributes?.url,
                         url: data.url,
                    });
               } catch (error) {
                    console.error('Error fetching detail data:', error);
               }
          };

          fetchDetailData();
     }, [slug, type]);

     if (!recommendationDetail) {
          return <div>Loading...</div>;
     }

     return (
          <div className="p-10 flex flex-col gap-y-10 lg:flex-row lg:gap-x-20 xl:gap-x-20
          lg:justify-between lg:min-h-screen max-w-full xl:px-20">
               <div className="lg:w-full lg:h-full lg:m-auto">
                    <img src={recommendationDetail.image.url} className="size-80 xs:w-full xs:m-0 lg:w-full lg:h-[30rem]
                    object-cover object-center rounded-xl transition-all duration-700" alt="Detail Image" />
               </div>
               <div className="flex flex-col gap-y-6 lg:h-[28rem] lg:w-full m-auto transition-all duration-700">
                    <h1 className="text-4xl font-bold text-tertiary">{recommendationDetail.name}</h1>
                    <TextDetailRekomen
                         title='Deskripsi :'
                         description={recommendationDetail.desc}
                    />
                    <TextDetailRekomen title="Alamat :" description={recommendationDetail.address} />
                    <TextDetailRekomen title="No Telp :" description={recommendationDetail.telp} />
                    <TextDetailRekomen title="Harga :" description={recommendationDetail.price} />
                    <div className="">
                         <button className="text-white bg-primary rounded-lg text-sm font-medium w-36 h-10">
                              Cek Ketersediaan
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default DetailRekom