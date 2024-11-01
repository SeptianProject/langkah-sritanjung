import { BiX } from "react-icons/bi";
import { assets } from "../../../assets/asset";
import ButtonPrimary from "../../elements/button/ButtonPrimary";
import { useEffect, useRef, useState } from "react";

type ModalResponseProps = {
     responses: string[];
     onClose: () => void;
};

const ModalResponse = ({ responses, onClose }: ModalResponseProps) => {
     const modalContentRef = useRef<HTMLDivElement>(null);
     const [displayedText, setDisplayedText] = useState<string>("");

     useEffect(() => {
          let currentText = "";
          let charIndex = 0;
          let timeoutId: ReturnType<typeof setTimeout> | null = null;

          const addCharacter = () => {
               if (charIndex < responses.join(" ").length) {
                    currentText += responses.join(" ")[charIndex];
                    setDisplayedText(currentText);
                    charIndex++;
                    timeoutId = setTimeout(addCharacter, 50);
               }
          };

          addCharacter();

          return () => {
               if (timeoutId !== null) {
                    clearTimeout(timeoutId);
               }
          };
     }, [responses]);

     useEffect(() => {
          if (modalContentRef.current) {
               modalContentRef.current.scrollTop = modalContentRef.current.scrollHeight;
          }
     }, [displayedText]);

     return (
          <div className="bg-white max-w-md lg:max-w-xl w-[18rem] md:w-[28rem] 
          lg:w-[34rem] relative rounded-lg shadow-xl p-5 transition-all duration-500">
               <div className="flex flex-col items-center transition-all duration-500">
                    <div>
                         <img src={assets.chatBot} className="size-14" alt="Ichibot" />
                    </div>
                    <div
                         className="modal-content max-h-40 md:max-h-60 overflow-y-auto text-center 
                    mt-5 py-2 px-4 font-normal text-sm md:text-base lg:text-lg text-tertiary
                    text-opacity-90 transition-all duration-500"
                         ref={modalContentRef}
                    >
                         <p>{displayedText}</p>
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
     );
};

export default ModalResponse;
