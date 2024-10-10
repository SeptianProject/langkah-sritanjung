import { ChangeEventHandler, FormEvent } from "react";
import { BiSend } from "react-icons/bi";
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
                    name="" id="" rows={2} placeholder="Cari toko Umkm terdekat"
                    className="p-3 px-5 pr-14 min-h-24 max-h-[10rem]
                    resize-none box-border overflow-y-auto leading-relaxed
                    w-full rounded-xl border-none outline-none transition-all duration-500
                    focus:ring-2 focus:ring-primary"/>
               <button type="submit" className="absolute right-4">
                    {
                         loading ?
                              <Loading type="spin" color="#EA8104" height={25} width={25} />
                              :
                              <BiSend className="text-primary -rotate-45 size-6" />
                    }
               </button>
          </form>
     )
}

export default GeminiInput