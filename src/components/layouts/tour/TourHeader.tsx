import { BiChevronLeft } from 'react-icons/bi'
import { assets } from '../../../assets/asset'
import { TypeAnimation } from 'react-type-animation'

interface TourHeaderProps {
     responses: string[]
}

const TourHeader = ({ responses }: TourHeaderProps) => {
     return (
          <div className="bg-blueCard bg-opacity-30 w-full h-24 rounded-b-3xl 
               flex justify-center md:justify-between gap-x-3 md:px-10 items-center">
               <div>
                    <BiChevronLeft className="text-white" size={40} />
               </div>
               <div className="flex justify-center items-center gap-x-3">
                    <div className="bg-white shadow-xl w-64 sm:w-72 md:w-96 
                         lg:w-[30rem] flex justify-center items-center h-14 rounded-2xl px-5 text-sm">
                         {
                              responses.map((response, index) => (
                                   <TypeAnimation
                                        key={index}
                                        wrapper='p'
                                        cursor={false}
                                        sequence={[
                                             response,
                                             500
                                        ]}
                                   />
                              ))
                         }
                    </div>
                    <div className="rounded-full size-8 sm:size-10 lg:size-12">
                         <img src={assets.chatBot} className="size-full" alt="ChatBot" />
                    </div>
               </div>
          </div>
     )
}

export default TourHeader