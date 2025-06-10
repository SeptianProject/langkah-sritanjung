import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { mapApiKey } from './Core';

const MapTest = () => {
     const { isLoaded, loadError } = useLoadScript({
          googleMapsApiKey: mapApiKey
     });

     if (loadError) {
          console.error("Error loading maps:", loadError);
          return (
               <div className="p-4 bg-red-100 text-red-700 rounded">
                    <h3 className="font-bold">Error Loading Google Maps</h3>
                    <p>Error details: {loadError.message}</p>
               </div>
          );
     }

     if (!isLoaded) {
          return <div>Loading maps...</div>;
     }

     return (
          <div className="p-4">
               <h2 className="text-xl mb-4">Google Maps API Test</h2>
               <div className="border border-gray-300 rounded">
                    <GoogleMap
                         mapContainerStyle={{ width: '100%', height: '400px' }}
                         zoom={10}
                         center={{ lat: -8.219233, lng: 114.369225 }}
                    />
               </div>
               <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                    ✓ API Key berfungsi! Peta berhasil dimuat.
               </div>
          </div>
     );
};

export default MapTest;
