import GeminiInput, { GeminiInputProps } from '../generativeAi/GeminiInput'
import { assets } from '../../../assets/asset'


const ChatFooter = ({ handleSubmit, input, setInput, loading }: GeminiInputProps) => {
     return (
          <div className="bg-blueCard bg-opacity-30 rounded-t-3xl 
               h-40 w-full flex gap-x-2 md:gap-x-5 px-5 md:px-10 items-center justify-center">
               <div className="">
                    <div className="rounded-full size-16 border-2 border-slate-600">
                         <img src={assets.chatBot} className="size-full" alt="" />
                    </div>
               </div>
               <div className="w-full h-full">
                    <GeminiInput
                         loading={loading}
                         handleSubmit={handleSubmit}
                         input={input}
                         setInput={setInput}
                    />
               </div>
          </div>
     )
}

export default ChatFooter