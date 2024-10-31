/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"

declare global {
     interface Window {
          webkitSpeechRecognition: any
          SpeechRecognition: any
     }
}

const useSpeechRecognition = () => {
     const [text, setText] = useState('')
     const [isListening, setIsListening] = useState(false)

     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
     const recognition = new SpeechRecognition()

     useEffect(() => {
          if (!recognition) return

          recognition.continuous = true
          recognition.interimResults = true
          recognition.lang = 'id-ID'

          recognition.onresult = (event: any) => {
               const transcript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map((result) => result.transcript)
                    .join('')
               setText(transcript)
          }

          recognition.onend = () => {
               setIsListening(false)
          }

          return () => {
               recognition.stop()
          }
     }, [])

     const startListening = () => {
          setText('')
          setIsListening(true)
          recognition.start()
     }

     const stopListening = () => {
          setIsListening(false)
          recognition.stop()
     }

     return {
          text,
          isListening,
          startListening,
          stopListening,
          hasRecognitionSupport: !!SpeechRecognition,
     }
}

export default useSpeechRecognition