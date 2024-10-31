import { useMemo, useCallback, useRef, useState, useEffect } from "react"
import {
     DirectionsRenderer,
     GoogleMap,
     useLoadScript,
} from '@react-google-maps/api'
import { assets } from "../../../../assets/asset";
import axios from "axios";
import { Params, useParams } from "react-router-dom";
import { baseUrl, mapApiKey } from "../../../elements/Core";
import Loading from "react-loading";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type DirectionResult = google.maps.DirectionsResult;

interface RouteInfo {
     route: DirectionResult
     distance: string
     duration: string
}

const MapLayout = ({ setLoading }: { setLoading: (loading: boolean) => void }) => {
     const { isLoaded } = useLoadScript(
          { googleMapsApiKey: mapApiKey }
     )
     const { destination } = useParams<Params>()

     const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null)
     const [destinationData, setDestinationData] = useState<LatLngLiteral | null>(null)
     const [routes, setRoutes] = useState<RouteInfo[]>([])
     const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0)
     const mapRef = useRef<google.maps.Map | null>(null)
     const center = useMemo<LatLngLiteral>(() => ({ lat: -8.219233, lng: 114.369225 }), [])
     const options = useMemo<MapOptions>(() => ({
          mapId: 'aad10d509ff7017c',
          disableDefaultUI: true,
          clickableIcons: false,
     }), [])

     const onLoad = useCallback((map: google.maps.Map) => {
          mapRef.current = map
          setLoading(false)
     }, [setLoading])

     useEffect(() => {
          const fetchDestinationData = async () => {
               try {
                    const response = await axios.get(`${baseUrl}/destinasi-wisatas/${destination}`)

                    const data = response.data.data
                    setDestinationData({
                         lat: data.attributes.location.lat,
                         lng: data.attributes.location.lng
                    })
               } catch (error) {
                    console.error(error)
               }
          }

          if (destination) {
               fetchDestinationData()
          }
     }, [destination])

     useEffect(() => {
          navigator.geolocation.getCurrentPosition(
               (position) => {
                    setUserLocation({
                         lat: position.coords.latitude,
                         lng: position.coords.longitude
                    })
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
                         }
                    }
               )
          }
     }, [userLocation, destinationData])

     if (!isLoaded || !userLocation || !destinationData) return (
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
               <div className="absolute top-10 right-10 bg-white 
               shadow-lg z-20 rounded-xl">
                    <h2 className="text-xl font-medium text-center pt-5">
                         Informasi Rute
                    </h2>
                    <div className="w-80 p-5">
                         {routes.map((route, index) => (
                              <div key={index} onClick={() => setSelectedRouteIndex(index)}
                                   className={`cursor-pointer p-4 rounded-lg 
                                   ${selectedRouteIndex === index
                                             ? 'bg-primary text-white'
                                             : 'bg-gray-100'}`}>
                                   <p className="font-semibold">Rute {index + 1}</p>
                                   <p>Jarak: {route.distance}</p>
                                   <p>Waktu: {route.duration}</p>
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