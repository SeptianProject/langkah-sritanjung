import { ChangeEventHandler, FormEvent } from "react";
import { BsSendFill } from "react-icons/bs";
import Loading from 'react-loading';


export interface GeminiInputProps {
     handleSubmit: (e: FormEvent) => void;
     input: string | number | readonly string[];
     setInput: ChangeEventHandler<HTMLTextAreaElement>;
     loading?: boolean;
}

const GeminiInput = ({ handleSubmit, input, setInput, loading }: GeminiInputProps) => {

     return (
          <form onSubmit={handleSubmit} className="relative flex items-center justify-center w-full h-full">
               <textarea value={input} onChange={setInput}
                    name="" id="" rows={2} placeholder="Tanyakan sesuatu..."
                    className="p-4 px-5 pr-14 leading-relaxed w-full rounded-xl 
                    border-none outline-none transition-all duration-300
                    focus:ring-2 focus:ring-white"/>
               <button type="submit" className="absolute right-4">
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