import { useState, useEffect } from "react";
import Map from "../../../components/Map.component";
import MapMarker from "../../../components/MapMarker.component";
import PropertyMapBtnV3 from "./PropertyMapBtn.component";
import mapCategories from "../../../utils/mapCategories";

import {  Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import PropertyMapCardV3 from "./PropertyMapCard.component";
import ContentWrapper from "../../../sections/ContentWrapper.component";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const PropertyMapV3 = ({ logo, pageId, city, zoom, coords, items, copy }) => {
    const defaultCategory = 'restaurants';
    const [currentCategory, setCurrentCategory] = useState(defaultCategory);
    const [currentMapItems, setCurrentMapItems] = useState([]);
    const [activeMarkerIndex, setActiveMarkerIndex] = useState(0);
    const [centerCoords, setCenterCoords] = useState(coords);

    const renderMap = (id) => {
        if (items.length > 0) {
            let currentItems =  items.filter((category) => category.category === currentCategory)[0].mapItems.sort((a, b) => a.walkTime < b.walkTime);
            setCurrentCategory(id);
            setCurrentMapItems(currentItems);
            setActiveMarkerIndex(null);    
        } else {
            setCurrentMapItems([]);
        }
        
    }

    useEffect(() => {
        renderMap(currentCategory);
    }, [currentCategory]);

    useEffect(() => {
        setCurrentCategory(defaultCategory);
        renderMap(currentCategory);
    }, [pageId]);

    const propertyMapId = pageId === '40mcgill' ? 'thecristina' : pageId;

    return (
        <section id="propertyMap" className="propertyMapV3">
            <div className="propertyMapV3__legend themeBGDark" data-aos="fade">
                <ContentWrapper cssClass="propertyMapV3__header" size="xl">
                    <h2>Live In {city}</h2>
                    {copy && <p>{copy}</p>}
                </ContentWrapper>

                <div className="propertyMapV3__categories" size="xl">
                    {mapCategories.map((cat, i) => {
                        const { id, label } = cat;
                        const isActive = id === currentCategory;

                        return items[i].mapItems && <PropertyMapBtnV3 key={i} id={id} label={label} isActive={isActive} cb={renderMap} />

                    })}
                </div>
            </div>

            <div className="propertyMapV3__wrapper">
                <div className="propertyMapV3__navigation">
                    <div className="propertyMapV3__navigation--wrapper">
                        <div className="propertyMapV3__navigation--bg themeBGDark"></div>

                        {items.map((category, i) => {
                            const classes = ['propertyMapV3__category--wrapper'];
                            category.category === currentCategory && classes.push('active');
                            const { mapItems } = category;

                            return (<div key={i} className={classes.join(' ')}>
                                    <div className="propertyMapV3__category">
                                        {mapItems && mapItems.map((item, i) => {
                                            return (<div key={i} className="propertyMapV3__item themeBGDark" onClick={() => { setActiveMarkerIndex(i); setCenterCoords({ lat: parseFloat(item.lat), lng: parseFloat(item.lng) }); submitGAEvent('property_map_item_clicked') }} data-active={activeMarkerIndex === i}>
                                                <div className="propertyMapV3__item--icon themeBGLight"><h3>{i + 1}</h3></div>
                                                <h3>{item.title}</h3>
                                            </div>)
                                        })}
                                    </div>
                            </div>)
                        })}
                    </div>
                </div>

                <Map zoom={zoom} coords={centerCoords}>
                    <MapMarker
                        coords={coords}
                        type="propertyLogo"
                        logo={logo}
                    />
                    {currentMapItems.length > 0 && currentMapItems.map((item, i) => {
                        const { title } = item;
                        // const imageUrl = baseUrl(item.image.data.attributes.url);
                        const imageUrl = `https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/${propertyMapId}/map/${item.url}`;
                        const coords = { lat: parseFloat(item.lat), lng: parseFloat(item.lng) };
                        const etas = { driveTime: item.driveTime, walkTime: item.walkTime, bikeTime: item.bikeTime };
                        
                        return (
                            <MapMarker
                                pageId={propertyMapId}
                                title={title}
                                key={i}
                                coords={coords}
                                type="amenity"
                                city={city}
                                image={imageUrl}
                                etas={etas}
                                index={i}
                                isActive={i === activeMarkerIndex}
                                setActive={setActiveMarkerIndex}
                                setCenterCoords={setCenterCoords}
                            />)
                    })}
                </Map>
            </div>

            <div className="propertyMapV3__swiper themeSwiper">
            <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true
                    }}
                    spaceBetween={25}
                    slidesPerView="auto"
                    className="paginationMargin"
                >
                       {currentMapItems.length > 0 && currentMapItems.map((item, i) => {
                            const { title } = item;
                            // const image = baseUrl(item.image.data.attributes.url);
                            const imageUrl = `https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/${propertyMapId}/map/${item.url}`;
                            const coords = { lat: item.lat, lng: item.lng };
                            const etas = { driveTime: item.driveTime, walkTime: item.walkTime, bikeTime: item.bikeTime };

                            return (
                                <SwiperSlide key={i}>
                                    <PropertyMapCardV3 type="mobile" title={title} image={imageUrl} coords={coords} etas={etas} city={city} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
             
            </div>
        </section>
    )
}

export default PropertyMapV3;