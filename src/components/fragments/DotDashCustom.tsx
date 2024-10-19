import DotElement from '../elements/DotElement'
import DashVertical from '../elements/DashVertical'

interface DotDashCustomProps {
     itemCount: number
}

const DotDashCustom = ({ itemCount }: DotDashCustomProps) => {
     const counts = Array.from({ length: itemCount }, (_, i) => i + 1)

     return (
          <div className='flex flex-col items-center'>
               {counts.map((num) => (
                    <div key={num} className='flex flex-col items-center'>
                         <DotElement className='shadow-solidFlat shadow-secondary flex justify-center items-center'>
                              <h1 className='text-white font-semibold'>{num}</h1>
                         </DotElement>
                         {num < itemCount && <DashVertical />}
                    </div>
               ))}
          </div>
     )
}

export default DotDashCustom