/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from '@google/generative-ai';
import React from 'react'
import { BiX } from 'react-icons/bi';
import { geminiApiKey } from './Core';

type ChatBotProps = {
     isOpen: boolean;
     setIsOpen: (isOpen: boolean) => void;
}

type Message = {
     text: string;
     isUser: boolean;
     role?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, setIsOpen }) => {
     const geminiAI = new GoogleGenerativeAI(geminiApiKey)
     const [input, setInput] = React.useState<string>('');
     const [messages, setMessages] = React.useState<Message[]>([]);
     const [isLoading, setIsLoading] = React.useState<boolean>(false);
     const chatContainerRef = React.useRef<HTMLDivElement>(null);
     const chatRef = React.useRef<any>(null);
     const [chatInitialized, setChatInitialized] = React.useState<boolean>(false);

     // Tour guide instructions - used for priming the model
     const tourGuideInstructions = "Anda adalah pemandu wisata virtual untuk Banyuwangi, Jawa Timur, Indonesia. PERAN DAN TUJUAN: Berikan informasi akurat, menarik, dan komprehensif tentang destinasi wisata Banyuwangi. Fokus utama pada pesona alam (pantai, gunung, air terjun, taman nasional) dan kekayaan kuliner khas Banyuwangi. Jawab pertanyaan wisatawan dengan ramah, informatif, dan antusias. Selalu gunakan Bahasa Indonesia yang baik, benar, dan sopan. ATURAN PENTING: 1. Selalu jawab dalam Bahasa Indonesia yang baik dan benar. 2. Jika ditanya tentang hal di luar konteks pariwisata Banyuwangi, kembalikan pembicaraan dengan sopan ke topik pariwisata Banyuwangi. 3. Berikan rekomendasi spesifik dengan nama tempat, lokasi, dan keunikannya. 4. Saat membahas kuliner, sebutkan bahan utama, cita rasa, dan tempat mendapatkannya. 5. Prioritaskan informasi tentang: Kawah Ijen, Pantai Pulau Merah, Alas Purwo, Sukamade, Teluk Ijo, Desa Osing, Taman Nasional Baluran, dan kuliner seperti Sego Tempong, Pecel Rawon, dan Rujak Soto. RESPONS ANDA HARUS: Informatif dan faktual tentang Banyuwangi, menunjukkan keramahan khas pemandu wisata, singkat namun komprehensif, dan selalu dalam Bahasa Indonesia.";

     // Initialize chat without system prompt
     React.useEffect(() => {
          initializeChat();
     }, []);

     const initializeChat = async () => {
          try {
               const model = geminiAI.getGenerativeModel({
                    model: "gemini-2.0-flash",
                    generationConfig: {
                         temperature: 0.7,
                         topP: 0.9,
                         topK: 40,
                    },
               });

               const chat = model.startChat();
               chatRef.current = chat;

               // Prime the chat with instructions but don't display this in the UI
               if (!chatInitialized) {
                    await chat.sendMessage("INSTRUKSI PENTING: " + tourGuideInstructions + " Tanggapi dengan: 'Siap, saya akan menjadi pemandu wisata Banyuwangi yang baik!'");
                    setChatInitialized(true);
               }
          } catch (error) {
               console.error("Error initializing chat:", error);
          }
     };

     React.useEffect(() => {
          if (chatContainerRef.current) {
               chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
     }, [messages]);

     const handleOnSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!input.trim()) {
               console.log('Input is empty');
               return;
          }

          const userMessage: Message = { text: input, isUser: true };
          setMessages(prev => [...prev, userMessage]);
          setIsLoading(true);

          const userInput = input;
          setInput('');

          try {
               if (!chatRef.current) {
                    await initializeChat();
               }

               // Before sending user message, make sure we've primed the model
               if (!chatInitialized) {
                    await chatRef.current.sendMessage("INSTRUKSI PENTING: " + tourGuideInstructions + " Tanggapi dengan: 'Siap!'");
                    setChatInitialized(true);
               }

               // Send message to Gemini
               const result = await chatRef.current.sendMessage(userInput);
               const response = result.response.text().replace(/\*|#/g, "");

               const aiMessage: Message = { text: response, isUser: false };
               setMessages(prev => [...prev, aiMessage]);

               console.log('Response:', response);
          } catch (error) {
               console.error('Error generating content:', error);

               // Reinitialize chat if there's an error
               chatRef.current = null;
               setChatInitialized(false);
               await initializeChat();

               const errorMessage: Message = {
                    text: "Maaf, saya tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi dengan pertanyaan tentang wisata Banyuwangi.",
                    isUser: false
               };
               setMessages(prev => [...prev, errorMessage]);
          } finally {
               setIsLoading(false);
          }
     }

     return (
          <div className={`fixed z-50 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 right-4 bottom-4' : 'translate-x-full right-[-20px] bottom-4'}`}>
               <div className='relative w-80 h-96 bg-white rounded-lg shadow-lg p-4'>
                    <BiX onClick={() => setIsOpen(!isOpen)}
                         className='cursor-pointer absolute right-2 top-2 size-7 hover:bg-tertiary/20 rounded-md transition-all duration-150' />
                    <div>
                         <h2 className='text-lg font-semibold'>Pemandu Wisata Banyuwangi</h2>
                         <p className='text-sm text-gray-600'>Tanya tentang destinasi & kuliner Banyuwangi!</p>
                    </div>
                    <div>
                         <div ref={chatContainerRef} className='mt-4 pb-10 h-72 overflow-y-auto'>
                              {messages.length === 0 && (
                                   <div className='p-2 bg-primary/15 rounded-lg mb-5'>
                                        <p className='text-sm'>Halo! Saya pemandu wisata virtual Banyuwangi. Mau tahu tentang pesona alam atau kuliner khas Banyuwangi? Silakan bertanya!</p>
                                   </div>
                              )}
                              {messages.map((msg, index) => (
                                   <div
                                        key={index}
                                        className={`p-2 rounded-lg mb-2 ${msg.isUser ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-primary/15 mr-auto max-w-[80%]'}`}
                                   >
                                        <p className='text-sm'>{msg.text}</p>
                                   </div>
                              ))}
                              {isLoading && (
                                   <div className='p-2 bg-primary/15 rounded-lg mb-2'>
                                        <p className='text-sm'>Sedang memikirkan jawaban terbaik...</p>
                                   </div>
                              )}
                         </div>
                    </div>
                    <div className='absolute bottom-2 right-0 w-full px-2'>
                         <form className='relative w-full'
                              onSubmit={handleOnSubmit}>
                              <input
                                   type="text"
                                   value={input}
                                   className='border-2 border-gray-300 rounded-lg p-2 w-full outline-none focus:border-gray-400 transition-all duration-150'
                                   placeholder='Tanya tentang wisata Banyuwangi...'
                                   onChange={(e) => setInput(e.target.value)}
                                   disabled={isLoading}
                              />
                              <button
                                   type='submit'
                                   className='absolute right-0 bottom-0 bg-primary text-white rounded-lg px-4 h-full w-fit
                                   hover:bg-primary/80 transition-all duration-150 hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                                   disabled={isLoading || !input.trim()}
                              >
                                   Kirim
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     )
}

export default ChatBot