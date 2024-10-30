import { ChangeEventHandler, FormEvent, KeyboardEvent } from "react";
import { BsSendFill } from "react-icons/bs";
import Loading from 'react-loading';


export interface GeminiInputProps {
     input: string | number | readonly string[] | undefined;
     setInput: ChangeEventHandler<HTMLTextAreaElement>;
     onSubmit: (e: FormEvent) => void;
     onClick: (e: FormEvent) => void;
     loading?: boolean;
}

const GeminiInput = ({ onSubmit, onClick, input, setInput, loading }: GeminiInputProps) => {

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

     return (
          <form onSubmit={onSubmit} className="relative flex items-center justify-center w-full h-full">
               <textarea value={input} onChange={setInput} onKeyDown={handleKeyDown}
                    name="" id="" rows={2} placeholder="Tanyakan sesuatu..."
                    className="p-4 px-5 pr-14 leading-relaxed w-full rounded-xl 
                    border-none outline-none transition-all duration-300
                    focus:ring-2 focus:ring-white"/>
               <button onClick={onClick} type="button" className="absolute right-4">
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