/* eslint-disable @typescript-eslint/no-unused-vars */
import usePlacesAutocomplete, {
     getGeocode,
     getLatLng
} from "use-places-autocomplete"


type PlacesProps = {
     setAddress: (position: google.maps.LatLngLiteral) => void
}

const Places = ({ setAddress }: PlacesProps) => {
     const {
          ready,
          value,
          setValue,
          suggestions: { status, data },
          clearSuggestions
     } = usePlacesAutocomplete()

     console.log(status, data)

     return (
          <div className="flex flex-col items-center w-80 h-80">
               <div className="absolute top-2 left-2 w-80 flex gap-x-2">
                    <input type="text"
                         value={value}
                         onChange={(e) => setValue(e.target.value)}
                         disabled={!ready}
                         className="bg-white ring-2 ring-orange-500 rounded-md p-2"
                         placeholder="Search here..."
                    />
                    <button type="submit" className="bg-primary text-white rounded-md p-2">Submit</button>
               </div>
               <div className="absolute top-16 left-2 bg-white shadow-xl w-44 h-60 ring-2 ring-primary rounded-md">
                    <select className="flex flex-col">
                         {status === "OK" && data.map((description, place_id) => (
                              <option key={place_id} className="w-40 absolute">{description.description}</option>
                         ))}
                    </select>
               </div>
          </div>
     )
}

export default Places