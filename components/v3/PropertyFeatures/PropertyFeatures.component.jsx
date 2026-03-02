import Image from "next/image";
import { baseUrl } from "../../../utils/baseUrl";
import ContentWrapper from "../../../sections/ContentWrapper.component";

import {  Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import HeroArrow from '../../../assets/svg/heroArrow.svg';
import MediaCard from "../MediaCard/MediaCard.component";
import { renderRichText } from "../../../utils/renderRichText";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const PropertyFeaturesV3 = ({ features, copy, amenities, type }) => {
    let pdf = features?.pdf?.data ? baseUrl(features.pdf.data.attributes.url) : null;
    pdf && !pdf.includes('http') ? pdf = `https://${pdf}` : null;

    return (
        <section id="propertyFeatures" className="propertyFeaturesV3 sp">
            <Image className="propertyFeaturesV3__arrow" src={HeroArrow} alt="" height={1000} width={1000} />

            <ContentWrapper size="xl">
                <div className="propertyFeaturesV2__content">
                    <div className="propertyFeaturesV2__header">
                        {type !== "commercial" ? <h2 className="themeHeader">Property<br/>Features</h2> : <h2 className="themeHeader">Key<br/>Features</h2>}
                    </div>

                    <div className="propertyFeaturesV2__copy">
                    {copy && <div className="rt" dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />}
                    {pdf && <a href={pdf} target="_blank" rel="noreferrer" className="btn themeBtn" onClick={() => submitGAEvent('download_property_amenity_map')}>View Property Amenity Map</a>}
                    </div>
                </div>

                <div className="propertyFeaturesV3__container" data-aos="fade">
                    <div className="propertyFeaturesV3__cards">
                        {amenities.map((amenity, i) => (<MediaCard key={i} media={amenity} type="propertyFeature" />))}
                    </div>
                </div>
            </ContentWrapper>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={25}
                slidesPerView="auto"
                centeredSlides={true}
                loop={true}
                className="propertyFeaturesV3__swiper paginationMargin"
            >
                {amenities.map((amenity, i) => (<SwiperSlide key={i}><MediaCard key={i} media={amenity} type="propertyFeature" /></SwiperSlide>))}
            </Swiper>
        </section>
    )
}

export default PropertyFeaturesV3;