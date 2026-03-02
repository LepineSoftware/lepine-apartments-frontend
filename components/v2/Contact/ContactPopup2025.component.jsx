// import Link from 'next/link';
import { useState } from "react";
import { useEffect } from "react";
import ContactUnsubscribe from "./ContactUnsubscribe.component";
import HubspotForm from "react-hubspot-form";
import Script from "next/script";

const ContactPopup2025 = ({
  htmlFormId,
  type,
  portalId,
  formId,
  pageId,
  goalName,
  bookNowURL,
  showMeeting,
  setShowMeeting,
  showMeetingToggle,
  phone,
  setContactPopupIsActive,
}) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);

  const renderForm = () => {
    if (formSubmitStatus) {
      return (
        <>
          <h3 className="themeHeader">Thank you for submitting the form!</h3>
          <h3 className="themeHeader">
            A Lépine leasing agent will be in touch with you shortly.
          </h3>
        </>
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
    <>
      <section
        id="contact"
        className="contactV2 sp"
        style={{
          minHeight: "100vh",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "0",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="contactV2__row"
          data-row="main"
          data-type={type}
          style={{ borderRadius: "0", justifyContent: "center" }}
        >
          <div
            className="contactV2__col"
            data-aos="fade"
            style={{ padding: "25px", borderRadius: "0", rowGap: "20px" }}
          >
            {type === "form" && <h2 className="themeHeader">Contact Us</h2>}
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

            <div
              className="contactV2__copy"
              data-type={type}
              data-visible={!showMeeting}
            >
              {renderForm()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPopup2025;
