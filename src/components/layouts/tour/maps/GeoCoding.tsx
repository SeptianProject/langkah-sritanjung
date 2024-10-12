import { useMap } from '@vis.gl/react-google-maps'

const GeoCoding = () => {
     const map = useMap()
     const geoCoder = new google.maps.Geocoder()
     const location = { lat: -8.219233, lng: 114.369225 }

     return (
          <div>GeoCoding</div>
     )
}

export default GeoCoding