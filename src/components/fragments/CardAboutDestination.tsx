import CardSmall from './cards/CardSmall'

const CardAboutDestination = () => {
     return (
          <div className='flex flex-col md:flex-row w-full items-center gap-y-5 md:gap-x-5 lg:gap-x-3'>
               <CardSmall title='24Jam' description='Layanan AI Pemandu Wisata' />
               <CardSmall title='100+' description='Rekomendasi Jasa & UMKM Banyuwangi.' />
               <CardSmall title='100+' description='Rekomendasi Destinasi Wisata Banyuwangi' />
          </div>
     )
}

export default CardAboutDestination