import ContentWrapper from '../../../sections/ContentWrapper.component';

// import { useState, useEffect } from 'react';

import {  Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MediaCard from "../../../components/v3/MediaCard/MediaCard.component";

const NewsroomSection = ({ posts }) => {
    return (
        <section className='newsroomSection__container sp'>
            <ContentWrapper cssClass="newsroomSection__grid">
                {posts.map((post, i) => <MediaCard key={i} media={post} type="newsroom" />)}
            </ContentWrapper>

            <div className="newsroomSection__swiper">
                    <Swiper
                        slidesPerView="auto"
                        pagination={{ clickable: true }}
                        modules={[Pagination, Navigation]}
                        className="paginationMargin"
                        centeredSlides
                        loop={true}
                        navigation={{
                            prevEl: '.newsroomV3Prev',
                            nextEl: '.newsroomV3Next'
                        }}
                    >
                        {posts.map((post, i) => <SwiperSlide key={i}><MediaCard media={post} type="newsroom" /></SwiperSlide>)}
                    </Swiper>
            </div>
        </section>
    )
}

export default NewsroomSection;