import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import {  Navigation, Pagination } from 'swiper';
import PlayButtonIcon from '../../../assets/svg/playIcon.svg';

import { submitGAEvent } from "../../../utils/submitGAEvent";

import FacebookLogo from '../../../assets/svg/facebook.svg';
import InstagramLogo from '../../../assets/svg/instagram.svg';
import YouTubeLogo from '../../../assets/svg/youtube.svg';
import LinkedInLogo from '../../../assets/svg/linkedin.svg';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MediaCard from "../MediaCard/MediaCard.component";
import TranslucentButton from "../../v2/TranslucentButton/TranslucentButton.component";

const InstagramFeed = ({ posts }) => {
    const minimumPosts = posts.length > 5;
    return (
        <section className="instagramFeed sp">
            <h2 className="instagramFeed themeHeader">Explore Lépine</h2>

            <Swiper
                slidesPerView="auto"
                centeredSlides={true}
                spaceBetween={25}
                loop={minimumPosts}
                pagination={minimumPosts && { clickable: true }}
                modules={[Pagination, Navigation]}
                className="instagramFeed__container paginationMargin"
                navigation={{
                    prevEl: '.instagramFeedPrev',
                    nextEl: '.instagramFeedNext'
                }}
            >
            {posts.map((post, i) => {
                return (
                    <SwiperSlide key={i} className="mediaCard" data-type="instagram" onClick={() => submitGAEvent('instagram_post_clicked')}>
                        <MediaCard media={post} type="instagram" />
                    </SwiperSlide>
                )
                })}
            </Swiper>

            <div className="instagramFeed__links">
                <div className="instagramFeed__links--wrapper">
                    <h3 className="themeHeader">Connect with us on social media</h3>
                </div>

                <div className="instagramFeed__links--wrapper">
                    <div className="themeBGDark instagramFeed__links--btn"><TranslucentButton type="facebook" icon={FacebookLogo} label="Facebook" link="https://www.facebook.com/LepineApartmentsOttawa" external /></div>
                    <div className="themeBGDark instagramFeed__links--btn"><TranslucentButton type="instagram" icon={InstagramLogo} label="Instagram" link="https://www.instagram.com/lepineapartments" external /></div>
                    <div className="themeBGDark instagramFeed__links--btn"><TranslucentButton type="youtube" icon={YouTubeLogo} label="YouTube" link="https://www.youtube.com/@LepineApartments" external /></div>
                    <div className="themeBGDark instagramFeed__links--btn"><TranslucentButton type="linkedin" icon={LinkedInLogo} label="LinkedIn" link="https://ca.linkedin.com/company/l%C3%A9pine-corporation" external /></div>
                </div>
            </div>

        </section>
    )
}

export default InstagramFeed;