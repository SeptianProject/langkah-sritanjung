import { GoogleMap, LoadScript, Marker, } from '@react-google-maps/api'
import { mapStyle } from './mapStyle';
import { useState } from 'react';

const API_KEY: string = import.meta.env.VITE_GMAPS_API_KEY;

const center = {
     lat: -8.219233,
     lng: 114.369225
}

const containerStyle = {
     width: '100%',
     height: '400px'
}

const MapLayout = () => {
     const mapOptions = {
          styles: mapStyle,
          disableDefaultUI: true,
          zoomControll: true,
     }
     const [map, setMap] = useState<google.maps.Map | null>(null)

     const onLoad = async (mapInstance: google.maps.Map) => {
          const bounds = await new google.maps.LatLngBounds()

          mapInstance.fitBounds(bounds)
          setMap(mapInstance)
     }

     const onUnmount = () => {
          setMap(null)
     }

     return (
          <LoadScript googleMapsApiKey={API_KEY}>
               <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    zoom={10}

               >
                    <Marker position={center} />
               </GoogleMap>
          </LoadScript>
     )
}

export default MapLayout