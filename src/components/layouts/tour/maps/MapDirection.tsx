import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { assets } from "../../../../assets/asset";

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
          setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
               map,
               suppressMarkers: true,
               polylineOptions: {
                    strokeColor: '#EA8104',
                    strokeOpacity: 0.8,
                    strokeWeight: 4
               }
          }))
     }, [routesLibrary, map])

     useEffect(() => {
          if (!directionsService || !directionsRenderer) return;

          directionsService.route({
               origin: 'Banyuwangi',
               destination: 'Malang',
               travelMode: google.maps.TravelMode.DRIVING,
               provideRouteAlternatives: true,
               region: 'ID',
               optimizeWaypoints: true,
               drivingOptions: {
                    departureTime: new Date(),
                    trafficModel: google.maps.TrafficModel.BEST_GUESS
               },
          }).then((response) => {
               directionsRenderer.setDirections(response)
               setRoutes(response.routes)

               new google.maps.Marker({
                    position: response.routes[0].legs[0].start_location,
                    map: map,
                    icon: {
                         url: `${assets.markDestination}`,
                         scaledSize: new google.maps.Size(20, 20)
                    },
                    title: response.routes[0].legs[0].start_address
               })

               new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    icon: {
                         url: `${assets.markOrigin}`,
                         scaledSize: new google.maps.Size(30, 30)
                    },
                    title: response.routes[0].legs[0].end_address
               })

               response.routes[0].legs[0].via_waypoints.forEach((waypoint, index) => {
                    new google.maps.Marker({
                         position: {
                              lat: waypoint.lat(),
                              lng: waypoint.lng()
                         },
                         map: map,
                         icon: {
                              url: `${assets.markDestination}`,
                              scaledSize: new google.maps.Size(20, 20),
                         },
                         title: `Waypoint ${index + 1}`,
                    })
               })
          })
     }, [directionsService, directionsRenderer, map])

     useEffect(() => {
          if (!directionsRenderer) return;
          directionsRenderer.setRouteIndex(routeIndex)
     }, [routeIndex, directionsRenderer])

     if (!leg) return null

     return (
          <div className='hidden absolute top-2 right-2 bg-white rounded-lg 
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

export default Directions