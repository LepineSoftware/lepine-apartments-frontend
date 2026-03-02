import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper";
import ContentWrapper from "../../../sections/ContentWrapper.component";
import { renderRichText } from "../../../utils/renderRichText";
import NeighbourhoodCard from "./NeighbourhoodCard.component";
import SwiperControls from "../../SwiperControls.component";
import { neighbourhoodsStatic } from "./neighbourhoodsStatic";

// Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NeighbourhoodCardsContainer = ({
  header,
  copy,
  gridRows = 2,
  neighbourhoods,
  noText,
  sp,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const neighbourhoodsContent = neighbourhoods || neighbourhoodsStatic;

  const handleSwiperUpdate = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const classes = ["neighbourhoodCards"];
  sp && classes.push("sp");

  return (
    <section id="neighbourhoods" className={classes.join(" ")}>
      {!noText && (
        <ContentWrapper cssClass="neighbourhoodCards__container" size="xl">
          <div className="neighbourhoodCards__content" data-content="copy">
            <div className="neighbourhoodCards__content--col">
              {header ? (
                <div
                  dangerouslySetInnerHTML={{ __html: renderRichText(header) }}
                />
              ) : (
                <h2>Neighbourhoods You Love</h2>
              )}
            </div>

            <div className="neighbourhoodCards__content--col" data-col="copy">
              <p className="neighbourhoodCards__copy">{copy}</p>
              <div className="neighbourhoodSwiper__controls">
                <SwiperControls
                  swiperName="neighbourhoodSwiper"
                  orientation="horizontal"
                />
              </div>
            </div>
          </div>
        </ContentWrapper>
      )}

      <ContentWrapper cssClass="neighbourhoodCards__swiper">
        <Swiper
          modules={[Pagination, Navigation, Grid]}
          className={`neighbourhoodSwiper gridRows${gridRows}`}
          slidesPerView="auto"
          spaceBetween={30} // Match the 30px gap requirement
          navigation={{
            prevEl: ".neighbourhoodSwiperPrev",
            nextEl: ".neighbourhoodSwiperNext",
          }}
          pagination={{ clickable: true }}
          // --- Mobile Default (Loop & Center) ---
          centeredSlides={true}
          loop={false}
          grid={{ rows: 1, fill: "row" }}
          // --- Desktop Breakpoint ---
          breakpoints={{
            1024: {
              centeredSlides: false,
              loop: false, // No looping or duplication on desktop
              grid: { rows: gridRows, fill: "column" },
            },
          }}
          onSlideChange={handleSwiperUpdate}
          onInit={handleSwiperUpdate}
        >
          {neighbourhoodsContent.map((n, i) => (
            <SwiperSlide key={i}>
              <NeighbourhoodCard {...n} i={i} />
            </SwiperSlide>
          ))}

          {/* Conditional Overlays */}
          <div
            className={`neighbourhoodSwiper__overlay left ${isBeginning ? "is-start" : ""}`}
          />
          <div
            className={`neighbourhoodSwiper__overlay right ${isEnd ? "is-end" : ""}`}
          />
        </Swiper>
      </ContentWrapper>
    </section>
  );
};

export default NeighbourhoodCardsContainer;
