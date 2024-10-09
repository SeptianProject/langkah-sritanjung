import { AdvancedMarker, AdvancedMarkerAnchorPoint, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';

const center = {
     lat: -8.219233,
     lng: 114.369225
}

interface MarkerProps extends google.maps.MarkerOptions {
     onClick: (e: google.maps.MapMouseEvent) => void
     onDrag: (e: google.maps.MapMouseEvent) => void
     onDragStart: (e: google.maps.MapMouseEvent) => void
     onDragEnd: (e: google.maps.MapMouseEvent) => void
     onMouseOver: (e: google.maps.MapMouseEvent) => void
     onMouseOut: (e: google.maps.MapMouseEvent) => void
}

const API_KEY: string = import.meta.env.VITE_GMAPS_API_KEY;

const MapVisGl = () => {
     return (
          <APIProvider apiKey={API_KEY}>
               <Map
                    className='w-full h-[30rem] overflow-hidden'
                    defaultZoom={12}
                    defaultCenter={center}
                    disableDefaultUI={true}
                    zoomControl={true}
                    defaultTilt={10}
                    gestureHandling={'greedy'}
                    mapId={'2195f37db628e10d'}>
                    <AdvancedMarker position={center} anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM_LEFT}>
                         <Pin
                              scale={0.8}
                              // glyph={'🚀'}
                              background={'#EA8104'}
                              borderColor={'#EA8104'}
                              glyphColor={'#fff'}
                         />
                    </AdvancedMarker>
               </Map>
          </APIProvider>
     )
}

export default MapVisGl