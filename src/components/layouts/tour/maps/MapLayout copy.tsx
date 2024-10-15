import {
     Map,
     APIProvider,
     AdvancedMarker,
     Pin,
} from '@vis.gl/react-google-maps'
import Places from './Places';
import { useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface MapLayoutCopyProps {
     location: { lat: number, lng: number } | null;
}

const MapLayoutCopy = ({ location }: MapLayoutCopyProps) => {
     const defaultPosition = { lat: -8.219233, lng: 114.369225 }
     // const [viewport, setViewport] = useState(defaultPosition)
     const [address, setAddress] = useState<google.maps.LatLngLiteral>()
     const mapRef = useRef<google.maps.Map>()

     const { isLoaded } = useJsApiLoader({
          googleMapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
          libraries: ['places']
     })

     if (!isLoaded) return <div>Loading...</div>

     return (
          <APIProvider apiKey={import.meta.env.VITE_GMAPS_API_KEY} >
               <div className='w-full h-[60vh]'>
                    <Map
                         defaultZoom={10}
                         defaultCenter={location || defaultPosition}
                         disableDefaultUI={true}
                         fullscreenControl={false}
                         mapId={import.meta.env.VITE_GMAPS_ID}
                    >
                         <Places
                              setAddress={(position) => {
                                   setAddress(position)
                                   mapRef.current?.panTo(position)
                              }} />
                         {address && (
                              <AdvancedMarker position={address} >
                                   <Pin background={'orange'}
                                        glyphColor={'white'}
                                        borderColor={'orange'} />
                              </AdvancedMarker>
                         )}
                         {/* <Directions /> */}
                    </Map>
               </div>
          </APIProvider>
     )
}

export default MapLayoutCopy


