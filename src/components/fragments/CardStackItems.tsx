import { useNavigate } from "react-router-dom";

interface DestinasiWisata {
     id: number;
  attributes: {
    name: string;
    slug: string;
    image: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }
}

interface KategoriDetail {
     id: number;
  attributes: {
    name: string;
    slug: string;
    destinasi_wisatas: {
      data: DestinasiWisata[];
    }
  }
}


type CardStackProps = {
     detail: KategoriDetail | null
}

const CardStackItems = ({ detail }: CardStackProps) => {
     const navigate = useNavigate();

     const handleNavigation = (slug: string) => {
          navigate(`/detail/${slug}`); // Navigasi ke halaman yang sesuai berdasarkan slug
     };

     return (
          <>
               {
                    detail?.attributes.destinasi_wisatas.data.map((destinasi, index) => (
                         <div key={index} >
                              <div className='relative bg-cover bg-center  min-h-96 md:min-h-[26rem] lg:min-h-[28rem] xl:min-h-[30rem]' style={{ backgroundImage: `url(${destinasi.attributes.image.data.attributes.url})` }}>
                                   <div className='absolute top-0 left-0 bg-primary py-2 px-3 rounded-br-2xl'>
                                        <h4 className='text-white text-sm'>{detail.attributes.name}</h4>
                                   </div>
                                   <div className='absolute bottom-0 bg-tertiary bg-opacity-85 w-full flex flex-col gap-y-3 py-5 items-center rounded-t-3xl'>
                                        <h2 className='text-lg font-semibold text-white'>{destinasi.attributes.name}</h2>
                                        <div className='flex gap-x-3 w-full items-center justify-center'>
                                             <button className='bg-secondary text-white border border-opacity-50 border-white py-1 w-24 rounded-bl-xl rounded-tr-xl text-sm' onClick={() => handleNavigation(destinasi.attributes.slug)} >Lihat Detail</button>
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

export default CardStackItems