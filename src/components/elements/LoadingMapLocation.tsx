import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../../assets/asset'
import { useEffect, useState } from 'react'

const LoadingMapLocation = () => {
     const navigate = useNavigate()
     const { slug } = useParams<{ slug: string }>()
     const [loading, setLoading] = useState<boolean>(true)

     useEffect(() => {
          const duration = 5000
          const timer = setTimeout(() => {
               setLoading(false)
          }, duration)

          if (!loading) {
               navigate(`/tour-guide/${slug}`)
               clearTimeout(timer)
          }
     }, [loading, navigate, slug])

     return (
          <div className='min-h-screen max-w-full flex justify-center items-center'>
               {loading && (
                    <img src={assets.tourLoading}
                         className="size-[20rem] m-auto"
                         alt="Loading..." />
               )}
          </div>
     )
}

export default LoadingMapLocation