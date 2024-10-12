import { FormEvent, useState } from "react"
// import MapLayout from "../layouts/tour/maps/MapLayout"
import ChatFooter from "../layouts/tour/ChatFooter"
import TourHeader from "../layouts/tour/TourHeader"
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import MapVisGlLayout from "../layouts/tour/maps/MapVisGlLayout";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const geminiAi = new GoogleGenerativeAI(GEMINI_API_KEY);

interface MapLocation {
     lat: number;
     lng: number;
}

const keywordResponses: { [key: string]: string } = {
     "pom bensin": "Baik, Aku akan mengarahkanmu ke pom bensin terdekat.",
     "toko umkm": "Baik, Aku akan mengarahkanmu ke toko umkm terdekat.",
     "warung": "Baik, Aku akan mengarahkanmu ke warung terdekat.",
};

const extractKeyword = (input: string): string | null => {
     const keywords = Object.keys(keywordResponses);
     for (const keyword of keywords) {
          if (input.toLowerCase().includes(keyword)) {
               return keyword;
          }
     } return null
}

const TourPage = () => {
     const [input, setInput] = useState<string>('');
     const [output, setOutput] = useState<string[]>([]);
     const [loading, setLoading] = useState<boolean>(false);
     const [places, setPlaces] = useState<[]>([]);

     const handleOnSubmit = async (e: FormEvent) => {
          e.preventDefault();
          setLoading(true)

          try {
               const keyword = extractKeyword(input);

               if (keyword) {
                    const response = keywordResponses[keyword];
                    setOutput([response]);

                    if (keyword === "pom bensin") {
                         const position = { lat: -8.219233, lng: 114.369225 };
                         const places = await getNearbyPlaces(keyword, position);
                         setPlaces(places);
                    }
               } else {
                    const model: GenerativeModel = geminiAi.getGenerativeModel({
                         model: "gemini-1.5-pro",
                         generationConfig: {
                              maxOutputTokens: 20,
                         },
                    })

                    const result: GenerateContentResult = await model.generateContent(input)
                    const response: string = await result.response.text().replace(/\*/g, "");

                    setOutput([response])
               }
          } catch (error) {
               console.error(error)
          } finally {
               setLoading(false);
          }
     }

     const getNearbyPlaces = async (keyword: string, position: MapLocation) => {
          const service = new google.maps.places.PlacesService(document.createElement('div'));

          const request = {
               location: position,
               radius: 500,
               keyword: keyword,
          }

          return new Promise((resolve, reject) => {
               service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                         resolve(results)
                    } else {
                         reject(status)
                    }
               })
          })
     }


     return (
          <div className="max-w-full relative min-h-screen flex flex-col justify-between">
               {/* Header */}
               <TourHeader responses={output} />
               {/* Maps */}
               {/* <MapLayout location={mapLocation} /> */}
               <MapVisGlLayout places={places} />
               {/* Chat Footer */}
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