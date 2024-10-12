import { FormEvent, useState } from "react"
// import MapLayout from "../layouts/tour/maps/MapLayout"
import ChatFooter from "../layouts/tour/ChatFooter"
import TourHeader from "../layouts/tour/TourHeader"
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import MapLayout from "../layouts/tour/maps/MapLayout";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const geminiAi = new GoogleGenerativeAI(GEMINI_API_KEY);


const TourPage = () => {
     const [input, setInput] = useState<string>('');
     const [output, setOutput] = useState<string[]>([]);
     const [loading, setLoading] = useState<boolean>(false);
     const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

     const handleOnSubmit = async (e: FormEvent) => {
          e.preventDefault();
          setLoading(true)

          try {
               const model: GenerativeModel = geminiAi.getGenerativeModel({
                    model: "gemini-1.5-pro",
                    generationConfig: {
                         maxOutputTokens: 20,
                    },
               })

               const result: GenerateContentResult = await model.generateContent(input)
               const response: string = result.response.text().replace(/\*/g, "");

               setOutput([response])

               if (response.toLowerCase().includes('pom bensin')) {
                    const service = new google.maps.places.PlacesService(document.createElement('div'))
                    const request: google.maps.places.TextSearchRequest = {
                         query: response,
                         location: new google.maps.LatLng(-8.219233, 114.369225),
                         radius: 50000,
                    }

                    service.textSearch(request, (results, status) => {
                         if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                              setPlaces(results)
                         } else {
                              console.error(status)
                         }
                    })
               } else {
                    console.warn("Gemini response does not mention a location.")
               }
          } catch (error) {
               console.error(error)
          } finally {
               setLoading(false);
          }
     }


     return (
          <div className="max-w-full relative min-h-screen flex flex-col justify-between">
               <TourHeader responses={output} />
               <MapLayout places={places} />
               <ChatFooter
                    loading={loading}
                    handleSubmit={handleOnSubmit}
                    input={input}
                    setInput={(e) => setInput(e.target.value)}
               />
          </div>
     )
}

export default TourPage