import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const geminiAi = new GoogleGenerativeAI(API_KEY);

const GeminiInput = () => {
     const [input, setInput] = useState<string>('');
     const [output, setOutput] = useState([]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const model = geminiAi.getGenerativeModel({
                    model: "gemini-pro"
               })

               const result = await model.generateContent(input)
               let response = result.response.text();
               response = response.replace(/\*/g, "");

               setOutput((prev: any) => [...prev, response])
          } catch (error) {
               console.error(error)
          }
     }

     return (
          <input type="text" className="py-5 w-full rounded-xl" />
     )
}

export default GeminiInput