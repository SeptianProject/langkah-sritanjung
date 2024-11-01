import { FormEvent, useEffect, useState } from "react"
import ChatFooter from "../layouts/tour/ChatFooter"
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import MapLayout from "../layouts/tour/maps/MapLayout";
import { BiArrowBack } from "react-icons/bi";
import ModalResponse from "../layouts/tour/ModalResponse";
import { useNavigate, useParams } from "react-router-dom";
import { geminiApiKey } from "../elements/Core";
import useSpeechRecognition from "../layouts/tour/UseSpeechRecognition";

const geminiAi = new GoogleGenerativeAI(geminiApiKey);

const TourPage = () => {
     const {
          isListening,
          text: voiceInput,
     } = useSpeechRecognition()
     const { destination } = useParams<{ destination: string }>()
     const navigate = useNavigate()
     const [textInput, setTextInput] = useState<string>('');
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

               const inputContent = isListening ? voiceInput : textInput

               if (!inputContent.trim()) {
                    console.log('Input kosong')
                    return
               }

               const result: GenerateContentResult = await model.generateContent(inputContent)
               const response: string = result.response.text().replace(/\*|#/g, "");

               setOutput([response])
               setIsModalOpen(true)

          } catch (error) {
               console.error(error)
          } finally {
               setLoading(false);
          }
     }

     const responseSpeak = (output: string) => {
          setLoading(true)
          try {
               if ('speechSynthesis' in window) {
                    const speech = new SpeechSynthesisUtterance(output)
                    speech.lang = 'id-ID'
                    speech.rate = 1.1
                    speech.pitch = 1.3

                    window.speechSynthesis.speak(speech)
               }
          } catch (error) {
               console.error(error)
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          if (output.length > 0) {
               const lastOutput = output[output.length - 1]
               responseSpeak(lastOutput)
          }
     }, [output])

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
               <div className="">
                    <ChatFooter
                         // onSpeak={startListening}
                         // onStop={stopListening}
                         onClick={handleOnSubmit}
                         loading={loading}
                         onSubmit={handleOnSubmit}
                         input={textInput}
                         setInput={(e) => setTextInput(e.target.value)}
                    />
               </div>
               <div>
                    {isModalOpen && (
                         <div className="fixed inset-0 bg-black bg-opacity-80 z-10">
                              <div
                                   className="fixed inset-0 flex items-center 
                         justify-center z-20">
                                   <ModalResponse
                                        responses={output}
                                        onClose={handleCloseModal} />
                              </div>
                         </div>
                    )}
               </div>
          </div>
     )
}

export default TourPage