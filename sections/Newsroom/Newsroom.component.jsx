import {  Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ContentWrapper from "../ContentWrapper.component";
import Link from 'next/link';
import SwiperControls from '../../components/SwiperControls.component';
import MediaCard from '../../components/v3/MediaCard/MediaCard.component';

const Newsroom = ({ header, copy, posts }) => {
    return (
        <section id="newsroom" className="newsroomV3 sp" data-aos="fade">
                <ContentWrapper cssClass="newsroomV3__content" size="xl">
                    <div className="newsroomV3__header">
                        {header && <h2 className="themeHeader">{header}</h2>}
                        {copy && <p className="themeHeader">{copy}</p>}
                    </div>
                </ContentWrapper>

                <ContentWrapper>
                <div className="newsroomV3__swiper">
                    <Swiper
                        slidesPerView="auto"
                        pagination={{ clickable: true }}
                        modules={[Pagination, Navigation]}
                        className="paginationMargin"
                        navigation={{
                            prevEl: '.newsroomV3Prev',
                            nextEl: '.newsroomV3Next'
                        }}
                    >
                        {posts.map((post, i) => <SwiperSlide key={i}><MediaCard media={post} type="newsroom" /></SwiperSlide>)}
                   </Swiper>
                </div>
                </ContentWrapper>


                <ContentWrapper cssClass="newsroomV3__link">
                    <Link href="/newsroom">
                        <div className="btn themeBtn">View Lépine Newsroom</div>
                    </Link>
                </ContentWrapper>
        </section>
    )
}

export default Newsroom;