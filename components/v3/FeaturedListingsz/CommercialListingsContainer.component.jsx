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

const CommercialListingsContainer = ({
  type,
  personas,
  city,
  property,
  popupImage,
  pageId,
  listings,
  siblingProperties,
  bgImage,
}) => {
  const styles = {
    backgroundImage: `url('${bgImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const [activeUnit, setActiveUnit] = useState(0);

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

        <div className="commercialListings sp">
          <ContentWrapper cssClass="commercialListings__container" size="xl">
            <h2
              className="featuredListingsV3__header"
              style={{ color: "#fff" }}
            >
              Flexible Floorplans to Fit Your Business
            </h2>
            <h3 className="featuredListingsV3__subtitle">{commercialCopy}</h3>

            <div className="commercialListings__content">
              <div className="commercialListings__buttons">
                {listings.map((listing, i) => {
                  const classes = ["commercialListings__btn"];
                  activeUnit === i && classes.push("active");

                  return (
                    <div
                      className={classes.join(" ")}
                      key={i}
                      onClick={() => setActiveUnit(i)}
                      data-group={listing.leased ? "leased" : listing.group}
                    >
                      <h3>
                        {listing.title} - {listing.unit}
                      </h3>
                      {!listing.leased && <p>{listing.sqft} sqft</p>}
                      {!listing.leased && listing.dim1 && listing.dim2 && (
                        <p>
                          {listing.dim1}&apos; x {listing.dim2}&apos;
                        </p>
                      )}
                      {listing.leased && (
                        <p style={{ fontStyle: "italic" }}>Leased</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="commercialListings__floorplan">
                {listings.map((listing, i) => {
                  const classes = ["commercialListings__floorplan--item"];
                  activeUnit === i && classes.push("active");

                  return (
                    <div className={classes.join(" ")} key={i}>
                      <div className="commercialListings__floorplan--image">
                        {ImageLoader(listing.image, "", "", 300, 750, 0.1)}
                      </div>

                      <div className="commercialListings__floorplan--info">
                        <div className="commercialListings__floorplan--infoWrapper">
                          <h3>
                            {listing.title} - {listing.unit}
                          </h3>
                          <p>{listing.sqft} sqft</p>
                          {listing.dim1 ? (
                            listing.dim2 && (
                              <p>
                                {listing.dim1}&apos; x {listing.dim2}&apos;
                              </p>
                            )
                          ) : (
                            <p>&nbsp;</p>
                          )}
                        </div>

                        <div className="commercialListings__floorplan--infoWrapper">
                          {listing.pdf && (
                            <a
                              href={listing.pdf}
                              target="_blank"
                              rel="noreferrer"
                              className="btn themeBtn"
                            >
                              View PDF
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ContentWrapper>
        </div>
      </section>
    </>
  );

  if (listings.length > 0) {
    return featuredListingsContent();
  }
};

export default CommercialListingsContainer;
