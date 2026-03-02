import {  Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { ImageLoader } from '../../../utils/imageLoader';

const CommercialSwiper = () => {
    const images = [
        'https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/12461-1050%20CS-Commerces%20Great%20Lakes.jpg',
        'https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/12461-1050%20CS-Entr%C3%A9e%20principale%20vue%20de%20nuit.jpg',
        'https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/12461-1050%20CS-Restaurant%20Candaian%20Shield-Great%20Lakes.jpg',
        'https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/12461-1050%20CS-Commerces%20Cnadian%20Shield.jpg'
    ]
    return (
        <div className="commercial__swiper--wrapper">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                navigation
                pagination={{
                    clickable: true
                }}
                slidesPerView={1}
                loop={true}
                effect="fade"
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: true
                }}
                className="commercial__swiper"
            >
                {images.map((img, i) => <SwiperSlide key={i}>{ImageLoader(img, '', '', 1000, 1000, 0.1)}</SwiperSlide>)}
            </Swiper>

            <div className="commercial__swiper--copy" data-aos="fade">
                <h1>1050 Canadian Shield</h1>
                <h3>Kanata, ON</h3>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            </div>
        </div>
    )
}

export default CommercialSwiper;