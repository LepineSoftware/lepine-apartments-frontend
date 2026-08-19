import Image from "next/image";
import Link from "next/link";
import PlayButtonIcon from "../../../assets/svg/playIcon.svg";
import { baseUrl } from "../../../utils/baseUrl";
import parseStrapiDate from "../../../utils/parseStrapiDate";
import PropertyFeatureSVG from "../../v2/PropertyFeatureSVG/PropertyFeatureSVG.component";
import VRIcon from "../../../assets/svg/vr.svg";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import menuCloseIcon from "../../../assets/svg/menuCloseLight.svg";

import { useState } from "react";
import { ImageLoader } from "../../../utils/imageLoader";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const MediaCard = ({ media, type }) => {
  const InstagramCard = ({ media }) => {
    const { media_type, media_url, caption, thumbnail_url, permalink } = media;
    const imageUrl = media_type === "VIDEO" ? thumbnail_url : media_url;
    const formattedCaption =
      caption.length > 450 ? `${caption.slice(0, 450)}...` : caption;

    return (
      <a
        className="mediaCard__link"
        href={permalink}
        target="_blank"
        rel="noreferrer"
      >
        <div className="mediaCard__image">
          <Image
            src={imageUrl}
            alt={formattedCaption}
            height={300}
            width={300}
          />
        </div>

        {media_type === "VIDEO" && (
          <div className="mediaCard__icon">
            <Image
              src={PlayButtonIcon.src}
              alt="Play video"
              height={50}
              width={50}
            />
          </div>
        )}
        {caption && (
          <div className="mediaCard__caption">
            <p>{formattedCaption}</p>
            <p className="mediaCard__readMore">Read More</p>
          </div>
        )}
      </a>
    );
  };

  const PropertyFeatureCard = ({ media, type }) => {
    const { header, copy, cardImage } = media;

    const defaultAmenityImage = cardImage ? baseUrl(cardImage) : null;
    const propertySpecificAmenityImage = media.image
      ? baseUrl(media.image)
      : null;

    let image = null;

    if (media.type === "commercial") {
      image = media.cardImage;
    } else {
      if (propertySpecificAmenityImage) {
        image = propertySpecificAmenityImage;
      } else {
        if (defaultAmenityImage) {
          image = defaultAmenityImage;
        }
      }
    }

    const style = { backgroundImage: `url('${image}')` };

    return (
      <div className="mediaCard" data-type="propertyFeature">
        <div className="mediaCard__bg" style={style}></div>

        <div className="mediaCard__icon themeBGLight">
          <div className="mediaCard__transparentBG"></div>
          <PropertyFeatureSVG name={header} />
        </div>

        <div className="mediaCard__content themeBGLight">
          <h3>{header}</h3>
          <p>{copy}</p>
        </div>
      </div>
    );
  };

  const NewsroomCard = ({ media }) => {
    const { title, date, preview, slug, images, author, categories } = media;

    return (
      <Link
        href={`/newsroom/${slug}`}
        onClick={() => submitGAEvent("newsroom_card_clicked")}
      >
        <div className="mediaCard themeBG" data-type="newsroom">
          <div className="mediaCard__image">
            <Image
              src={images.thumbnail}
              alt={preview}
              height={800}
              width={800}
              quality={100}
            />
          </div>

          <div className="mediaCard__content">
            {title && <span className="mediaCard__title">{title}</span>}
            {date && <p className="mediaCard__date">{parseStrapiDate(date)}</p>}
            {categories?.length > 0 && (
              <div className="mediaCard__categories">
                {categories.map((c, i) => (
                  <div key={i} className="mediaCard__categories--item themeBGDark">
                    <p>{c}</p>
                  </div>
                ))}
              </div>
            )}

            {author && (
              <div className="mediaCard__author">
                <div className="mediaCard__author--block">
                  {author.image &&
                    ImageLoader(author.image, "", "", 2560, 900, 10)}

                  <div className="mediaCard__author--copy">
                    <p style={{ fontWeight: "bold" }}>{author.name}</p>
                    <p>{author.title}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const ModelSuitesCard = ({ media }) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const { title, copy, link, image } = media;
    const style = { backgroundImage: `url('${image}')` };

    return (
      <>
        <div
          className="mediaCard"
          data-type="modelSuites"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="mediaCard__bg" style={style}></div>
          <div className="mediaCard__vr themeBGDark">
            <Image
              src={VRIcon.src}
              alt="View Model Suite Tour"
              height={25}
              width={25}
            />
            <h3>View Model Suite Tour</h3>
          </div>

          <div className="mediaCard__content">
            <h3 className="themeHeader">{title}</h3>
            <p>{copy}</p>
          </div>
        </div>

        <Popup
          key={Math.random()}
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          modal
          nested
          onOpen={() => submitGAEvent("model_suite_clicked")}
        >
          <div
            className="mediaCard__popup bgPrimary"
            style={{ height: "450px", width: "90vw", position: "relative" }}
          >
            <div
              className="mediaCard__popup--close themeBGLight"
              onClick={closeModal}
              style={{
                height: "50px",
                width: "100%",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "10001",

                background: "#202020",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0 25px",
              }}
            >
              <Image
                src={menuCloseIcon}
                alt="View Model Suite Tour"
                height={25}
                width={25}
              />
            </div>

            <iframe
              key={link}
              id={link}
              src={link}
              frameBorder={0}
              style={{
                height: "100%",
                width: "100%",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "8000",
              }}
            ></iframe>
          </div>
        </Popup>
      </>
    );
  };

  const TestimonialsCard = ({ media }) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const { name, description, copy, image, video } = media;

    const style = { backgroundImage: `url('${image}')` };

    return (
      <>
        <div className="mediaCard" data-type="testimonials">
          <div
            className="mediaCard__image"
            style={style}
            onClick={() => {
              setOpen(true);
              submitGAEvent("testimonial_video_clicked");
            }}
          >
            {video && (
              <div className="mediaCard__icon themeBGDark">
                {ImageLoader(
                  PlayButtonIcon.src,
                  "",
                  "Play testimonial video",
                  100,
                  100,
                  0.1,
                )}
              </div>
            )}
          </div>

          <div className="mediaCard__content">
            <h3 className="themeHeader">{name}</h3>
            {/* <p>{description}</p> */}
            <p>{copy}</p>
          </div>
        </div>

        <Popup
          key={Math.random()}
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          modal
          nested
        >
          <div className="mediaCard__popup bgPrimary">
            <div className="mediaCard__popup--close">
              <Image src={menuCloseIcon} alt={copy} height={25} width={25} />
            </div>

            <iframe
              key={video}
              id={video}
              src={video}
              type="text/html"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder={0}
            ></iframe>
          </div>
        </Popup>
      </>
    );
  };

  if (type === "instagram") {
    return <InstagramCard media={media} />;
  } else if (type === "propertyFeature") {
    return <PropertyFeatureCard media={media} />;
  } else if (type === "newsroom") {
    return <NewsroomCard media={media} />;
  } else if (type === "modelSuites") {
    return <ModelSuitesCard media={media} />;
  } else if (type === "testimonials") {
    return <TestimonialsCard media={media} />;
  }
};

export default MediaCard;
