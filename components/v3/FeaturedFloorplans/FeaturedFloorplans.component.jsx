import ContentWrapper from "../../../sections/ContentWrapper.component";
import { ImageLoader } from "../../../utils/imageLoader";

import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeaturedFloorplans = ({ items, setContactPopupIsActive }) => {
  const FeatureItem = ({ content, swiper }) => {
    const { type, name, unitType, sqft, description, image, pdf } = content;

    if (swiper) {
      return (
        <a
          href={pdf}
          target="_blank"
          rel="noreferrer"
          className="featuredFloorplans__item"
          data-type="sub"
        >
          <div className="featuredFloorplans__item--col" data-col="image">
            {ImageLoader(image, "", "", 300, 300, 0.1)}
          </div>

          <div className="featuredFloorplans__item--col" data-col="copy">
            <h3>{name}</h3>
            <p className="featuredFloorplans__item--unitType">{unitType}</p>
            <p>{sqft} sqft</p>
          </div>
        </a>
      );
    } else {
      if (type === "main") {
        return (
          <a
            href={pdf}
            target="_blank"
            rel="noreferrer"
            className="featuredFloorplans__item"
            data-type={type}
          >
            <div className="featuredFloorplans__item--row" data-row="image">
              {ImageLoader(image, "", "", 300, 300, 0.1)}
            </div>

            <div className="featuredFloorplans__item--row" data-row="copy">
              <h3>{name}</h3>
              <p className="featuredFloorplans__item--unitType">{unitType}</p>
              <p>{sqft} sqft</p>
              <p className="featuredFloorplans__item--description">
                {description}
              </p>
            </div>
          </a>
        );
      } else {
        return (
          <a
            href={pdf}
            target="_blank"
            rel="noreferrer"
            className="featuredFloorplans__item"
            data-type={type}
          >
            <div className="featuredFloorplans__item--col" data-col="image">
              {ImageLoader(image, "", "", 300, 300, 0.1)}
            </div>

            <div className="featuredFloorplans__item--col" data-col="copy">
              <h3>{name}</h3>
              <p className="featuredFloorplans__item--unitType">{unitType}</p>
              <p>{sqft} sqft</p>
            </div>
          </a>
        );
      }
    }
  };

  return (
    <section className="featuredFloorplans sp" id="featuredFloorplans">
      <ContentWrapper>
        <h2 className="featuredFloorplans__title themeHeader">
          Find Your New Home
        </h2>
      </ContentWrapper>

      <div
        data-wrapper="xl"
        className="contentWrapper featuredFloorplans__content"
        data-screen="desktop"
      >
        {items.map((content, i) => {
          return <FeatureItem key={i} content={content} />;
        })}
      </div>

      <div className="featuredFloorplans__content" data-screen="mobile">
        <Swiper
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          slidesPerView="auto"
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="paginationMargin"
          modules={[Pagination, Navigation]}
        >
          {items.map((content, i) => {
            return (
              <SwiperSlide key={i}>
                <FeatureItem swiper={true} content={content} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="featuredFloorplans__cta">
        <h3 className="themeHeader">
          For an exclusive preview of floorplans tailored to your lifestyle
        </h3>
        <div
          className="btn themeBtn"
          onClick={() => setContactPopupIsActive(true)}
        >
          Contact Us
        </div>
      </div>
    </section>
  );
};

export default FeaturedFloorplans;
