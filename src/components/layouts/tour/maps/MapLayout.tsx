import {
     Map,
     APIProvider,
     AdvancedMarker,
     Pin,
} from '@vis.gl/react-google-maps'

const MapLayout = ({ places }: { places: google.maps.places.PlaceResult[] }) => {
     const position = { lat: -8.219233, lng: 114.369225 }

     return (
          <APIProvider apiKey={import.meta.env.VITE_GMAPS_API_KEY} >
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

                         {places.map((place, index) => (
                              <AdvancedMarker
                                   key={index}
                                   position={place.geometry?.location}
                                   title={place.name}>
                                   <Pin background={'blue'} glyphColor={'white'} borderColor={'blue'} />
                              </AdvancedMarker>
                         ))}
                         <Directions />
                    </Map>
               </div>
          </APIProvider>
     )
}

export default MapLayout


