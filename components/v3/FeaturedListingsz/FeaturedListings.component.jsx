import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import ContentWrapper from "../../../sections/ContentWrapper.component";
import FeaturedListingsCard from "./FeaturedListingsCard.component";
import { ImageLoader } from "../../../utils/imageLoader";
import { useEffect, useState } from "react";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const FeaturedListings = ({
  type,
  personas,
  content,
  city,
  property,
  popupImage,
  pageId,
  listings,
  siblingProperties,
  bgImage,
  setContactPopupIsActive,
  startingPrice,
}) => {
  const {
    registrationPortalId,
    registrationFormId,
    goalName,
    priceRange,
    disableListingsPricing,
    leasingPhoneNumber,
  } = content;

  const styles = {
    backgroundImage: `url('${bgImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const PersonasContainer = ({ images }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      setInterval(() => {
        setCount((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }, []);

    return (
      <div className="featuredListingsV3__media">
        {images.map((img, i) => (
          <div
            key={i}
            className="featuredListingsV3__media--image"
            data-active={i === count ? "true" : "false"}
          >
            {ImageLoader(img, "", "", 500, 500, 0.5)}
          </div>
        ))}
        {siblingProperties.length > 0 && (
          <SiblingPropertyLink
            sibling={siblingProperties[0]}
            screen="desktop"
          />
        )}
      </div>
    );
  };

  const SiblingPropertyLink = ({ sibling, screen }) => {
    const { name, pageId, image } = sibling;

    return (
      <Link
        href={`/property/${pageId}/#listings`}
        data-screen={screen}
        className="featuredListingsV3__link"
        onClick={() => submitGAEvent("sibling_property_visited")}
      >
        <div className="featuredListingsV3__link--image">
          {image && ImageLoader(image, "", "", 500, 500, 0.1)}
        </div>

        <div className="featuredListingsV3__link--content">
          <div className="featuredListingsV3__link--copy">
            <h4 className="featuredListingsV3__link--header">
              Can&apos;t find what you&apos;re looking for?
            </h4>
            <p>Visit our sister property next door&#44; {name}</p>
          </div>

          <div className="featuredListingsV3__link--footer">Visit {name}</div>
        </div>
      </Link>
    );
  };

  const commercialCopy = `Choose from spaces ranging from 200 to 1,300+ sq. ft. and combine layouts to create the perfect, customized space for your business. Tailor your ideal workspace in the heart of Kanata's Town Centre and stand out in this vibrant community.`;

  const featuredListingsContent = () => (
    <>
      <section id="listings" className="featuredListingsV3 themeBGDark">
        <div className="featuredListingsV3__bg" style={styles}></div>

        <div className="featuredListingsV3__desktop">
          <ContentWrapper cssClass="featuredListingsV3__container" size="xl">
            {type === "commercial" ? (
              <h2 className="featuredListingsV3__header">
                Flexible Floorplans to Fit Your Business
              </h2>
            ) : (
              <h2 className="featuredListingsV3__header">
                Featured Apartments
              </h2>
            )}
            {startingPrice && (
              <h3 style={{ color: "#fff" }}>
                Prices starting at ${startingPrice}
              </h3>
            )}

            <div className="featuredListingsV3__cards">
              <ContentWrapper size="xl">
                {listings.map(
                  (listing, i) =>
                    i <= 3 && (
                      <FeaturedListingsCard
                        type={type}
                        title={listing.title}
                        cardIndex={i}
                        key={Math.random()}
                        city={city}
                        property={property}
                        content={listing}
                        popupImage={popupImage}
                        pageId={pageId}
                        registrationPortalId={registrationPortalId}
                        registrationFormId={registrationFormId}
                        goalName={goalName}
                        disableListingsPricing={disableListingsPricing}
                        leasingPhoneNumber={leasingPhoneNumber}
                      />
                    ),
                )}
              </ContentWrapper>
            </div>

            <div
              className="featuredFloorplans__cta"
              style={{ marginTop: "25px" }}
            >
              <h3 style={{ color: "#fff" }}>
                For an exclusive look at floorplans tailored to your lifestyle
              </h3>
              <div
                className="btn themeBtn"
                onClick={() => setContactPopupIsActive(true)}
              >
                Contact Us
              </div>
            </div>

            {personas && personas.images.length > 0 && (
              <PersonasContainer images={personas.images} />
            )}

            {/* {contactCopy && <h3 className="featuredListingsV3__contact">{contactCopy}</h3>}
                {contactCopy && <Link className="btn themeBtn" href="#contact">Contact Us</Link>} */}
          </ContentWrapper>
        </div>

        <div className="featuredListingsV3__mobile themeSwiper" data-aos="fade">
          <div className="featuredListingsV3__mobile--menu">
            <div className="featuredListingsV3__mobile--menu-wrapper">
              {type === "commercial" ? (
                <h2>Flexible Floorplans to Fit Your Business</h2>
              ) : (
                <h2>Featured Apartments</h2>
              )}
            </div>
            {type === "commercial" && priceRange ? (
              <h3 className="featuredListingsV3__subtitle">{commercialCopy}</h3>
            ) : (
              <h3 className="featuredListingsV3__subtitle">{priceRange}</h3>
            )}
          </div>

          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            spaceBetween={25}
            slidesPerView="auto"
            className="paginationMargin"
          >
            {listings.map(
              (listing, i) =>
                i <= 3 && (
                  <SwiperSlide key={i}>
                    <FeaturedListingsCard
                      type={type}
                      title={listing.title}
                      cardIndex={i}
                      city={city}
                      property={property}
                      content={listing}
                      popupImage={popupImage}
                      pageId={pageId}
                      registrationPortalId={registrationPortalId}
                      registrationFormId={registrationFormId}
                      disableListingsPricing={disableListingsPricing}
                    />
                  </SwiperSlide>
                ),
            )}
          </Swiper>

          <div
            className="featuredFloorplans__cta"
            style={{ marginTop: "25px", zIndex: "10" }}
          >
            <h3 style={{ color: "#fff" }}>
              For an exclusive look at floorplans tailored to your lifestyle
            </h3>
            <div
              className="btn themeBtn"
              onClick={() => setContactPopupIsActive(true)}
            >
              Contact Us
            </div>
          </div>
        </div>

        {siblingProperties.length > 0 && (
          <div className="featuredListingsV3__link--mobileContainer">
            <SiblingPropertyLink
              sibling={siblingProperties[0]}
              screen="mobile"
            />
          </div>
        )}
      </section>
    </>
  );

  if (listings.length > 0) {
    return featuredListingsContent();
  }
};

export default FeaturedListings;
