import { BiX } from "react-icons/bi"
import { assets } from "../../../assets/asset"
import { TypeAnimation } from "react-type-animation"
import ButtonPrimary from "../../elements/button/ButtonPrimary"

type ModalResponseProps = {
     responses: string[]
     onClose: () => void
}

const ModalResponse = ({ responses, onClose }: ModalResponseProps) => {
     return (
          <div className="bg-white max-w-md w-[18rem] relative 
               overflow-hidden rounded-lg shadow-xl p-4 transition-all duration-500">
               <div className="flex flex-col items-center">
                    <div className="">
                         <img src={assets.chatBot} className="size-14" alt="Ichibot" />
                    </div>
                    <div className="max-h-40 overflow-y-scroll text-center mt-5 font-normal 
                    text-sm text-tertiary text-opacity-90">
                         {responses.map((response, index) => (
                              <TypeAnimation
                                   key={index}
                                   wrapper='p'
                                   cursor={false}
                                   sequence={[
                                        response,
                                        500
                                   ]}
                              />
                         ))}
                    </div>
                    <div className="mt-10 flex gap-x-4 items-center justify-center">
                         <ButtonPrimary onClick={onClose} text="Tanya Lagi!" />
                         <ButtonPrimary onClick={onClose} text="Oke, Mengerti" />
                    </div>
               </div>
               <button className="absolute top-2 right-2" onClick={onClose}>
                    <BiX className="text-secondary size-6" />
               </button>
          </div>
     )
}

export default ModalResponse