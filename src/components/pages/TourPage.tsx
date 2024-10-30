import { FormEvent, useState } from "react"
import ChatFooter from "../layouts/tour/ChatFooter"
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import MapLayout from "../layouts/tour/maps/MapLayout";
import { BiArrowBack } from "react-icons/bi";
import ModalResponse from "../layouts/tour/ModalResponse";
import { useNavigate, useParams } from "react-router-dom";
import { geminiApiKey } from "../elements/Core";

const geminiAi = new GoogleGenerativeAI(geminiApiKey);

const TourPage = () => {
     const { destination } = useParams<{ destination: string }>()
     const navigate = useNavigate()
     const [input, setInput] = useState<string>('');
     const [output, setOutput] = useState<string[]>([]);
     const [loading, setLoading] = useState<boolean>(false);
     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

     const handleOnSubmit = async (e: FormEvent) => {
          e.preventDefault();
          setLoading(true)
          try {
               const model: GenerativeModel = geminiAi.getGenerativeModel({
                    model: "gemini-1.5-pro",
               })
               const result: GenerateContentResult = await model.generateContent(input)
               const response: string = result.response.text().replace(/\*|#/g, "");

               setOutput([response])
               setIsModalOpen(true)
          } catch (error) {
               console.error(error)
          } finally {
               setLoading(false);
          }
     }

     const handleCloseModal = () => {
          setIsModalOpen(false)
     }

     return (
          <div className="max-w-full min-h-screen flex flex-col">
               <div className="flex-grow h-0 relative">
                    <MapLayout setLoading={setLoading} />
                    <button
                         onClick={() => navigate(`/detail/${destination}`)}
                         className="absolute top-5 left-10 bg-secondary size-10 rounded-lg">
                         <BiArrowBack className="mx-auto h-full size-5 text-white" />
                    </button>
               </div>
               <div className="h-1/4">
                    <ChatFooter
                         onClick={handleOnSubmit}
                         loading={loading}
                         onSubmit={handleOnSubmit}
                         input={input}
                         setInput={(e) => setInput(e.target.value)}
                    />
               </div>
               {isModalOpen && (
                    <div
                         className="fixed inset-0 flex items-center 
                         justify-center bg-black bg-opacity-80 z-20">
                         <ModalResponse
                              responses={output}
                              onClose={handleCloseModal} />
                    </div>
               )}
          </div>
     )
}

export default TourPage