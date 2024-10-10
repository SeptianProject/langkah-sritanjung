import { FormEvent, useState } from "react"
// import MapLayout from "../layouts/tour/maps/MapLayout"
import ChatFooter from "../layouts/tour/ChatFooter"
import TourHeader from "../layouts/tour/TourHeader"
import { GenerateContentResult, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import MapVisGlLayout from "../layouts/tour/maps/MapVisGlLayout";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GMAP_API_KEY: string = import.meta.env.VITE_GMAPS_API_KEY;

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
     const [mapLocation, setMapLocation] = useState<MapLocation | null>(null);

     const handleOnSubmit = async (e: FormEvent) => {
          e.preventDefault();
          try {
               setLoading(true);
               const keyword = extractKeyword(input);

               if (keyword) {
                    const customResponse = keywordResponses[keyword];
                    setOutput([customResponse]);

                    const locationResult = await getMapLocation(keyword);
                    if (locationResult) {
                         setMapLocation(locationResult);
                    }
               } else {
                    const model: GenerativeModel = geminiAi.getGenerativeModel({
                         model: "gemini-1.5-pro",
                         generationConfig: {
                              maxOutputTokens: 20,
                         },

                    })
                    const result: GenerateContentResult = await model.generateContent(input)
                    let response: string = await result.response.text();
                    response = response.replace(/\*/g, "");

                    // const locationResult = await getMapLocation(response);
                    // if (locationResult) {
                    //      setMapLocation(locationResult); // Set lokasi marker
                    // }

                    setOutput([response])
               }
               setLoading(false);
          } catch (error) {
               console.error(error)
               setLoading(false);
          }
     }

     const getMapLocation = async (keyword: string): Promise<MapLocation | null> => {
          try {
               const response = await axios.get(`//maps.googleapis.com/maps/api/geocode/json?address=banyuwangi${GMAP_API_KEY}`, {
                    params: {
                         address: keyword,
                         key: GMAP_API_KEY
                    }
               })
               if (response.data.results.length > 0) {
                    const location = response.data;
                    return { lat: location.lat, lng: location.lng };
               }
          } catch (error) {
               console.error("Error fetching location:", error);
          }
          return null;
     }

     return (
          <div className="max-w-full relative min-h-screen flex flex-col justify-between">
               {/* Header */}
               <TourHeader responses={output} />
               {/* Maps */}
               {/* <MapLayout location={mapLocation} /> */}
               <MapVisGlLayout />
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