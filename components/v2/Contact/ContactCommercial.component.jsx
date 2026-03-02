import { ImageLoader } from "../../../utils/imageLoader";
import HeroArrow from "../../../assets/svg/heroArrow.svg";
import { useState } from "react";
import { useEffect } from "react";
import { appUrl } from "../../../utils/appUrl";
import ContactUnsubscribe from "./ContactUnsubscribe.component";

const ContactCommercial = ({
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
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [formResponse, setFormResponse] = useState("");

  const renderForm = () => {
    if (formSubmitStatus) {
      return (
        <h3 className="themeHeader">Thank you for submitting the form!</h3>
      );
    } else {
      return (
        <div className="contactV2__form">
          <div className="hs_firstname hs-firstname hs-fieldtype-text field hs-form-field">
            <div className="input">
              <input
                onInput={(e) => setFirstName(e.target.value)}
                placeholder="First Name (required)"
                type="text"
                class="hs-input"
                required
              />
            </div>
          </div>

          <div className="hs_lastname hs-lastname hs-fieldtype-text field hs-form-field">
            <div className="input">
              <input
                onInput={(e) => setLastName(e.target.value)}
                placeholder="Last Name (required)"
                type="text"
                class="hs-input"
                required
              />
            </div>
          </div>

          <div className="hs_email hs-email hs-fieldtype-text field hs-form-field">
            <div className="input">
              <input
                onInput={(e) => setEmail(e.target.value)}
                placeholder="Email (required)"
                type="email"
                class="hs-input"
                required
              />
            </div>
          </div>

          <div className="hs_phone hs-phone hs-fieldtype-phonenumber field hs-form-field">
            <div className="input">
              <input
                onInput={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number (required)"
                type="tel"
                class="hs-input"
                required
              />
            </div>
          </div>

          <div class="hs_message hs-message hs-fieldtype-textarea field hs-form-field">
            <div class="input">
              <textarea
                class="hs-input hs-fieldtype-textarea"
                name="message"
                placeholder="Message (optional)"
                onInput={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>{formResponse ? <h4>{formResponse}</h4> : <h4>{` `}</h4>}</div>

          <div class="hs_submit hs-submit">
            <div class="actions">
              <input
                onClick={(e) => handleFormSubmit(e)}
                type="submit"
                class="hs-button primary large"
                value="Contact Us"
              />
            </div>
          </div>

          {/* <ContactUnsubscribe /> */}
        </div>
      );
    }
  };

  const setFormState = async () => {
    const form = await JSON.parse(
      localStorage.getItem(`CSLCommercialSubmitted`),
    );

    if (!form) {
      localStorage.setItem("CSLCommercialSubmitted", JSON.stringify(false));
    } else {
      setFormSubmitStatus(true);
    }

    const fbFormSubmitted =
      window.location.search.split("?")[1] === "formSubmitted";

    if (fbFormSubmitted) {
      setFormSubmitted(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phoneNumber === "" ||
      message === ""
    ) {
      setFormResponse("Please fill out all required fields!");
      setTimeout(() => {
        setFormResponse("");
      }, 2500);
    } else {
      try {
        setFormResponse("Submitting your inquiry...");

        setTimeout(async () => {
          const fields = {
            firstName,
            lastName,
            email,
            phoneNumber,
            message,
          };

          const response = await fetch("/api/commercial/cslinquiry", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fields),
          });

          if (response.status !== 400) {
            const data = await response.json();
            await setFormResponse(data.message);

            setTimeout(() => {
              setFormSubmitted();
            }, 1000);
          } else {
            const gtag = window.gtag;
            gtag && (await gtag("event", "csl_commercial_form_submitted"));
            await setFormResponse(response.error);
          }
        }, 2500);
      } catch (error) {
        await setFormResponse(
          "Something went wrong! Please email santana@campanale.com",
        );
      }
    }
  };

  const setFormSubmitted = async () => {
    await localStorage.setItem("CSLCommercialSubmitted", JSON.stringify(true));
    setFormSubmitStatus(true);
  };

  useEffect(() => {
    setFormState();
  }, [pageId]);

  return (
    <section id="contactform" className="contactV2">
      {ImageLoader(HeroArrow.src, "contactV2__arrow", "", 1000, 1000, 0.1)}

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
          <div
            className="contactV2__copy"
            data-type={type}
            data-visible={!showMeeting}
          >
            {renderForm()}
          </div>
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
    </section>
  );
};

export default ContactCommercial;
