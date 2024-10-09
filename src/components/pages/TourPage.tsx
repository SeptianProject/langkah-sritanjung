import { BiSend } from "react-icons/bi"
import { assets } from "../../assets/asset"
import MapLayout from "../layouts/maps/MapLayout"
import GeminiInput from "../layouts/generativeAi/GeminiInput"

const TourPage = () => {
     return (
          <div className="max-w-full relative min-h-screen flex flex-col justify-between">
               {/* Header */}
               <div className="bg-blueCard bg-opacity-40 w-full h-20 rounded-b-3xl 
               flex justify-center items-center">
                    <div className="bg-white shadow-xl w-60 h-12 rounded-2xl">
                    </div>
                    <div className="rounded-full size-8 bg-tertiary   ">
                         <img src={assets.chatBot} className="size-full" alt="ChatBot" />
                    </div>
               </div>
               {/* Maps */}
               <div className="flex flex-col justify-center items-center w-full h-[25rem] overflow-hidden">
                    {/* <MapsLayout /> */}
                    <MapLayout />
               </div>
               {/* Chat Footer */}
               <div className="bg-blueCard bg-opacity-50 rounded-t-3xl h-32 w-full flex gap-x-5 px-10 items-center justify-center">
                    <div className="">
                         <div className="bg-tertiary rounded-full size-10">
                              <img src={assets.chatBot} className="size-full" alt="" />
                         </div>
                    </div>
                    <div className="flex items-center w-72 relative h-full">
                         <GeminiInput />
                         <button className="absolute right-5">
                              <BiSend className="size-6 text-primary -rotate-45" />
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default TourPage