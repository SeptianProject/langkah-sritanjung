/* eslint-disable @typescript-eslint/no-explicit-any */
import {
     Map,
     APIProvider,
     useMap,
     AdvancedMarker,
     Pin,
} from '@vis.gl/react-google-maps'
import { useEffect } from 'react'
import { assets } from '../../../../assets/asset'
import Directions from './MapDirection'


const MapVisGlLayout = ({ places }: { places: any[] }) => {
     const position = { lat: -8.219233, lng: 114.369225 }
     const map = useMap()

     useEffect(() => {
          if (!map || !places || places.length === 0) return

          places.forEach(place => {
               new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                    icon: {
                         url: `${assets.markDestination}`,
                         scaledSize: new google.maps.Size(20, 20),
                    }
               })
          });
     }, [places, map])

     return (
          <APIProvider apiKey={import.meta.env.VITE_GMAPS_API_KEY}>
               <div className='w-full h-[60vh]'>
                    <Map
                         defaultZoom={10}
                         defaultCenter={position}
                         disableDefaultUI={true}
                         fullscreenControl={false}
                         mapId={import.meta.env.VITE_GMAPS_ID}
                    >
                         <AdvancedMarker position={position} >
                              <Pin background={'orange'}
                                   glyphColor={'white'}
                                   borderColor={'orange'} />
                         </AdvancedMarker>
                         <Directions />
                    </Map>
               </div>
          </APIProvider>
     )
}

export default MapVisGlLayout


