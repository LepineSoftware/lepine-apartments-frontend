import ContentWrapper from "../../../sections/ContentWrapper.component";
import SwiperControls from '../../../components/SwiperControls.component';
import MediaCard from "../MediaCard/MediaCard.component";

import {  Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ModelSuitesV3 = ({ items }) => {
    return (
        <section id="suites" className="modelSuites sp" data-items={items.length}>
            <ContentWrapper cssClass="modelSuites__cards" size="xl">
                {items.map((item, i) => {
                    return (<MediaCard type="modelSuites" key={i} media={item} />)
                })}
            </ContentWrapper>

            <ContentWrapper cssClass="modelSuites__swiper--controls">
                <SwiperControls swiperName="suites" orientation="horizontal" />
            </ContentWrapper>

            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                    prevEl: '.suitesPrev',
                    nextEl: '.suitesNext',
                }}
                pagination={{
                    clickable: true
                }}
                className="modelSuites__swiper paginationMargin"
                spaceBetween={25}
                slidesPerView="auto"
                loop={true}
                centeredSlides={true}
            >
                {items.map((item, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <MediaCard type="modelSuites" media={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}

export default ModelSuitesV3;