import { baseUrl } from "../../../utils/baseUrl";
import { ImageLoader } from "../../../utils/imageLoader";
// import HeroArrow from '../../../assets/svg/heroArrow.svg';
import { useState } from "react";
import { useEffect } from "react";
import HubspotForm from "react-hubspot-form";
import ContactInfoBar from "../../ContactInfoBar.component";
import ContactUnsubscribe from "./ContactUnsubscribe.component";

const ContactV2 = ({
  content,
  infoBar,
  type,
  portalId,
  formId,
  pageId,
  goalName,
  bookNowURL,
  showMeeting,
  setShowMeeting,
  showMeetingToggle,
  tourLocation,
  phone,
  imageL,
  imageR,
}) => {
  const renderForm = () => {
    if (formSubmitStatus) {
      return (
        <h3 className="themeHeader">Thank you for submitting the form!</h3>
      );
    } else {
      return (
        <>
          <HubspotForm
            portalId={portalId}
            formId={formId}
            onReady={() => {
              const script = document.createElement("script");
              script.src =
                "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
              let jqueryScript = document.getElementsByTagName("script");
              let src = Array.from(jqueryScript).filter(
                (item) => item.src === script.src,
              );
              if (src.length === 0) {
                document.body.appendChild(script);
              }
            }}
            onSubmit={() => {
              const gtag = window.gtag;
              goalName && gtag("event", goalName);
            }}
            onFormSubmitted={() => setFormSubmitted()}
            loading={<div>Loading...</div>}
          />

          {/* <ContactUnsubscribe /> */}
        </>
      );
    }
  };

  const [formSubmitStatus, setFormSubmitStatus] = useState(false);

  const setFormState = async () => {
    const form = await JSON.parse(localStorage.getItem(`${formId}Submitted`));

    if (!form) {
      localStorage.setItem(`${formId}Submitted`, JSON.stringify(false));
    } else {
      setFormSubmitStatus(true);
    }

    const fbFormSubmitted =
      window.location.search.split("?")[1] === "formSubmitted";

    if (fbFormSubmitted) {
      setFormSubmitted(true);
    }
  };

  const setFormSubmitted = async (e) => {
    await localStorage.setItem(`${formId}Submitted`, JSON.stringify(true));
    setFormSubmitStatus(true);
  };

  useEffect(() => {
    setFormState();
  }, [pageId]);

  return (
    <section id="contact" className="contactV2">
      {/* {ImageLoader(HeroArrow.src, 'contactV2__arrow', '', 1000, 1000, 0.1)} */}
      <div className="contactV2__row" data-row="main" data-type={type}>
        <div
          className="contactV2__col contactV2__col--img1"
          data-col="img"
          data-type={type}
          data-aos="fade-right"
        >
          {imageL
            ? ImageLoader(imageL, "", "", 650, 500, 1)
            : ImageLoader(
                "https://lepine-storage.nyc3.digitaloceanspaces.com/4797e22a3ddd5bf7f6855f3430efdc36.jpg",
                "",
                "",
                650,
                500,
                10,
              )}
        </div>

        <div className="contactV2__col" data-col="cta" data-aos="fade">
          {type === "form" && <h2 className="themeHeader">Contact</h2>}
          {tourLocation && <h3 className="themeHeader">{tourLocation}</h3>}

          {phone && (
            <a href={`tel:${phone}`}>
              <h3
                className="themeHeader"
                onClick={() => {
                  const gtag = window.gtag;
                  gtag("event", "phone_number_clicked");
                }}
              >
                {phone}
              </h3>
            </a>
          )}

          {bookNowURL && showMeetingToggle && (
            <div className="slider__container">
              <p className="themeHeader">
                {showMeeting ? "Show Form" : "Show Calendar"}
              </p>
              <label class="switch">
                <input
                  defaultChecked={showMeeting}
                  checked={showMeeting}
                  type="checkbox"
                  onClick={() => setShowMeeting(!showMeeting)}
                />
                <span class="slider round"></span>
              </label>
            </div>
          )}

          <div
            className="contactV2__copy"
            data-type={type}
            data-visible={!showMeeting}
          >
            {renderForm()}
          </div>

          {bookNowURL && (
            <div
              className="contactV2__copy--meeting"
              data-type={type}
              data-visible={showMeeting}
            >
              <iframe
                className="meetings-iframe-container"
                data-src={bookNowURL}
                src={bookNowURL}
                key={bookNowURL}
                id={bookNowURL}
                frameBorder="0"
              ></iframe>
            </div>
          )}
        </div>

        <div
          className="contactV2__col contactV2__col--img2"
          data-col="img"
          data-type={type}
          data-aos="fade-left"
        >
          {imageR
            ? ImageLoader(imageR, "", "", 650, 500, 1)
            : ImageLoader(
                "https://lepine-storage.nyc3.digitaloceanspaces.com/cb00c72554dce6b7a64b510ca953c234.jpg",
                "",
                "",
                650,
                500,
                10,
              )}
        </div>
      </div>

      {/* {infoBar && <ContactInfoBar address={content.info.address} city={content.info.city} postalCode={content.info.postalCode} hours={content.info.hours} phone={content.info.phone} email={content.info.email} corporatePhone={content.info.corporatePhone} />} */}
    </section>
  );
};

export default ContactV2;
