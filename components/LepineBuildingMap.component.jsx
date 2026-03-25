import React, { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import googleMapStyles from "../utils/googleMapStyles";

const LepineBuildingMap = ({ neighbourhoods }) => {
  console.log(neighbourhoods);
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = { lat: 45.3475, lng: -75.9201 }; // Default center from index.html

  const options = {
    styles: googleMapStyles, // Custom styling from your utils
    zoomControl: true,
    mapTypeControl: true, // Allows users to switch views via UI
    clickableIcons: false,
    minZoom: 8,
    maxZoom: 20,
    mapTypeId: "satellite", // Satellite view by default
  };

  const handleMarkerClick = (propertyId) => {
    setActiveMarker(propertyId);
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
    >
      {neighbourhoods.map((property) => (
        <Marker
          key={property.pageId}
          position={{
            lat: parseFloat(property.address.coords.lat),
            lng: parseFloat(property.address.coords.lng),
          }}
          onClick={() => handleMarkerClick(property.pageId)}
          icon={{
            url: property.marker,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        >
          {activeMarker === property.pageId && (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              {/* Custom InfoWindow styled like NeighbourhoodCard */}
              <div className="mapInfoWindow">
                <div
                  className="neighbourhoodCard"
                  style={{ width: "100%", height: "100%", margin: 0 }}
                >
                  <div
                    className="neighbourhoodCard__image themeBGDark"
                    style={{ height: "120px" }}
                  >
                    <img
                      src={property.marker}
                      className="neighbourhoodCard__propertyImage"
                      alt={property.name}
                      style={{ opacity: 1, transform: "none" }}
                    />
                  </div>
                  <div
                    className="neighbourhoodCard__content"
                    style={{ height: "80px", padding: "5px" }}
                  >
                    <p
                      className="neighbourhoodCard__name"
                      style={{ fontSize: "14px" }}
                    >
                      {property.name}
                    </p>
                    <p
                      className="neighbourhoodCard__city"
                      style={{ fontSize: "12px" }}
                    >
                      {property.cityName}
                    </p>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

export default LepineBuildingMap;
