import { MarkerF, InfoWindowF, Marker  } from "@react-google-maps/api";
import Link from "next/link";
import { Fragment } from "react";
import { ImageLoader } from "../utils/imageLoader";
import PropertyMapCard from "./PropertyMapCard.component";

const MapMarker = ({ type, coords, image, etas, title, isActive, setActive, index, city, pageId, logo, setCenterCoords }) => { 
    if (type === 'community') {
        const iconUrl = 'https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/global/mapMarkerTransparent.png'

        return (
            <Fragment>
                <MarkerF icon={iconUrl} position={coords} cursor="pointer" />
                <InfoWindowF position={coords} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                    <div className="currentCommunities__marker" data-theme={pageId}>
                        <div className="currentCommunities__marker--image">
                            {ImageLoader(image, '', '', 350, 275, 10)}
                        </div>

                        <div className="currentCommunities__marker--link themeBGLightHover">
                            <Link href={`/property/${pageId}`}>
                                <p>Visit Website</p>
                            </Link>
                        </div>
                    </div>
                </InfoWindowF>
            </Fragment>
        )
    }

    if (type === 'amenity') {
        const label = {
            text: `${index + 1}`,
            color: '#fff',
        }

        const iconUrl = `https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/${pageId}/map/mapMarker.png`;

        return (
            <Fragment>
                <Marker label={label} icon={iconUrl} position={coords} cursor="pointer" onClick={() => { setActive(index), setCenterCoords && setCenterCoords(coords) }} />
                {isActive && <InfoWindowF position={coords} options={{ pixelOffset: new window.google.maps.Size(0, -40) }}>
                    <PropertyMapCard type="desktop" title={title} image={image} etas={etas} city={city} />
                </InfoWindowF>}
            </Fragment>
        )
    }

    if (type === 'propertyLogo') {
        return (
            <Fragment>
                <Marker icon={logo} position={{ lat: coords.lat, lng: coords.lng }}  />
            </Fragment>
        )
    }
}

export default MapMarker;