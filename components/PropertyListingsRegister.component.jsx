import HubspotForm from "react-hubspot-form";
import { useState, useEffect } from "react";
import ContentWrapper from "../sections/ContentWrapper.component";
import ContactUnsubscribe from "./v2/Contact/ContactUnsubscribe.component";

const PropertyListingsRegister = ({ content, portalId, formId }) => {
  const { header, copy, backgroundImage } = content;
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);

  let bgStyles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no repeat",
    backgroundImage: `url('${backgroundImage}')`,
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
  }, [formId]);

  const formSubmittedContent = () => {
    return <h3 className="themeHeader">Thank you for submitting the form!</h3>;
  };

  const formNotSubmittedContent = () => {
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
          onSubmit={(e) => {
            const gtag = window.gtag;
            gtag("event", "coming_soon_form_submitted");
          }}
          onFormSubmitted={(e) => {
            setFormSubmitted();
          }}
          loading={<div>Loading...</div>}
        />

        {/* <ContactUnsubscribe /> */}
      </>
    );
  };

  const formStyles = formSubmitStatus ? {} : { minHeight: "1400px" };

  return (
    <div className="listings__wrapper" style={bgStyles}>
      <div className="listings__registerForm">
        <div className="listings__registerForm--header themeBGLight">
          <h2>{header}</h2>
        </div>

        <div className="listings__registerForm--content">
          {!formSubmitStatus && <p>{copy}</p>}
          <div className="listings__registerForm--hubspot">
            {formSubmitStatus
              ? formSubmittedContent()
              : formNotSubmittedContent()}
          </div>
          {!formSubmitStatus && (
            <p className="listings__registerForm--disclaimer">
              *Your privacy is a human right. We are committed to keeping your
              personal information safe and secure. We promise we will never
              share it with anyone without your permission. We will only use it
              to communicate with you and to ensure we are providing you with
              valuable information about our products.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingsRegister;
