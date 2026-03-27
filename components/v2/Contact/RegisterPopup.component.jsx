// import Link from 'next/link';
import { useState } from "react";
import { useEffect } from "react";
import HubspotForm from "react-hubspot-form";

const ContactPopup2025 = ({
  type,
  portalId,
  formId,
  pageId,
  goalName,
  showMeeting,
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

  return renderForm();
};

export default ContactPopup2025;
