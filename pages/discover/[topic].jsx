import Head from "next/head";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HubspotForm from "react-hubspot-form";
import fs from "fs";
import path from "path";

// External Utils
import { apiUrl } from "../../utils/apiUrl";
import fetchNeighbourhoods from "../../utils/fetchNeighbourhoods";

// Global Components
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import Footer from "../../sections/Footer.component";
import ContactPopupTrigger from "../../components/v2/Contact/ContactPopupTrigger.component";
import ContactFormPopup from "../../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopup2025 from "../../components/v2/Contact/ContactPopup2025.component";
import MicroPopup from "../../components/MicroPopup/MicroPopup.component";
import NeighbourhoodCardsContainer from "../../components/v2/NeighbourhoodCard/NeighbourhoodCardsContainer.component";

// Page Styles
import s from "./discover.module.scss";

const Hero = ({ header, sub, copy, btnText, btnHref, bgImage }) => (
  <section className={s.hero} id="hero">
    <div className={s.hero__bg}>
      <img src={bgImage} alt={header} />
    </div>
    <div className={s.hero__content} data-aos="fade-up">
      <p className={s.subheading}>{sub}</p>
      <h1>{header}</h1>
      <p>{copy}</p>
      {btnText && (
        <a href={btnHref} className={s.btn}>
          {btnText}
        </a>
      )}
    </div>
  </section>
);

const SplitSection = ({
  id,
  header,
  sub,
  copy,
  image,
  reverse,
  btnText,
  btnHref,
  lifestyleHook, // New hook from properties.json
  localBestOf, // New hook from properties.json
}) => (
  <section id={id} className={`${s.splitSection} ${reverse ? s.reverse : ""}`}>
    <div className={s.splitSection__image} data-aos="fade">
      <img src={image} alt={header} />
    </div>
    <div className={s.splitSection__content} data-aos="fade-up">
      <p className={s.subheading}>{sub}</p>
      <h2 className={s.heading}>{header}</h2>

      {/* Renders the lifestyle hook if present */}
      {lifestyleHook && (
        <p
          className={s.bodyText}
          style={{ fontWeight: 700, color: "#0b4566", marginBottom: "1rem" }}
        >
          {lifestyleHook}
        </p>
      )}

      <div className={s.bodyText} dangerouslySetInnerHTML={{ __html: copy }} />

      {/* Renders the "Best Of" list if present */}
      {localBestOf && localBestOf.length > 0 && (
        <ul className={s.bestOfList}>
          {localBestOf.map((item, idx) => {
            const [label, text] = item.split(":");
            return (
              <li key={idx}>
                <strong>{label}:</strong> {text}
              </li>
            );
          })}
        </ul>
      )}

      {btnText && (
        <a href={btnHref} className={s.btn}>
          {btnText}
        </a>
      )}
    </div>
  </section>
);

const ValueBreakdown = ({ data }) => {
  if (!data) return null;

  // Calculate Total Time Saved (Maintenance + Seasonal)
  const weeklyHours = parseInt(data.stats[0].house) || 0;
  const seasonalHours = parseInt(data.stats[1].house) || 0;
  const totalAnnualSaved = weeklyHours * 52 + seasonalHours;

  return (
    <section className={s.valueSection}>
      <div className={s.valueSection__wrapper}>
        <div className={s.valueSection__header} data-aos="fade-up">
          <p className={s.subheading}>The ROI of Lighter Living</p>
          <h2 className={s.heading}>Where does your time and money go?</h2>
          <p className={s.bodyText}>{data.copy}</p>
        </div>

        <div className={s.valueGridSideBySide}>
          {/* Card 1: Inverted Hero Anchor */}
          <div
            className={`${s.valueCardFlashy} ${s.heroCardInverted}`}
            data-aos="fade-up"
          >
            <div className={s.reclaimedHero}>
              <div className={s.reclaimedHero__label}>Total Reclaimed</div>
              <div className={s.reclaimedHero__number}>
                <span>{totalAnnualSaved}</span> <small>Hours Per Year</small>
              </div>
            </div>
          </div>

          {/* Cards 2-4: Stacked Metric Breakdown */}
          {data.stats.map((stat, i) => (
            <div
              key={i}
              className={s.valueCardFlashy}
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 100}
            >
              <div className={s.valueCardFlashy__icon}>
                {i === 0 && "🕒"} {i === 1 && "🍂"} {i === 2 && "✈️"}
              </div>

              <h4 className={s.valueCardFlashy__label}>{stat.label}</h4>

              {/* Vertical Stacked Comparison */}
              <div className={s.valueCardFlashy__comparisonStacked}>
                <div className={s.comparisonItem}>
                  <span className={s.compLabel}>Homeowner Burden</span>
                  <span className={s.compValue__old}>{stat.house}</span>
                </div>

                <div className={s.comparisonDivider}>
                  <div className={s.line}></div>
                  <div className={s.arrow}>↓</div>
                  <div className={s.line}></div>
                </div>

                <div className={s.comparisonItem}>
                  <span className={s.compLabel}>Lépine Standard</span>
                  <span className={s.compValue__new}>{stat.lepine}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className={s.disclaimer}>
          * Based on average Ontario detached home maintenance data vs. the
          Lépine Standard.
        </p>
      </div>
    </section>
  );
};
const GridCards = ({ data }) => (
  <section className={s.gridSection}>
    <div className={s.gridSection__header} data-aos="fade-up">
      <p className={s.subheading}>
        {data.subheading || "The Lépine Advantage"}
      </p>
      <h2 className={s.heading}>{data.header}</h2>
      <div
        className={s.bodyText}
        dangerouslySetInnerHTML={{ __html: data.copy }}
      />
    </div>
    <div className={s.gridSection__grid}>
      {data.hubs.map((hub, i) => (
        <div
          key={i}
          className={s.advantageCard}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <span className={s.timeLabel}>{hub.time}</span>
          <h3>{hub.label}</h3>
          <p>{hub.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const ComparisonTable = ({ data }) => (
  <section className={s.comparisonSection} id="comparison">
    <div className={s.comparisonSection__inner}>
      <div data-aos="fade-right" style={{ textAlign: "center" }}>
        <p className={s.subheading}>The Lépine Standard</p>
        <h2 className={s.heading}>{data.header}</h2>
        <div
          className={s.bodyText}
          dangerouslySetInnerHTML={{ __html: data.copy }}
        />
      </div>
      <div className={s.comparisonTable} data-aos="zoom-in">
        <div className={`${s.comparisonTable__row} ${s.header}`}>
          <div
            className={s.comparisonTable__cell}
            style={{ color: "#fff", textAlign: "center" }}
          >
            {data.labels?.left || "Market Standard"}
          </div>
          <div
            className={s.comparisonTable__cell}
            style={{ color: "#fff", textAlign: "center" }}
          >
            {data.labels?.right || "Lépine Apartments"}
          </div>
        </div>
        {data.points.map((point, i) => (
          <div key={i} className={s.comparisonTable__row}>
            <div className={`${s.comparisonTable__cell} ${s.currentLocation}`}>
              {point.currentLocation}
            </div>
            <div className={`${s.comparisonTable__cell} ${s.lepine}`}>
              {point.lepine}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AmenitiesGrid = ({ items }) => (
  <section className={s.gridSection}>
    <div className={s.gridSection__header} data-aos="fade-up">
      <h2 className={s.heading}>Resort-Style Standards</h2>
      <div className={s.bodyText}>
        Forget the gym membership and the country club fees. At Lépine, it’s all
        included.
      </div>
    </div>
    <div className={s.gridSection__grid}>
      {items.map((item, i) => (
        <div
          key={i}
          className={s.gridSection__item}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <div className={s.gridSection__item__imageWrapper}>
            <img src={item.image} alt={item.title} />
          </div>
          <div className={s.gridSection__item__content}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const StepsTransition = ({ image, steps }) => (
  <section className={s.transitionSection}>
    <div className={s.transitionSection__image} data-aos="fade-right">
      <img src={image} alt="Process Steps" />
    </div>
    <div className={s.transitionSection__list} data-aos="fade-left">
      <h2 className={s.heading}>Making the Move</h2>
      {steps.map((step, i) => (
        <div key={i} className={s.transitionSection__item}>
          <div className={s.number}>{i + 1}</div>
          <div className={s.text}>
            <p dangerouslySetInnerHTML={{ __html: step }} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const SectionHeader = ({ header, copy, id }) => (
  <section
    id={id}
    className={s.moreLepineSection}
    style={{ padding: "4rem 2rem 0" }}
  >
    <div className={s.moreLepineSection__wrapper} data-aos="fade-up">
      <h2 className={s.heading} style={{ fontSize: "3rem" }}>
        {header}
      </h2>
      <p className={s.bodyText} style={{ maxWidth: "800px", margin: "0 auto" }}>
        {copy}
      </p>
    </div>
  </section>
);

const InlineContact = ({ portalId, formId, phone, header, copy, bgImage }) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);
  return (
    <div className={s.contactSection}>
      <div className={s.contactSection__bg}>
        <img src={bgImage} alt="Contact Background" />
      </div>
      <div className={s.contactSection__content}>
        <h2 className={s.heading} style={{ color: "#fff" }}>
          {header}
        </h2>
        {phone && (
          <h3 className={s.contactSection__phone}>
            <a href={`tel:${phone}`}>{phone}</a>
          </h3>
        )}
        <p
          className={s.bodyText}
          style={{ color: "#fff", marginBottom: "3rem", opacity: 0.9 }}
        >
          {copy}
        </p>
        {formSubmitStatus ? (
          <div
            className={s.inlineContactForm}
            style={{ textAlign: "center", padding: "4rem 2rem" }}
          >
            <h3
              style={{
                color: "#5E514D",
                fontSize: "1.8rem",
                marginBottom: "1rem",
              }}
            >
              Thank you!
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#333" }}>
              A Lépine leasing agent will be in touch with you shortly.
            </p>
          </div>
        ) : (
          <div className={s.inlineContactForm}>
            <HubspotForm
              portalId={portalId}
              formId={formId}
              onSubmit={() => setFormSubmitStatus(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN TEMPLATE ---

const Discover = ({ contact, neighbourhoods, pageData, topic }) => {
  const phoneNumber = contact?.info?.phone || null;
  const formattedPhone = contact?.info?.formattedPhone || phoneNumber;
  const phoneHref = `tel:${phoneNumber}`;
  const [contactPopupIsActive, setContactPopupIsActive] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 500, once: true, offset: 0 });
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      contactPopupIsActive
        ? body.classList.add("noscroll")
        : body.classList.remove("noscroll");
    }
  }, [contactPopupIsActive]);

  if (!pageData) return null;

  return (
    <div className={s.relocateWrapper}>
      <Head>
        <title>{pageData.meta.title}</title>
        <meta name="description" content={pageData.meta.description} />
      </Head>

      <MicroPopup />
      <NavV3
        v2
        phoneNumber={phoneNumber}
        phoneHref={phoneHref}
        contact={contact}
        rentCopy="Rent Today"
      />

      <Hero {...pageData.hero} />
      <SplitSection {...pageData.intro} />

      <GridCards data={pageData.locationAdvantage} />

      {/* Conditionally Render Value Breakdown Infographic */}
      <ValueBreakdown data={pageData.valueBreakdown} />

      <SplitSection {...pageData.lifestyle} reverse />
      <ComparisonTable data={pageData.comparison} />

      <SectionHeader
        id="properties"
        header={pageData.propertiesSection.header}
        copy={pageData.propertiesSection.copy}
      />
      {pageData.propertiesSection.properties.map((prop, index) => (
        <SplitSection key={prop.id} {...prop} reverse={index % 2 !== 0} />
      ))}

      <AmenitiesGrid items={pageData.amenities} />
      <StepsTransition {...pageData.transition} />

      <section className={s.moreLepineSection}>
        <div className={s.moreLepineSection__wrapper}>
          <h2>{pageData.neighbourhoods.header}</h2>
          <p>{pageData.neighbourhoods.copy}</p>
        </div>
        <NeighbourhoodCardsContainer
          neighbourhoods={neighbourhoods}
          gridRows={2}
          noText
        />
      </section>

      <InlineContact
        portalId="22452018"
        formId="ec38dcaf-e697-48b3-8228-92aa14b18797"
        phone={formattedPhone}
        header={pageData.contact.header}
        copy={pageData.contact.copy}
        bgImage={pageData.contact.bgImage}
      />

      <ContactPopupTrigger setContactOpen={setContactPopupIsActive} />
      <ContactFormPopup
        contactPopupIsActive={contactPopupIsActive}
        setContactPopupIsActive={setContactPopupIsActive}
      >
        <ContactPopup2025
          htmlFormId="hs-form-dynamic-popup"
          type="form"
          pageId={`discover-${topic}`}
          portalId="22452018"
          goalName="discover_form_submitted"
          formId="ec38dcaf-e697-48b3-8228-92aa14b18797"
          phone={phoneNumber}
          setContactPopupIsActive={setContactPopupIsActive}
        />
      </ContactFormPopup>
      <Footer socialLinks findMyApartment content={contact} />
    </div>
  );
};

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), "static/discover");
  const files = fs.readdirSync(dir);
  const paths = files
    .filter(
      (f) =>
        !fs.lstatSync(path.join(dir, f)).isDirectory() && f.endsWith(".json"),
    )
    .map((f) => ({ params: { topic: f.replace(".json", "") } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { topic } = params;
  const filePath = path.join(process.cwd(), "static/discover", `${topic}.json`);
  const pageData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // 1. Inject Global Properties
  const globalPropsPath = path.join(
    process.cwd(),
    "static/discover/global/properties.json",
  );
  const globalProperties = JSON.parse(fs.readFileSync(globalPropsPath, "utf8"));
  pageData.propertiesSection = globalProperties.propertiesSection;

  // 2. Inject Global Amenities
  const globalAmenitiesPath = path.join(
    process.cwd(),
    "static/discover/global/amenities.json",
  );
  const globalAmenities = JSON.parse(
    fs.readFileSync(globalAmenitiesPath, "utf8"),
  );
  pageData.amenities = globalAmenities.amenities;

  // 3. Inject Global Neighbourhoods Section
  const globalNeighboursPath = path.join(
    process.cwd(),
    "static/discover/global/neighbourhoods.json",
  );
  const globalNeighbours = JSON.parse(
    fs.readFileSync(globalNeighboursPath, "utf8"),
  );
  pageData.neighbourhoods = globalNeighbours.neighbourhoods;

  const neighbourhoods = await fetchNeighbourhoods();
  const contactRes = await fetch(`${apiUrl}/contact?populate=deep`);
  const contactData = await contactRes.json();

  return {
    props: {
      contact: contactData.data.attributes,
      neighbourhoods,
      pageData,
      topic,
    },
    revalidate: 1,
  };
}

export default Discover;
