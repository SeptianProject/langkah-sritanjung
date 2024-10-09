import { assets, DetailDummy } from "../../assets/asset"
import TextDetailRekomen from "../elements/text/TextDetailRekomen"


const DetailRekom = () => {
     return (
          <div className="p-10 flex flex-col gap-y-10 lg:flex-row lg:gap-x-20 xl:gap-x-20
          lg:justify-between lg:min-h-screen max-w-full xl:px-20">
               <div className="lg:w-full lg:h-full lg:m-auto">
                    <img src={assets.redCar} className="size-80 xs:w-full xs:m-0 lg:w-full lg:h-[30rem]
                    object-cover object-center rounded-xl transition-all duration-700" alt="Detail Image" />
               </div>
               <div className="flex flex-col gap-y-6 lg:h-[28rem] lg:w-full m-auto transition-all duration-700">
                    <h1 className="text-4xl font-bold text-tertiary">Cahaya Motor Rental.</h1>
                    <TextDetailRekomen
                         title={DetailDummy.deskripsi.title}
                         description={DetailDummy.deskripsi.desc}
                    />
                    <TextDetailRekomen title="Alamat :" description="Jl. Ternate No 90 Pakis, Banyuwangi" />
                    <TextDetailRekomen title="No Telp :" description="08912839302928" />
                    <TextDetailRekomen title="Harga :" description="Mulai dari Rp 98.000" />
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