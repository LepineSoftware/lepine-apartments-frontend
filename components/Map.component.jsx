import { GoogleMap, useLoadScript, onGoogleApiLoaded } from "@react-google-maps/api";
import { googleMapsApiKey } from "../utils/googleMapsApiKey";
import googleMapStyles from '../utils/googleMapStyles';
import MapMarker from "./MapMarker.component";

const Map = ({ children, coords, zoom }) => {
      const { isLoaded } = useLoadScript({ googleMapsApiKey: googleMapsApiKey });

      const handleApiLoaded = (map, maps) => {
        map.panBy(500, 500);
      };

      const loading = <div className="map"><p>Loading...</p></div>
      const content = () => {
          return (<GoogleMap 
                zoom={zoom} 
                center={coords}
                mapContainerClassName="map"
                onLoad={() => console.log('Map init')}
                // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                yesIWantToUseGoogleMapApiInternals
                options={{ styles: googleMapStyles }}
            >
              {children}
          </GoogleMap>);
      }

        return !isLoaded ? loading : content();
      
}

export default Map;

