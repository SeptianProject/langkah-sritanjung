import { FormEvent, useState } from "react"
// import MapLayout from "../layouts/tour/maps/MapLayout"
import ChatFooter from "../layouts/tour/ChatFooter"
import TourHeader from "../layouts/tour/TourHeader"
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import MapLayout from "../layouts/tour/maps/MapLayout";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GMAPS_API_KEY;
const geminiAi = new GoogleGenerativeAI(GEMINI_API_KEY);


const TourPage = () => {
     const [input, setInput] = useState<string>('');
     const [output, setOutput] = useState<string[]>([]);
     const [loading, setLoading] = useState<boolean>(false);
     const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

     const geoCoordinates = async (address: string) => {
          const geoCodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

          const response = await fetch(geoCodingUrl);
          const data = await response.json();

          if (data.status === 'OK' && data.results.length > 0) {
               const location = data.results[0].geometry.location;
               return ({ lat: location.lat, lng: location.lng });
          } else {
               return new Error('Invalid address');
          }
     }

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

               if (response) {
                    const coordinates = await geoCoordinates(response);
                    setLocation(coordinates);
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
               <MapLayout location={location} />
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