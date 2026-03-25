import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  MarkerClustererF,
} from "@react-google-maps/api";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { googleMapsApiKey } from "../utils/googleMapsApiKey";
import { ImageLoader } from "../utils/imageLoader";
import { submitGAEvent } from "../utils/submitGAEvent";

const LIBRARIES = ["geometry"];

/**
 * MapCard Component
 * Uses the exact NeighbourhoodCard structure.
 * Sidebar version (isLink=false) only triggers map centering.
 * InfoWindow version (isLink=true) links to the property page.
 */
const MapCard = ({ item, isActive, onClick, isLink = false }) => {
  const { name, city, image, href, theme, svg } = item;

  const content = (
    <div
      className={`neighbourhoodCard mapCard ${isActive ? "mapCard--active" : ""}`}
      data-theme={theme}
      onClick={() => {
        if (onClick) onClick();
        submitGAEvent(
          isLink ? "map_infowindow_clicked" : "sidebar_card_clicked",
        );
      }}
    >
      <div className="neighbourhoodCard__image themeBGDark">
        {image &&
          ImageLoader(
            image,
            "neighbourhoodCard__propertyImage",
            name,
            400,
            400,
            0.1,
          )}
        <div className="neighbourhoodCard__logo">
          {svg ? (
            ImageLoader(svg, "neighbourhoodCard__logoImg", "", 225, 225, 0.1)
          ) : (
            <p>
              Coming
              <br />
              Soon
            </p>
          )}
        </div>
      </div>
      <div className="neighbourhoodCard__content">
        <p className="neighbourhoodCard__name">{name}</p>
        {city && <p className="neighbourhoodCard__city">{city}</p>}
      </div>
    </div>
  );

  return isLink ? <Link href={href}>{content}</Link> : content;
};

const PropertyMap = ({ neighbourhoods }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: LIBRARIES,
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLoad = useCallback(
    (mapInstance) => {
      mapRef.current = mapInstance;
      if (neighbourhoods?.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        neighbourhoods.forEach((item) => {
          if (item.address?.coords) {
            bounds.extend(
              new window.google.maps.LatLng(
                item.address.coords.lat,
                item.address.coords.lng,
              ),
            );
          }
        });
        mapInstance.fitBounds(bounds);
      }
    },
    [neighbourhoods],
  );

  const handleSelectBuilding = (item, id) => {
    setActiveMarker(id);
    if (mapRef.current && item.address?.coords) {
      mapRef.current.panTo({
        lat: item.address.coords.lat,
        lng: item.address.coords.lng,
      });
      mapRef.current.setZoom(15);
    }
  };

  if (!isLoaded)
    return <div className="propertyMap__loading">Loading Map...</div>;

  return (
    <div className="propertyMap__pageLayout">
      {!isMobile && (
        <aside className="propertyMap__sidebar">
          <div className="propertyMap__sidebarHeader">
            <h2>Our Communities</h2>
          </div>
          <div className="propertyMap__sidebarList">
            {neighbourhoods?.map((item, i) => {
              const markerId = `${item.theme}-${i}`;
              return (
                <div key={markerId} className="propertyMap__sidebarItem">
                  <MapCard
                    item={item}
                    isActive={activeMarker === markerId}
                    onClick={() => handleSelectBuilding(item, markerId)}
                    isLink={false}
                  />
                </div>
              );
            })}
          </div>
        </aside>
      )}

      <main className="propertyMap__mapContainer">
        <GoogleMap
          mapContainerClassName="propertyMap__canvas"
          onLoad={onLoad}
          onClick={() => setActiveMarker(null)}
          options={{
            clickableIcons: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_TOP,
            },
            gestureHandling: "cooperative",
            zoomControl: true,
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_TOP,
            },
            streetViewControl: true,
            streetViewControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_TOP,
            },
            fullscreenControl: false,
          }}
        >
          <MarkerClustererF>
            {(clusterer) =>
              neighbourhoods?.map((item, i) => {
                const {
                  address: { coords },
                  theme,
                } = item;
                if (!coords?.lat || !coords?.lng) return null;
                const markerId = `${theme}-${i}`;
                return (
                  <React.Fragment key={markerId}>
                    <MarkerF
                      position={{ lat: coords.lat, lng: coords.lng }}
                      clusterer={clusterer}
                      onClick={() => handleSelectBuilding(item, markerId)}
                      icon={{
                        url: "/mapMarkerLepine.svg",
                        scaledSize: new window.google.maps.Size(50, 50),
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
                        <div className="propertyMap__infoWindow">
                          <MapCard item={item} isLink={true} />
                        </div>
                      </InfoWindowF>
                    )}
                  </React.Fragment>
                );
              })
            }
          </MarkerClustererF>
        </GoogleMap>
      </main>

      {isMobile && (
        <div className="propertyMap__mobileSwiper">
          <Swiper
            spaceBetween={15}
            slidesPerView={"auto"}
            centeredSlides={true}
            onSlideChange={(swiper) => {
              const item = neighbourhoods[swiper.activeIndex];
              handleSelectBuilding(item, `${item.theme}-${swiper.activeIndex}`);
            }}
          >
            {neighbourhoods?.map((item, i) => (
              <SwiperSlide key={`mobile-${i}`} style={{ width: "280px" }}>
                <MapCard item={item} isLink={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
