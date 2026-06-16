// import Link from 'next/link';
import ContactUnsubscribe from "./ContactUnsubscribe.component";
import HubspotForm from "react-hubspot-form";
import Script from "next/script";
import { redirectToThankYou } from "../../../utils/redirectToThankYou";

const ContactPopup2025 = ({
  htmlFormId,
  type,
  title,
  subtitle,
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
  const renderForm = () => {
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
            goalName && gtag && gtag("event", goalName);
          }}
          onFormSubmitted={() =>
            redirectToThankYou({ form: goalName, property: pageId, formId })
          }
          loading={<div>Loading...</div>}
        />

        {/* <ContactUnsubscribe /> */}
      </>
    );
  };

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
            {type === "form" && (
              <h2 className="themeHeader">{title || "Contact Us"}</h2>
            )}
            {type === "form" && subtitle && (
              <h3 className="contactV2__subtitle">{subtitle}</h3>
            )}
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
