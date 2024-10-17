import { assets } from '../../assets/asset'
import CardText from '../fragments/cards/CardText'
import Header from '../layouts/Header'
import HomeDestination from '../layouts/home/HomeDestination'
import HomeAbout from '../layouts/home/HomeAbout'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Kategori {
     id: number;
     name: string;
     path: string;
}

const HomePage = () => {
     const [kategoris, setKategoris] = useState<Kategori[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string>("");

     useEffect(() => {
          const fetchKategoris = async () => {
               try {
                    const response = await axios.get<{ data: { id: number; attributes: { name: string; slug: string } }[] }>('https://striking-egg-9d9efcd8e6.strapiapp.com/api/kategori-wisatas?sort=id:asc');
                    const data = response.data.data;

                    const formattedKategori = data.map((item) => ({
                         id: item.id,
                         path: item.attributes.slug,
                         name: item.attributes.name
                    }))

                    setKategoris(formattedKategori);
                    console.log(formattedKategori)
               } catch (error) {
                    setError(axios.isAxiosError(error) ? error.message : 'An error occured');
               } finally {
                    setLoading(false);
               }
          ;}
          
          fetchKategoris();
     }, [])

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
               <HomeDestination />
               {/* About */}
               <HomeAbout />
          </div >
     )
}

export default HomePage