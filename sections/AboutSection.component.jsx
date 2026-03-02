import CaptionCardBlock from "../components/CaptionCardBlock.component";
import ImageCard from "../components/ImageCard.component";
import SwiperControls from "../components/SwiperControls.component";
import { baseUrl } from "../utils/baseUrl";
import ContentWrapper from "./ContentWrapper.component";
import { useState } from 'react';

import {  Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import InfoCard from "../components/InfoCard.component";
import { ImageLoader } from "../utils/imageLoader";


const AboutSection = ({ id, theme, content, padding }) => {
    const { header, copy, image } = content;
    const posts = content.posts ? content.posts : null;
    const imageUrl = image?.image ? baseUrl(image?.image?.data?.attributes?.url) : null;
    const subtitleIcon = image?.subtitleIcon.data ? baseUrl(image?.subtitleIcon?.data?.attributes?.url) : null;
    const subtitle = content.image?.subtitle ? content.image.subtitle : null;

    const desktopBG = content.desktopImage? baseUrl(content.desktopImage?.data?.attributes?.url) : null;

    return (
        <section id={id} className="aboutSection" section-theme={theme}>
            <div className="aboutSection__imageBlock sp">
                <div className="aboutSection__bg">
                    {desktopBG && <div className="aboutSection__bg--desktop">
                        {ImageLoader(desktopBG, '', '', 600, 600, 10)}
                    </div>}
                </div>

                <ContentWrapper cssClass="suites__container" size="md" padding={padding}>
                    <CaptionCardBlock
                        header={header}
                        image={imageUrl}
                        subtitle={subtitle}
                        subtitleIcon={subtitleIcon}
                        copy={copy}
                    />
                </ContentWrapper>

                {posts && <div className="aboutSection__posts">
                    <ContentWrapper cssClass="suites__cards" size="xl">
                        {posts.data.map((post, i) => {
                            const image = baseUrl(post.attributes.images.thumbnail.data.attributes.url);
                            const { title, preview, slug } = post.attributes;
                            return (<InfoCard key={Math.random()} type="news" title={title} preview={preview} image={image} slug={slug} />)
                        })}
                    </ContentWrapper>

                    <ContentWrapper cssClass="suites__swiper--controls">
                        <SwiperControls swiperName="suites" orientation="horizontal" />
                    </ContentWrapper>

                    <div className="suites__swiper themeSwiper">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                prevEl: '.suitesPrev',
                                nextEl: '.suitesNext',
                            }}
                            pagination={{
                                clickable: true
                            }}
                            className="paginationMargin"
                            spaceBetween={25}
                            slidesPerView="auto"
                        >
                            {posts.data.map((post, i) => {
                                const image = baseUrl(post.attributes.images.thumbnail.data.attributes.url);
                                const { title, preview, slug } = post.attributes;

                                return (
                                    <SwiperSlide key={Math.random()}>
                                        <InfoCard
                                            type="news"
                                            title={title}
                                            preview={preview}
                                            image={image}
                                            slug={slug}
                                            i={i}
                                        />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default AboutSection;