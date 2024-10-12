const getGeocode = async (address: string) => {
     const geocoder = new google.maps.Geocoder();
     return new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
               if (status === 'OK') {
                    resolve(results![0].geometry.location);
               } else {
                    reject(status);
               }
          });
     });
};

export default getGeocode
