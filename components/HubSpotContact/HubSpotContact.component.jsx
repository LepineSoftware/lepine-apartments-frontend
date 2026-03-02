import { useState, useEffect } from "react";
import Image from "next/image";
import HubspotForm from "react-hubspot-form";
import CloseIcon from "../../assets/svg/menuCloseLight.svg";
import ChatIcon from "../../assets/svg/chatIcon.svg";

const HubSpotContact = ({
  portalId,
  formId,
  bookNowURL,
  header = "Contact Us",
  phone,
  goalName,
  contactBGImage,
}) => {
  const [popupActive, setPopupActive] = useState(false);
  const [staticMeetingView, setStaticMeetingView] = useState(false);
  const [popupMeetingView, setPopupMeetingView] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (popupActive) {
      body.classList.add("noscroll");
    } else {
      body.classList.remove("noscroll");
    }
    return () => body.classList.remove("noscroll");
  }, [popupActive]);

  useEffect(() => {
    const submitted = localStorage.getItem(`${formId}_submitted`);
    if (submitted === "true") setFormSubmitted(true);
  }, [formId]);

  const handleFormSubmit = () => {
    localStorage.setItem(`${formId}_submitted`, "true");
    setFormSubmitted(true);
    if (window.gtag && goalName) window.gtag("event", goalName);
  };

  const renderContent = (isMeeting) => {
    if (formSubmitted) {
      return (
        <div className="hubspotContact__success">
          <h3 className="themeHeader">Thank you for submitting!</h3>
          <p>A Lépine leasing agent will be in touch shortly.</p>
        </div>
      );
    }

    if (isMeeting && bookNowURL) {
      return (
        <div className="hubspotContact__meeting">
          <iframe
            src={bookNowURL}
            frameBorder="0"
            title="Meeting Schedule"
            className="hubspotContact__iframe"
          ></iframe>
        </div>
      );
    }

    return (
      <div className="hubspotContact__formWrapper">
        <HubspotForm
          portalId={portalId}
          formId={formId}
          onFormSubmitted={handleFormSubmit}
          loading={
            <div className="hubspotContact__loader">Loading Form...</div>
          }
        />
      </div>
    );
  };

  return (
    <>
      {/* STATIC SECTION AT BOTTOM OF PAGE */}
      <section className="hubspotContact" id="contactform">
        <div
          className="hubspotContact__bg"
          style={{
            backgroundImage: contactBGImage
              ? `url('${contactBGImage}')`
              : "none",
          }}
        />
        <div className="hubspotContact__container">
          <div className="hubspotContact__headerSection">
            <h2>{header}</h2>
            {phone && (
              <a href={`tel:${phone}`} className="hubspotContact__phone">
                <h3 className="themeHeader">{phone}</h3>
              </a>
            )}
            {bookNowURL && !formSubmitted && (
              <div className="hubspotContact__toggle">
                <span className={!staticMeetingView ? "active" : ""}>
                  Contact Form
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={staticMeetingView}
                    onChange={() => setStaticMeetingView(!staticMeetingView)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className={staticMeetingView ? "active" : ""}>
                  Book Now
                </span>
              </div>
            )}
          </div>
          <div className="hubspotContact__content">
            {renderContent(staticMeetingView)}
          </div>
        </div>
      </section>

      {/* PERSISTENT FLOATING TRIGGER */}
      <div
        className="hubspotContact__trigger themeBtn"
        onClick={() => setPopupActive(true)}
      >
        <Image src={ChatIcon} alt="Contact" width={30} height={30} />
      </div>

      {/* POPUP VIEW */}
      {popupActive && (
        <div className="hubspotContact--popup">
          <div className="hubspotContact__container">
            <button
              className="hubspotContact__close themeBtn"
              onClick={() => setPopupActive(false)}
            >
              <Image src={CloseIcon} height={20} width={20} alt="Close" />
            </button>

            <div className="hubspotContact__headerSection">
              {bookNowURL && !formSubmitted && (
                <div className="hubspotContact__toggle">
                  <span className={!popupMeetingView ? "active" : ""}>
                    Contact Form
                  </span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={popupMeetingView}
                      onChange={() => setPopupMeetingView(!popupMeetingView)}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className={popupMeetingView ? "active" : ""}>
                    Book Now
                  </span>
                </div>
              )}
            </div>

            <div className="hubspotContact__content">
              {renderContent(popupMeetingView)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HubSpotContact;
