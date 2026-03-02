import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { ImageLoader } from '../../../utils/imageLoader';
import { renderRichText } from '../../../utils/renderRichText';

const KeyFeaturesSwiper = ({ items }) => {
  const KeyFeaturesSlide = ({ content }) => {
    const { header, copy, url, type } = content;

    return (
      <div className="keyFeaturesSlide">
        <div className="keyFeaturesSlide__content">
          <h3>{header}</h3>
          <div dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />
        </div>


        {type === 'video' ? <div className="keyFeaturesSlide__video"><video src={url} autoPlay loop muted></video></div> : <div className="keyFeaturesSlide__image">{ImageLoader(url, '', '', 2560, 1000, 10)}</div>}
      </div>
    )
  }

  return (
    <>
        <section className="keyFeaturesSwiper">
            <Swiper
                centeredSlides={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                }}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                effect={"fade"}
                navigation
                modules={[Autoplay, Pagination, EffectFade, Navigation]}
                // breakpoints={{
                //   1280: {
                //     navigation: true,
                //   },
                // }}
            >
                {items.map((item, i) => <SwiperSlide key={i}><KeyFeaturesSlide content={item} /></SwiperSlide>)}
            </Swiper>

        </section>
    </>
  );
}

export default KeyFeaturesSwiper;