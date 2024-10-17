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

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const MapLayout = ({ setLoading }: { setLoading: (loading: boolean) => void }) => {
     const { isLoaded } = useLoadScript(
          { googleMapsApiKey: mapApiKey }
     )
     const { destination } = useParams<Params>()

     const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null)
     const [destinationData, setDestinationData] = useState<LatLngLiteral | null>(null)
     const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
     const mapRef = useRef<google.maps.Map | null>(null)
     const center = useMemo<LatLngLiteral>(() => ({ lat: -8.219233, lng: 114.369225 }), [])
     const options = useMemo<MapOptions>(() => ({
          mapId: 'aad10d509ff7017c',
          disableDefaultUI: true,
          clickableIcons: false,
     }), [])

     const onLoad = useCallback((map: google.maps.Map) => {
          (mapRef.current = map)
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
                         travelMode: google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                         if (status === google.maps.DirectionsStatus.OK) {
                              setDirections(result)
                         } else {
                              console.error('Error fetch directions:', status)
                         }
                    }
               ).then((response) => {
                    setDirections(response)

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
               })
          }
     }, [userLocation, destinationData])

     if (!isLoaded || !userLocation || !destinationData) return (
          <div>
               <img src={assets.tourLoading}
                    className="size-40 m-auto" alt="Loading..." />
          </div>
     )

     return (
          <div className="h-full">
               <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={userLocation === null ? center : userLocation}
                    options={options}
                    onLoad={onLoad}>

                    {directions && (
                         <DirectionsRenderer
                              options={{
                                   polylineOptions: {
                                        strokeColor: "#EA8104",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 5
                                   },
                                   suppressMarkers: true,
                              }}
                              directions={directions} />
                    )}
               </GoogleMap>
          </div>
     )
}

export default MapLayout