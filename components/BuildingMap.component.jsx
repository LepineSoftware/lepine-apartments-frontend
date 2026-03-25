import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  MarkerClustererF,
} from "@react-google-maps/api";
import Link from "next/link";

// Project Utilities
import { googleMapsApiKey } from "../utils/googleMapsApiKey";
import googleMapStyles from "../utils/googleMapStyles";
import { ImageLoader } from "../utils/imageLoader";
import { submitGAEvent } from "../utils/submitGAEvent";

// Defined outside to prevent re-renders
const LIBRARIES = ["geometry"];

/**
 * MapCard Component
 * Renders the image-prioritized property card for the InfoWindow.
 */
const MapCard = ({ name, city, image, href, theme, svg, i }) => {
  return (
    <Link
      href={href}
      className="neighbourhoodCard mapCard"
      data-theme={theme}
      onClick={() => submitGAEvent("neighbourhood_card_clicked")}
    >
      <div className="neighbourhoodCard__image themeBGDark">
        {/* Main Property Image */}
        {image &&
          ImageLoader(
            image,
            "neighbourhoodCard__propertyImage",
            "",
            300,
            300,
            0.1,
          )}

        {/* SVG Logo - Visible on Hover via CSS */}
        {svg ? (
          ImageLoader(svg, "neighbourhoodCard__logo", "", 225, 225, 0.1)
        ) : (
          <div className="neighbourhoodCard__logo">
            <p>
              Coming
              <br />
              Soon
            </p>
          </div>
        )}
      </div>

      <div className="neighbourhoodCard__content">
        <p className="neighbourhoodCard__name">{name}</p>
        {city && <p className="neighbourhoodCard__city">{city}</p>}
      </div>
    </Link>
  );
};

const PropertyMap = ({ neighbourhoods }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: LIBRARIES,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const onLoad = useCallback(
    (mapInstance) => {
      if (neighbourhoods?.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        const BUFFER_DISTANCE = 50000; // 50km in meters

        neighbourhoods.forEach((item) => {
          if (item.address?.coords) {
            const point = new window.google.maps.LatLng(
              item.address.coords.lat,
              item.address.coords.lng,
            );

            bounds.extend(point);

            [0, 90, 180, 270].forEach((heading) => {
              const paddedPoint =
                window.google.maps.geometry.spherical.computeOffset(
                  point,
                  BUFFER_DISTANCE,
                  heading,
                );
              bounds.extend(paddedPoint);
            });
          }
        });
        mapInstance.fitBounds(bounds);
      }
    },
    [neighbourhoods],
  );

  if (!isLoaded)
    return <div className="propertyMap__loading">Loading Map...</div>;

  return (
    <div className="propertyMap__wrapper" id="newmap">
      <GoogleMap
        mapContainerClassName="propertyMap__container"
        onLoad={onLoad}
        onClick={() => setActiveMarker(null)}
        options={{
          styles: googleMapStyles,
          clickableIcons: false,
          mapTypeControl: false,

          /**
           * gestureHandling: "cooperative"
           * Prevents the map from capturing the scroll wheel unless the user
           * holds Ctrl/Cmd. This stops the "scroll trap" behavior.
           */
          gestureHandling: "cooperative",

          // Interactive controls on the left as requested
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_TOP,
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_TOP,
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_TOP,
          },
        }}
      >
        <MarkerClustererF
          options={{
            styles: [
              {
                url: "/mapMarkerLepine.svg",
                height: 60,
                width: 60,
                textColor: "#ffffff",
                textSize: 16,
              },
            ],
          }}
        >
          {(clusterer) =>
            neighbourhoods?.map((item, i) => {
              const {
                name,
                address: { coords },
                city,
                theme,
                href,
                image,
                svg,
              } = item;

              if (!coords?.lat || !coords?.lng) return null;

              const markerId = `${theme}-${i}`;

              return (
                <React.Fragment key={markerId}>
                  <MarkerF
                    position={{ lat: coords.lat, lng: coords.lng }}
                    clusterer={clusterer}
                    onMouseOver={() => setActiveMarker(markerId)}
                    icon={{
                      url: "/mapMarkerLepine.svg",
                      scaledSize: new window.google.maps.Size(50, 50),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(25, 25),
                    }}
                  />
                  {activeMarker === markerId && (
                    <InfoWindowF
                      position={{ lat: coords.lat, lng: coords.lng }}
                      onCloseClick={() => setActiveMarker(null)}
                      options={{
                        pixelOffset: new window.google.maps.Size(0, -30),
                      }}
                    >
                      <MapCard
                        name={name}
                        city={city}
                        image={image}
                        href={href}
                        theme={theme}
                        svg={svg}
                        i={i}
                      />
                    </InfoWindowF>
                  )}
                </React.Fragment>
              );
            })
          }
        </MarkerClustererF>
      </GoogleMap>
    </div>
  );
};

export default PropertyMap;
