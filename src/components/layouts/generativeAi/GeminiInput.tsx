/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler, FormEvent, KeyboardEvent } from "react";
// import { BiMicrophoneOff, BiSolidMicrophone } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import Loading from 'react-loading';
// import useSpeechRecognition from "../tour/UseSpeechRecognition";

export interface GeminiInputProps {
     input: string | string[];
     setInput: ChangeEventHandler<HTMLTextAreaElement>;
     onSubmit: (e: FormEvent) => void;
     onClick: (e: FormEvent) => void;
     // onSpeak: () => void;
     // onStop: () => void;
     // isListening?: boolean;
     loading?: boolean;
}

const GeminiInput = ({ onSubmit, onClick, input, setInput, loading }: GeminiInputProps) => {
     // const {
     //      hasRecognitionSupport,
     // } = useSpeechRecognition();
     const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault();
               const form = e.currentTarget.form;
               if (form) {
                    const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
                    form.dispatchEvent(submitEvent);
               }
          }
     };

     // const handleMicClick = (e: React.MouseEvent) => {
     //      e.preventDefault();
     //      if (isListening) {
     //           onStop();
     //      } else {
     //           onSpeak();
     //      }
     // };

     const handleSendClick = (e: React.MouseEvent) => {
          e.preventDefault();
          onClick(e as any);
     };

     return (
          <form onSubmit={(e) => {
               e.preventDefault()
               onSubmit(e)
          }} className="relative flex items-center justify-center w-full h-full">
               <textarea value={input} onChange={setInput} onKeyDown={handleKeyDown}
                    name="" id="" rows={2} placeholder="Tanyakan sesuatu..."
                    className="textarea-input p-4 px-5 pr-24 lg:pr-20 leading-relaxed 
                    w-full rounded-xl border-none outline-none transition-all duration-300 
                    focus:ring-2 focus:ring-white"/>
               {/* {hasRecognitionSupport &&
                    (
                         <button onClick={handleMicClick} className="absolute right-14">
                              {isListening
                                   ? <BiSolidMicrophone className="text-secondary size-6" />
                                   : <BiMicrophoneOff className="text-secondary size-6" />
                              }
                         </button>
                    )
               } */}
               <button onClick={handleSendClick} type="button" className="absolute right-4">
                    {
                         loading ?
                              <Loading type="spin" color="#233028" height={25} width={25} />
                              :
                              <BsSendFill className="text-secondary size-6" />
                    }
               </button>
          </form>
     )
}

export default GeminiInput