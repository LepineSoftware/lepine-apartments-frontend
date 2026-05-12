// import Link from 'next/link';
import HubspotForm from "react-hubspot-form";
import { redirectToThankYou } from "../../../utils/redirectToThankYou";

const ContactPopup2025 = ({
  type,
  portalId,
  formId,
  pageId,
  goalName,
  showMeeting,
}) => {
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
    </>
  );
};

export default ContactPopup2025;
