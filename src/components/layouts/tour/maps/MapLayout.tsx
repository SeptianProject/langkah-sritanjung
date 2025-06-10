import React from "react"
import { Params, useParams } from "react-router-dom";
import Loading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { fetchResource } from "../../../../services/apiService";
import { Destination } from "../../../../types/common";

const MapLayout = ({ setLoading }: { setLoading: (loading: boolean) => void }) => {
     const { destination } = useParams<Params>()
     const [userLocation, setUserLocation] = React.useState<{ lat: number, lng: number } | null>(null)
     // const center = React.useMemo(() => ({ lat: -8.219233, lng: 114.369225 }), [])

     const { data } = useQuery<Destination>({
          queryKey: ['destinations', destination],
          queryFn: async () => fetchResource('destinations', destination),
          enabled: !!destination,
     })

     React.useEffect(() => {
          console.log('Fetching user location...')
          navigator.geolocation.getCurrentPosition(
               (position) => {
                    setUserLocation({
                         lat: position.coords.latitude,
                         lng: position.coords.longitude
                    })
                    setLoading(false)
               },
               (error) => {
                    console.error('Error get user location:', error)
                    setLoading(false)
               },
               {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
               }
          )
     }, [setLoading])

     if (!userLocation || !data) return (
          <div className="flex flex-col justify-center items-center w-full h-full">
               <h1 className="text-center">Sedang memuat...</h1>
               <Loading className="text-center"
                    color="#233028"
                    height={50}
                    width={50}
                    type="cylon" />
          </div>
     )

     return (
          <div className="h-full relative">
               <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                         <h2 className="text-2xl font-bold mb-4 text-center">Informasi Lokasi</h2>
                         <div className="mb-4">
                              <p className="text-gray-700"><strong>Destinasi:</strong> {data?.name || 'Tidak diketahui'}</p>
                              <p className="text-gray-700"><strong>Lokasi Anda:</strong> {userLocation ? `${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}` : 'Memuat...'}</p>
                              <p className="text-gray-700"><strong>Lokasi Tujuan:</strong> {data?.location ? `${data.location.lat.toFixed(6)}, ${data.location.lng.toFixed(6)}` : 'Memuat...'}</p>
                         </div>
                         <div className="bg-yellow-100 p-4 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                   Peta tidak dapat ditampilkan saat ini. Silakan gunakan aplikasi peta eksternal untuk navigasi.
                              </p>
                         </div>
                         {data?.location && (
                              <div className="mt-4">
                                   <a
                                        href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${data.location.lat},${data.location.lng}&travelmode=driving`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary text-white py-2 px-4 rounded block text-center"
                                   >
                                        Buka di Google Maps
                                   </a>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}

export default MapLayout