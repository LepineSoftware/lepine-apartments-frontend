import React, { useState, useCallback, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import Link from "next/link";

// Project Utilities
import { googleMapsApiKey } from "../utils/googleMapsApiKey";
import googleMapStyles from "../utils/googleMapStyles";
import { ImageLoader } from "../utils/imageLoader";
import { submitGAEvent } from "../utils/submitGAEvent";

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
  });

  const onLoad = useCallback(
    (mapInstance) => {
      if (neighbourhoods?.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        neighbourhoods.forEach((item) => {
          if (item.address?.coords) {
            bounds.extend({
              lat: item.address.coords.lat,
              lng: item.address.coords.lng,
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
    <div className="propertyMap__wrapper">
      <GoogleMap
        mapContainerClassName="propertyMap__container"
        onLoad={onLoad}
        options={{
          styles: googleMapStyles,
          clickableIcons: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {neighbourhoods?.map((item, i) => {
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

          return (
            <React.Fragment key={`${theme}-${i}`}>
              <MarkerF
                position={{ lat: coords.lat, lng: coords.lng }}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "#1a1a1a",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "#ffffff",
                  scale: 8,
                }}
              />
              <InfoWindowF
                position={{ lat: coords.lat, lng: coords.lng }}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -15),
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
            </React.Fragment>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default PropertyMap;
