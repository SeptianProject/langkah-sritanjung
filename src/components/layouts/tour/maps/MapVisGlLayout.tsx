import {
     Map,
     useMap,
     useMapsLibrary,
     APIProvider,
     // Pin,
     // AdvancedMarker,
     // InfoWindow
} from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'


const MapVisGlLayout = () => {
     const position = { lat: -8.219233, lng: 114.369225 }
     // const [open, setOpen] = useState(false)

     return (
          <APIProvider apiKey={import.meta.env.VITE_GMAPS_API_KEY}>
               <div className='w-full h-[60vh]'>
                    <Map
                         defaultZoom={10}
                         defaultCenter={position}
                         disableDefaultUI={true}
                         fullscreenControl={false}
                         mapId={import.meta.env.VITE_GMAPS_ID}>
                         {/* <AdvancedMarker position={position} >
                              <Pin background={'orange'}
                                   glyphColor={'white'}
                                   borderColor={'orange'} />
                         </AdvancedMarker> */}
                         {/* {open && (
                              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                   Im in Banyuwangi
                              </InfoWindow>
                         )} */}
                         <Directions />
                    </Map>
               </div>
          </APIProvider>
     )
}

export default MapVisGlLayout


const Directions = () => {
     const map = useMap()
     const routesLibrary = useMapsLibrary("routes")
     const [directionsService, setDirectionsService] =
          useState<google.maps.DirectionsService>()
     const [directionsRenderer, setDirectionsRenderer] =
          useState<google.maps.DirectionsRenderer>()
     const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
     const [routeIndex, setRouteIndex] = useState<number>(0)
     const selected = routes[routeIndex]
     const leg = selected?.legs[0]

     useEffect(() => {
          if (!routesLibrary || !map) return;
          setDirectionsService(new routesLibrary.DirectionsService())
          setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
     }, [routesLibrary, map])

     useEffect(() => {
          if (!directionsService || !directionsRenderer) return;

          directionsService.route({
               origin: 'Bandara Blimbingsari',
               destination: 'Ijen',
               travelMode: google.maps.TravelMode.DRIVING,
               provideRouteAlternatives: true,
               optimizeWaypoints: true,
          }).then((response) => {
               directionsRenderer.setDirections(response)
               setRoutes(response.routes)
          })
     }, [directionsService, directionsRenderer])

     useEffect(() => {
          if (!directionsRenderer) return;
          directionsRenderer.setRouteIndex(routeIndex)
     }, [routeIndex, directionsRenderer])

     if (!leg) return null

     return (
          <div className='absolute top-2 right-2 bg-white rounded-lg 
          text-tertiary shadow-xl p-3 w-44 h-auto'>
               <h2 className='text-sm font-semibold'>{selected.summary}</h2>
               <p className='text-xs font-medium text-opacity-80'>
                    {leg.start_address.split(',')[0]} ke {leg.end_address.split(',')[0]}
               </p>
               <div className='mt-2'>
                    <h5 className='text-xs font-medium text-opacity-80'>Jarak: {leg.distance?.text}</h5>
                    <h5 className='text-xs font-medium text-opacity-80'>Waktu: {leg.duration?.text}</h5>
               </div>

               <h2 className='text-sm font-semibold mt-4'>Other Routes</h2>
               <ul>
                    {routes.map((route, index) => (
                         <li key={route.summary} className='text-xs font-medium flex justify-start'>
                              <button className='border border-slate-600 p-1 mt-2' onClick={() => setRouteIndex(index)}>
                                   {route.summary}
                              </button>
                         </li>
                    ))
                    }
               </ul>
          </div>
     )
}