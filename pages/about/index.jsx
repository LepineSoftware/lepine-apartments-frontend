import Head from "next/head";
import Container from "../../components/Container.component";
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import AboutSection from "../../sections/AboutSection.component";
import Footer from "../../sections/Footer.component";
import Hero from "../../sections/Hero.component";
import fetchAbout from "../../utils/fetchAbout";
import NeighbourhoodCardsContainer from "../../components/v2/NeighbourhoodCard/NeighbourhoodCardsContainer.component";
import ContactV2 from "../../components/v2/Contact/ContactV2.component";
import fetchNeighbourhoods from "../../utils/fetchNeighbourhoods";
import { useEffect, useState } from "react";
import ContactFormPopup from "../../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopup2025 from "../../components/v2/Contact/ContactPopup2025.component";
import ContactPopupTrigger from "../../components/v2/Contact/ContactPopupTrigger.component";

import contact from "../../static/global/contact.json";

import styles from "../../styles/pages/about.module.scss";

function About({
  hero,
  leasingTeam,
  sponsorships,
  sustainability,
  meta,
  neighbourhoods,
}) {
  const phoneNumber = contact?.info?.phone ? contact?.info?.phone : null;

  const [contactPopupIsActive, setContactPopupIsActive] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    contactPopupIsActive
      ? body.classList.add("noscroll")
      : body.classList.remove("noscroll");
  }, [contactPopupIsActive]);

  const phoneHref = `tel:${phoneNumber}`;

  return (
    <div className={styles.aboutWrapper}>
      <Container page="newsroom">
        <Head>
          <title>
            {meta?.title ? meta.title : `About | Lépine Apartments`}
          </title>
          {meta?.description && (
            <meta name="description" content={meta?.description} />
          )}
        </Head>

        <NavV3
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          current="about"
          contact={contact}
          rentCopy="Rent Today"
        />
        {hero && <Hero content={hero} />}
        {leasingTeam && (
          <AboutSection
            id="leasingTeam"
            theme="leasing"
            content={leasingTeam}
          />
        )}
        {/* {sponsorships && <AboutSection id="sponsorships" theme="light" content={sponsorships} padding="sp-bottom" />} */}
        {sustainability && (
          <AboutSection
            id="sustainability"
            theme="light"
            content={sustainability}
            padding="sp-bottom"
          />
        )}
        {neighbourhoods && (
          <NeighbourhoodCardsContainer
            gridRows={2}
            copy="Settle into your favourite neighbourhood. Explore your options and choose an apartment home from one of Lepine’s distinguished rental communities across the greater Ottawa area."
            sp
            neighbourhoods={neighbourhoods}
          />
        )}
        {contact && (
          <ContactV2
            phone={contact.info.phone}
            type="form"
            portalId="22452018"
            formId="7780679e-aaf4-43bf-97cf-3b132636dc9e"
            goalName="about_form_submitted"
          />
        )}

        <ContactPopupTrigger setContactOpen={setContactPopupIsActive} />

        <ContactFormPopup
          contactPopupIsActive={contactPopupIsActive}
          setContactPopupIsActive={setContactPopupIsActive}
        >
          <ContactPopup2025
            htmlFormId="hs-form-1"
            type="form"
            pageId="home"
            portalId="22452018"
            goalName="about_form_submitted"
            formId="7780679e-aaf4-43bf-97cf-3b132636dc9e"
            phone={contact.info.phone}
            setContactPopupIsActive={setContactPopupIsActive}
          />
        </ContactFormPopup>

        <Footer content={contact} />
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const about = await fetchAbout();

  const neighbourhoods = await fetchNeighbourhoods();

  return {
    props: {
      hero: about.data.attributes.hero,
      meta: about.data.attributes.meta,
      leasingTeam: about.data.attributes.leasingTeam,
      sponsorships: about.data.attributes.sponsorships,
      sustainability: about.data.attributes.sustainability,
      neighbourhoods,
    },
    revalidate: 1,
  };
}

export default About;
