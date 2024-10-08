import DotElement from '../elements/DotElement'
import DashVertical from '../elements/DashVertical'
import { useState } from 'react'

const DotDashCustom = () => {
     const [counts] = useState<number[]>([1, 2, 3, 4])

     return (
          <div className='flex flex-col items-center'>
               {counts.map((num) => (
                    <div key={num} className='flex flex-col items-center'>
                         <DotElement className='shadow-solidFlat shadow-secondary flex justify-center items-center'>
                              <h1 className='text-white font-semibold'>{num}</h1>
                         </DotElement>
                         {num < 4 && <DashVertical />}
                    </div>
               ))}
          </div>
     )
}

export default DotDashCustom