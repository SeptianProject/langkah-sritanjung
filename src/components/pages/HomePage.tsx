import { assets } from '../../assets/asset'
import CardText from '../fragments/cards/CardText'
import Header from '../layouts/Header'
import HomeDestination from '../layouts/home/HomeDestination'
import HomeAbout from '../layouts/home/HomeAbout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../elements/Core'
import { useSearchParams } from 'react-router-dom'

interface Kategoris {
     id: number;
     name: string;
     slug: string;
}

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

const HomePage = () => {
     const [searchParams] = useSearchParams();
     const category = searchParams.get("category") || 'pegunungan';
     const [kategoris, setKategoris] = useState<Kategoris[]>([]);
     const [kategoriDetail, setKategoriDetail] = useState<KategoriDetail | null>(null);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string>("");

     useEffect(() => {
          const fetchKategoris = async () => {
               try {
                    const response = await axios.get<{ data: {id: number; attributes: { name: string; slug: string } }[] }>(`${baseUrl}/kategori-wisatas`);
                    const data = response.data.data;

                    const formattedKategori = data.map((item) => ({
                         id: item.id,
                         slug: item.attributes.slug,
                         name: item.attributes.name
                    }))

                    setKategoris(formattedKategori);
               } catch (error) {
                    setError(axios.isAxiosError(error) ? error.message : 'An error occured');
               } finally {
                    setLoading(false);
               }
          ;}

          const fetchKategori = async () => {
               if (!category) return;
               try {
                    setLoading(true);
                    const response = await axios.get(`${baseUrl}/kategori-wisatas/${category}`)

                    setKategoriDetail(response.data.data)
               } catch (error) {
                    setError(axios.isAxiosError(error) ? error.message : 'An error occured');
               } finally {
                    setLoading(false)
               }
          };
          
          fetchKategoris();

          if (category) {
               fetchKategori();
          }
          
     }, [category]);

     if (loading) return <p>LOading....</p>;
     if (error) return <p>Error: {error}</p>;

     return (
          <div className='flex flex-col gap-y-20'>
               {/* Header */}
               <section className='flex flex-col items-center'>
                    <div className='relative min-h-[40rem] lg:min-h-screen w-full bg-cover bg-center
                         flex flex-col justify-center px-10 md:px-20' style={{ backgroundImage: `url(${assets.bgHome})` }}>
                         <div className='from-tertiary/80 to-transparent bg-gradient-to-tr from-55% to-95% absolute inset-0 ' />
                         <div className='z-10'>
                              <Header />
                         </div>
                    </div>
                    <div className='w-full'>
                         <CardText />
                    </div>
               </section>
               {/* Destination */}
               <HomeDestination category={kategoris} detail={kategoriDetail}/>
               {/* About */}
               <HomeAbout />
          </div >
     )
}

export default HomePage