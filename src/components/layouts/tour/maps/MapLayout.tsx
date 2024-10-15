import { useState, useMemo, useCallback, useRef } from "react"
import {
     GoogleMap,
     Marker,
     DirectionsRenderer,
     Circle,
     MarkerClusterer,
     useJsApiLoader,
     useLoadScript,
} from '@react-google-maps/api'
import Places from "./Places"
import DIstance from "./DIstance"

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


const MapLayout = () => {
     const { isLoaded } = useLoadScript({
          googleMapsApiKey: import.meta.env.VITE_GMAPS_API_KEY,
          libraries: ['places']
     })
     const [address, setAddress] = useState<google.maps.LatLngLiteral>()
     const mapRef = useRef<GoogleMap>()
     const center = useMemo<LatLngLiteral>(() => ({ lat: -8.219233, lng: 114.369225 }), [])
     const options = useMemo<MapOptions>(
          () => ({
               mapId: 'aad10d509ff7017c',
               disableDefaultUI: true,
               clickableIcons: false,
          }), []
     )

     const onLoad = useCallback((map) => (mapRef.current = map), [])

     if (!isLoaded) return <div>Loading...</div>

     return (
          <div>
               <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '60vh' }}
                    zoom={10}
                    center={center}
                    options={options}
                    onLoad={onLoad}
               >
                    <Places
                         setAddress={(position) => {
                              setAddress(position)
                              mapRef.current?.panTo(position)
                         }} />
                    {address && (
                         <>
                              <Marker position={address} />

                              <Circle center={address} radius={15000} options={closeOptions} />
                              <Circle center={address} radius={30000} options={middleOptions} />
                              <Circle center={address} radius={45000} options={farOptions} />
                         </>
                    )}
               </GoogleMap>
          </div>
     )
}

export default MapLayout


const defaultOptions = {
     strokeOpacity: 0.5,
     strokeWeight: 2,
     clickable: false,
     draggable: false,
     editable: false,
     visible: true,
};
const closeOptions = {
     ...defaultOptions,
     zIndex: 3,
     fillOpacity: 0.05,
     strokeColor: "#8BC34A",
     fillColor: "#8BC34A",
};
const middleOptions = {
     ...defaultOptions,
     zIndex: 2,
     fillOpacity: 0.05,
     strokeColor: "#FBC02D",
     fillColor: "#FBC02D",
};
const farOptions = {
     ...defaultOptions,
     zIndex: 1,
     fillOpacity: 0.05,
     strokeColor: "#FF5252",
     fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
     const _houses: Array<LatLngLiteral> = [];
     for (let i = 0; i < 100; i++) {
          const direction = Math.random() < 0.5 ? -2 : 2;
          _houses.push({
               lat: position.lat + Math.random() / direction,
               lng: position.lng + Math.random() / direction,
          });
     }
     return _houses;
};