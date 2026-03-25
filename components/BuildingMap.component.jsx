import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

// Project Utilities
import { googleMapsApiKey } from "../utils/googleMapsApiKey";
import googleMapStyles from "../utils/googleMapStyles";
import { ImageLoader } from "../utils/imageLoader";

/**
 * MapCard Sub-component
 * Renders a property card with the specific 300x250 dimensions requested.
 */
const MapCard = ({ name, city, image, href, theme, svg, i }) => {
  return (
    <Link href={href}>
      <a
        className="neighbourhoodCard mapCard aos-init aos-animate"
        data-theme={theme}
        data-aos="fade"
        data-aos-delay={i * 50}
      >
        <div className="neighbourhoodCard__image themeBGDark">
          {/* Priority rendering: Property Image followed by Logo SVG */}
          {image &&
            ImageLoader(
              image,
              "neighbourhoodCard__propertyImage",
              "",
              300,
              300,
              0.1,
            )}
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
      </a>
    </Link>
  );
};

const PropertyMap = ({ neighbourhoods }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [activeMarker, setActiveMarker] = useState(null);

  // Initial load: center map and fit all markers into view
  const onLoad = useCallback(
    (mapInstance) => {
      setMap(mapInstance);
      if (neighbourhoods?.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        neighbourhoods.forEach((item) => {
          const {
            address: { coords },
          } = item;
          if (coords?.lat && coords?.lng) {
            bounds.extend({ lat: coords.lat, lng: coords.lng });
          }
        });
        mapInstance.fitBounds(bounds);
      }
    },
    [neighbourhoods],
  );

  const onZoomChanged = useCallback(() => {
    if (map) setZoom(map.getZoom());
  }, [map]);

  // Scaling logic for markers (Max 200px)
  const iconSize = useMemo(() => {
    const calculated = zoom * 10;
    return Math.min(200, calculated);
  }, [zoom]);

  if (!isLoaded) return <div className="propertyMap__loading">Loading...</div>;

  return (
    <div className="propertyMap__wrapper">
      <GoogleMap
        mapContainerClassName="propertyMap__container"
        zoom={zoom}
        onLoad={onLoad}
        onZoomChanged={onZoomChanged}
        options={{
          styles: googleMapStyles,
          clickableIcons: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {neighbourhoods?.map((item, i) => {
          // Destructuring as requested
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
            <MarkerF
              key={`${theme}-${i}`}
              position={{ lat: coords.lat, lng: coords.lng }}
              onClick={() => {
                setActiveMarker(item);
                map.panTo({ lat: coords.lat, lng: coords.lng });
              }}
              icon={{
                url: svg || image,
                scaledSize: new window.google.maps.Size(iconSize, iconSize),
                anchor: new window.google.maps.Point(
                  iconSize / 2,
                  iconSize / 2,
                ),
              }}
            >
              {activeMarker === item && (
                <InfoWindowF
                  position={{ lat: coords.lat, lng: coords.lng }}
                  onCloseClick={() => setActiveMarker(null)}
                  options={{
                    pixelOffset: new window.google.maps.Size(
                      0,
                      -(iconSize / 2),
                    ),
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
            </MarkerF>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default PropertyMap;
