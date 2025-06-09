import { useMemo, useCallback, useRef, useState, useEffect } from "react"
import {
     DirectionsRenderer,
     GoogleMap,
     useLoadScript,
} from '@react-google-maps/api'
import { assets } from "../../../../assets/asset";
import { Params, useParams } from "react-router-dom";
import { mapApiKey } from "../../../elements/Core";
import Loading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { fetchResource } from "../../../../services/apiService";
import { Destination } from "../../../../types/common";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type DirectionResult = google.maps.DirectionsResult;

interface RouteInfo {
     route: DirectionResult
     distance: string
     duration: string
}

const MapLayout = ({ setLoading }: { setLoading: (loading: boolean) => void }) => {
     const { isLoaded, loadError } = useLoadScript({
          googleMapsApiKey: mapApiKey
     })
     const { destination } = useParams<Params>()

     const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null)
     const [destinationData, setDestinationData] = useState<LatLngLiteral | null>(null)
     const [routes, setRoutes] = useState<RouteInfo[]>([])
     const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0)
     const [locationError, setLocationError] = useState<string | null>(null)
     const [apiError, setApiError] = useState<string | null>(null)
     const mapRef = useRef<google.maps.Map | null>(null)
     const center = useMemo<LatLngLiteral>(() => ({ lat: -8.219233, lng: 114.369225 }), [])
     const options = useMemo<MapOptions>(() => ({
          mapId: 'aad10d509ff7017c',
          disableDefaultUI: true,
          clickableIcons: false,
     }), [])

     const { data } = useQuery<Destination>({
          queryKey: ['destinations', destination],
          queryFn: async () => await fetchResource('destinations', destination),
          enabled: !!destination,
     })

     const onLoad = useCallback((map: google.maps.Map) => {
          mapRef.current = map
          setLoading(false)
     }, [setLoading])

     useEffect(() => {
          const fetchDestinationData = async () => {
               try {
                    if (data?.location?.lat && data?.location?.lng) {
                         setDestinationData({
                              lat: data.location.lat,
                              lng: data.location.lng
                         })
                    } else {
                         console.error('Destination location data is incomplete or missing')
                         setLocationError('Data lokasi tujuan tidak lengkap')
                    }
               } catch (error) {
                    console.error(error)
                    setLocationError('Gagal mendapatkan data lokasi tujuan')
               }
          }

          if (destination && data) {
               fetchDestinationData()
          }
     }, [destination, data])

     useEffect(() => {
          const getLocation = () => {
               if (!navigator.geolocation) {
                    console.error('Geolocation is not supported by this browser')
                    setLocationError('Geolocation tidak didukung oleh browser ini')
                    setLoading(false)
                    // Use default location as fallback
                    setUserLocation(center)
                    return
               }

               const options = {
                    enableHighAccuracy: true,
                    timeout: 15000, // Increased timeout further
                    maximumAge: 0
               }

               // Try to get position with high accuracy first
               navigator.geolocation.getCurrentPosition(
                    (position) => {
                         console.log("Location obtained with high accuracy:", position.coords)
                         setUserLocation({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                         })
                         setLocationError(null)
                    },
                    (error) => {
                         console.warn('High accuracy location failed, trying with low accuracy:', error)

                         // Fall back to low accuracy if high accuracy fails
                         navigator.geolocation.getCurrentPosition(
                              (position) => {
                                   console.log("Location obtained with low accuracy:", position.coords)
                                   setUserLocation({
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude
                                   })
                                   setLocationError("Lokasi mungkin kurang akurat. Silakan aktifkan GPS untuk akurasi lebih baik.")
                              },
                              (error) => {
                                   console.error('Error getting user location:', error)
                                   let errorMessage = 'Gagal mendapatkan lokasi Anda'

                                   switch (error.code) {
                                        case 1:
                                             errorMessage = 'Akses lokasi ditolak. Harap izinkan akses lokasi di pengaturan browser Anda.'
                                             break
                                        case 2:
                                             errorMessage = 'Lokasi tidak tersedia. Pastikan GPS atau layanan lokasi Anda aktif.'
                                             break
                                        case 3:
                                             errorMessage = 'Waktu permintaan lokasi habis. Silakan coba lagi.'
                                             break
                                   }

                                   setLocationError(errorMessage)
                                   setUserLocation(center) // Use default location as fallback
                                   setLoading(false)
                              },
                              { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
                         )
                    },
                    options
               )
          }

          getLocation()
     }, [center, setLoading])

     useEffect(() => {
          if (userLocation && destinationData) {
               const directionsService = new google.maps.DirectionsService()

               directionsService.route(
                    {
                         origin: userLocation,
                         destination: destinationData,
                         travelMode: google.maps.TravelMode.DRIVING,
                         provideRouteAlternatives: true,
                         optimizeWaypoints: true,
                    },
                    (result, status) => {
                         if (status === google.maps.DirectionsStatus.OK && result) {
                              const routesInfo: RouteInfo[] = result.routes.map(route => ({
                                   route: {
                                        ...result,
                                        routes: [route]
                                   },
                                   distance: route.legs[0].distance?.text || '',
                                   duration: route.legs[0].duration?.text || ''
                              }))

                              setRoutes(routesInfo)
                              setApiError(null)

                              new google.maps.Marker({
                                   position: userLocation,
                                   map: mapRef.current,
                                   icon: {
                                        url: assets.markOrigin,
                                        scaledSize: new google.maps.Size(40, 40)
                                   },
                              })

                              new google.maps.Marker({
                                   position: destinationData,
                                   map: mapRef.current,
                                   icon: {
                                        url: assets.markDestination,
                                        scaledSize: new google.maps.Size(25, 25)
                                   },
                              })
                         } else {
                              console.error('Error fetch directions:', status)
                              let errorMsg = 'Gagal mendapatkan rute perjalanan.'

                              // Provide more helpful error message based on status
                              if (status === 'REQUEST_DENIED') {
                                   errorMsg = 'API Google Maps tidak dikonfigurasi dengan benar. Harap hubungi administrator.'
                              } else if (status === 'ZERO_RESULTS') {
                                   errorMsg = 'Tidak ditemukan rute perjalanan antara lokasi asal dan tujuan.'
                              } else if (status === 'OVER_QUERY_LIMIT') {
                                   errorMsg = 'Batas kuota API Google Maps terlampaui. Silakan coba lagi nanti.'
                              }

                              setApiError(errorMsg)

                              // Still place markers even if directions fail
                              if (mapRef.current) {
                                   new google.maps.Marker({
                                        position: userLocation,
                                        map: mapRef.current,
                                        icon: {
                                             url: assets.markOrigin,
                                             scaledSize: new google.maps.Size(40, 40)
                                        },
                                   })

                                   new google.maps.Marker({
                                        position: destinationData,
                                        map: mapRef.current,
                                        icon: {
                                             url: assets.markDestination,
                                             scaledSize: new google.maps.Size(25, 25)
                                        },
                                   })
                              }
                         }
                    }
               )
          }
     }, [userLocation, destinationData])

     if (loadError) {
          return (
               <div className="flex flex-col justify-center items-center w-full h-full">
                    <h1 className="text-center text-red-600 font-bold">Error loading Google Maps</h1>
                    <p className="text-center">
                         Pastikan Anda tidak menggunakan adblocker atau memiliki akses internet yang stabil.
                    </p>
               </div>
          )
     }

     if (!isLoaded) return (
          <div className="flex flex-col justify-center items-center w-full h-full">
               <h1 className="text-center">Sedang memuat peta...</h1>
               <Loading className="text-center"
                    color="#233028"
                    height={50}
                    width={50}
                    type="cylon" />
          </div>
     )

     // Display location error but still render map with default location
     if (locationError) {
          return (
               <div className="h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 z-20">
                         <p>{locationError}</p>
                         <p className="text-sm">Menggunakan lokasi default untuk tampilan peta.</p>
                    </div>

                    <div className="absolute top-2 right-2 lg:top-10 lg:right-10 bg-white 
                    shadow-lg z-10 rounded-xl">
                         <h2 className="text-base lg:text-xl font-medium text-center pt-5">
                              Informasi Rute
                         </h2>
                         <div className="w-44 lg:w-80 p-5">
                              {routes.length > 0 ? routes.map((route, index) => (
                                   <div key={index} onClick={() => setSelectedRouteIndex(index)}
                                        className={`cursor-pointer p-4 rounded-lg mb-2
                                        ${selectedRouteIndex === index
                                                  ? 'bg-primary text-white'
                                                  : 'bg-gray-100'}`}>
                                        <p className="font-semibold text-sm lg:text-base">Rute {index + 1}</p>
                                        <p className="text-xs lg:text-base">Jarak: {route.distance}</p>
                                        <p className="text-xs lg:text-base">Waktu: {route.duration}</p>
                                   </div>
                              )) : (
                                   <div className="p-4 bg-gray-100 rounded-lg">
                                        <p>Tidak dapat menampilkan rute karena kesalahan lokasi.</p>
                                   </div>
                              )}
                         </div>
                    </div>

                    <GoogleMap
                         mapContainerStyle={{ width: '100%', height: '100%' }}
                         zoom={10}
                         center={userLocation || center}
                         options={options}
                         onLoad={onLoad}>

                         {routes[selectedRouteIndex] && (
                              <DirectionsRenderer
                                   options={{
                                        polylineOptions: {
                                             strokeColor: "#EA8104",
                                             strokeOpacity: 0.8,
                                             strokeWeight: 5
                                        },
                                        suppressMarkers: true,
                                   }}
                                   directions={routes[selectedRouteIndex].route} />
                         )}
                    </GoogleMap>
               </div>
          )
     }

     // Display API error but still render map
     if (apiError) {
          return (
               <div className="h-full relative">
                    <div className="absolute top-0 left-0 right-0 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 z-20">
                         <p className="font-bold">Peringatan API:</p>
                         <p>{apiError}</p>
                         <p className="text-sm mt-2">
                              <strong>Untuk Administrator:</strong> Pastikan billing Google Cloud Platform sudah diaktifkan
                              untuk API Key ini. Kunjungi <a
                                   href="https://console.cloud.google.com/project/_/billing/enable"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="underline">
                                   Google Cloud Console
                              </a> untuk mengaktifkan billing.
                         </p>
                    </div>

                    <GoogleMap
                         mapContainerStyle={{ width: '100%', height: '100%' }}
                         zoom={10}
                         center={userLocation || center}
                         options={options}
                         onLoad={onLoad}>
                         {userLocation && (
                              <div>
                                   {/* Markers will be added in the useEffect */}
                              </div>
                         )}
                    </GoogleMap>
               </div>
          )
     }

     return (
          <div className="h-full relative">
               <div className="absolute top-2 right-2 lg:top-10 lg:right-10 bg-white 
               shadow-lg z-10 rounded-xl">
                    <h2 className="text-base lg:text-xl font-medium text-center pt-5">
                         Informasi Rute
                    </h2>
                    <div className="w-44 lg:w-80 p-5">
                         {routes.map((route, index) => (
                              <div key={index} onClick={() => setSelectedRouteIndex(index)}
                                   className={`cursor-pointer p-4 rounded-lg mb-2
                                   ${selectedRouteIndex === index
                                             ? 'bg-primary text-white'
                                             : 'bg-gray-100'}`}>
                                   <p className="font-semibold text-sm lg:text-base">Rute {index + 1}</p>
                                   <p className="text-xs lg:text-base">Jarak: {route.distance}</p>
                                   <p className="text-xs lg:text-base">Waktu: {route.duration}</p>
                              </div>
                         ))}
                    </div>
               </div>

               <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={userLocation === null ? center : userLocation}
                    options={options}
                    onLoad={onLoad}>

                    {routes[selectedRouteIndex] && (
                         <DirectionsRenderer
                              options={{
                                   polylineOptions: {
                                        strokeColor: "#EA8104",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 5
                                   },
                                   suppressMarkers: true,
                              }}
                              directions={routes[selectedRouteIndex].route} />
                    )}
               </GoogleMap>
          </div>
     )
}

export default MapLayout