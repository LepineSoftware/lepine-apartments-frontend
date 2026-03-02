import { useState } from "react";
import { useEffect } from "react";
import ContactUnsubscribe from "./ContactUnsubscribe.component";

const ContactGeneral = ({ type, pageId, setContactPopupIsActive }) => {
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
        <h3 className="themeHeader">
          Thank you! Your inquiry has been received.
        </h3>
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
    const form = await JSON.parse(localStorage.getItem(`GeneralFormSubmitted`));

    if (!form) {
      localStorage.setItem("GeneralFormSubmitted", JSON.stringify(false));
    } else {
      setFormSubmitStatus(true);
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

          const response = await fetch("/api/general/contact", {
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
            gtag && (await gtag("event", "general_contact_form_submitted"));
            await setFormResponse(response.error);
          }
        }, 2500);
      } catch (error) {
        await setFormResponse(
          "Something went wrong! Please email leasing@lepinecorp.com",
        );
      }
    }
  };

  const setFormSubmitted = async () => {
    await localStorage.setItem("GeneralFormSubmitted", JSON.stringify(true));
    setFormSubmitStatus(true);

    setTimeout(() => {
      setContactPopupIsActive(false);
    }, 2500);
  };

  useEffect(() => {
    setFormState();
  }, [pageId]);

  return (
    <section
      id="contact"
      className="contactV2"
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
      <div className="contactV2__row" data-row="main" data-type={type}>
        <div
          className="contactV2__col"
          data-aos="fade"
          style={{ padding: "25px" }}
        >
          {type === "form" && (
            <h2 className="themeHeader">General Inquiries</h2>
          )}
          <br />
          <div className="contactV2__copy" data-type={type}>
            {renderForm()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactGeneral;
