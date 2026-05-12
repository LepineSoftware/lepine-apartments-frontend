import HubspotForm from "react-hubspot-form";
import ContentWrapper from "../sections/ContentWrapper.component";
import ContactUnsubscribe from "./v2/Contact/ContactUnsubscribe.component";
import { redirectToThankYou } from "../utils/redirectToThankYou";

const PropertyListingsRegister = ({ content, portalId, formId }) => {
  const { header, copy, backgroundImage } = content;

  let bgStyles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no repeat",
    backgroundImage: `url('${backgroundImage}')`,
  };

  return (
    <div className="listings__wrapper" style={bgStyles}>
      <div className="listings__registerForm">
        <div className="listings__registerForm--header themeBGLight">
          <h2>{header}</h2>
        </div>

        <div className="listings__registerForm--content">
          <p>{copy}</p>
          <div className="listings__registerForm--hubspot">
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
                gtag && gtag("event", "coming_soon_form_submitted");
              }}
              onFormSubmitted={() =>
                redirectToThankYou({ form: "coming_soon", formId })
              }
              loading={<div>Loading...</div>}
            />

            {/* <ContactUnsubscribe /> */}
          </div>
          <p className="listings__registerForm--disclaimer">
            *Your privacy is a human right. We are committed to keeping your
            personal information safe and secure. We promise we will never
            share it with anyone without your permission. We will only use it
            to communicate with you and to ensure we are providing you with
            valuable information about our products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingsRegister;
