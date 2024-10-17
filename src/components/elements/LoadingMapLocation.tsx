import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/asset'
import { useEffect, useState } from 'react'

const LoadingMapLocation = () => {
     const navigate = useNavigate()
     const [loading, setLoading] = useState<boolean>(true)

     useEffect(() => {
          const duration = 5000
          const timer = setTimeout(() => {
               setLoading(false)
          }, duration)

          if (!loading) {
               navigate('/detail/:slug')
               clearTimeout(timer)
          }
     })

     return (
          <div className='min-h-screen max-w-full'>
               {loading && (
                    <img src={assets.tourLoading}
                         className="size-80 m-auto" alt="Loading..." />
               )}
          </div>
     )
}

export default LoadingMapLocation