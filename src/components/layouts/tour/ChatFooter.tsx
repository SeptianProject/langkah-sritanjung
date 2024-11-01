import GeminiInput, { GeminiInputProps } from '../generativeAi/GeminiInput'
import { assets } from '../../../assets/asset'


const ChatFooter = ({ onSubmit, input, onClick, setInput, loading }: GeminiInputProps) => {
     return (
          <div className="bg-secondary rounded-t-3xl h-32 w-full 
          flex gap-x-3 md:gap-x-5 px-5 md:px-10 items-center justify-center">
               <div className="">
                    <div className="rounded-full size-14">
                         <img src={assets.userProfile} className="size-full" alt="" />
                    </div>
               </div>
               <div className="w-full h-full">
                    <GeminiInput
                         // onSpeak={onSpeak}
                         // isListening={isListening}
                         // onStop={onStop}
                         loading={loading}
                         onSubmit={onSubmit}
                         onClick={onClick}
                         input={input}
                         setInput={setInput}
                    />
               </div>
          </div>
     )
}

export default ChatFooter