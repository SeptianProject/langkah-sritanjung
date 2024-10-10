import { GoogleMap, LoadScript, Marker, } from '@react-google-maps/api'
import { useEffect, useState } from 'react';

const API_KEY: string = import.meta.env.VITE_GMAPS_API_KEY;

const center = {
     lat: -8.219233,
     lng: 114.369225
}

type MapLayoutProps = {
     location: { lat: number; lng: number } | null;
};

const containerStyle = {
     width: '100%',
     height: '400px'
}

const MapLayout = ({ location }: MapLayoutProps) => {
     const [map, setMap] = useState<google.maps.Map | null>(null)

     const onLoad = async (mapInstance: google.maps.Map) => {
          setMap(mapInstance)
     }

     const onUnmount = () => {
          setMap(null)
     }

     useEffect(() => {
          if (map && location) {
               map.panTo(location)
          }
     }, [location, map])
     // const onLoad = async (mapInstance: google.maps.Map) => {
     //      const bounds = await new google.maps.LatLngBounds()

     //      mapInstance.fitBounds(bounds)
     //      setMap(mapInstance)
     // }

     // const onUnmount = () => {
     //      setMap(null)
     // }

     return (
          <div className="w-full h-[25rem] overflow-hidden">
               <LoadScript googleMapsApiKey={API_KEY}>
                    <GoogleMap
                         mapContainerStyle={containerStyle}
                         center={location || center}
                         onLoad={onLoad}
                         onUnmount={onUnmount}
                         zoom={location ? 14 : 10}

                    >
                         {/* <Marker position={center} /> */}
                         {location && <Marker position={location} />}
                    </GoogleMap>
               </LoadScript>
          </div>
     )
}

export default MapLayout