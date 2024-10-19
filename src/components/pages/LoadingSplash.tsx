import React, { useState, useEffect } from 'react';

interface LoadingSplashProps {
     onLoadingComplete: () => void;
}

const LoadingSplash: React.FC<LoadingSplashProps> = ({ onLoadingComplete }) => {
     const [progress, setProgress] = useState(0);
     const [isLoadingComplete, setIsLoadingComplete] = useState(false);
     const [dots, setDots] = useState('');

     useEffect(() => {
          const progressTimer = setInterval(() => {
               setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                         clearInterval(progressTimer);
                         setIsLoadingComplete(true);
                         return 100;
                    }
                    return prevProgress + 10;
               });
          }, 300);

          const dotsTimer = setInterval(() => {
               setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
          }, 300);

          return () => {
               clearInterval(progressTimer);
               clearInterval(dotsTimer);
          };
     }, []);

     useEffect(() => {
          if (isLoadingComplete) {
               setTimeout(() => {
                    onLoadingComplete();
               }, 1000);
          }
     }, [isLoadingComplete, onLoadingComplete]);

     return (
          <div className={`fixed inset-0 flex flex-col items-center justify-center z-50 
          overflow-hidden ${isLoadingComplete ? '' : ''}`}>
               <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-xl font-poppins font-medium mb-4 transform ">
                         Sedang Memuat<span className='text-2xl'>{dots}</span>
                    </h2>
                    <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                         <div
                              className={`h-full bg-primary transition-all duration-300 ease-linear 
                                   ${isLoadingComplete ? '' : ''}`}
                              style={{ width: `${progress}%` }}
                         ></div>
                    </div>
                    <p className="mt-2 text-sm font-medium">{progress}%</p>
               </div>
          </div>
     );
};

export default LoadingSplash;