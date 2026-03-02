import Head from "next/head";

import styles from "../../styles/pages/newsroom.module.scss";

import Container from "../../components/Container.component";
import Footer from "../../sections/Footer.component";
import Hero from "../../sections/Hero.component";
import NeighbourhoodCardsContainer from "../../components/v2/NeighbourhoodCard/NeighbourhoodCardsContainer.component";

import NavV3 from "../../components/v2/NavV3/NavV3.component";
import fetchNewsroom from "../../utils/fetchNewsroom";
import fetchPosts from "../../utils/fetchPosts";
import fetchContactInfo from "../../utils/fetchContactInfo";
import fetchContactImages from "../../utils/fetchContactImages";
import NewsroomSection from "../../components/v3/NewsroomSection/NewsroomSection.component";
import ContactV2 from "../../components/v2/Contact/ContactV2.component";
import fetchNeighbourhoods from "../../utils/fetchNeighbourhoods";
import { useEffect, useState } from "react";
import ContactPopup2025 from "../../components/v2/Contact/ContactPopup2025.component";
import ContactFormPopup from "../../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopupTrigger from "../../components/v2/Contact/ContactPopupTrigger.component";

const Newsroom = ({ hero, contact, posts, neighbourhoods }) => {
  const phoneNumber = contact?.info?.phone ? contact?.info?.phone : null;
  const phoneHref = `tel:${phoneNumber}`;

  const [contactPopupIsActive, setContactPopupIsActive] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    contactPopupIsActive
      ? body.classList.add("noscroll")
      : body.classList.remove("noscroll");
  }, [contactPopupIsActive]);

  return (
    <div className={styles.newsroomWrapper}>
      <Container page="newsroom">
        <Head>
          <title>Newsroom | Lépine Apartments</title>
        </Head>
        <NavV3
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          current="newsroom"
          contact={contact}
          rentCopy="Rent Today"
        />
        {hero && <Hero content={hero} />}
        {posts && <NewsroomSection posts={posts} />}
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
            goalName="newsroom_form_submitted"
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
            goalName="newsroom_form_submitted"
            formId="7780679e-aaf4-43bf-97cf-3b132636dc9e"
            phone={contact.info.phone}
            setContactPopupIsActive={setContactPopupIsActive}
          />
        </ContactFormPopup>

        <Footer content={contact} />
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const hero = await fetchNewsroom();
  const posts = await fetchPosts();
  const contact = {
    images: await fetchContactImages(),
    info: await fetchContactInfo(),
  };

  const neighbourhoods = await fetchNeighbourhoods();

  return {
    props: {
      hero: hero.data.attributes.hero,
      posts,
      contact,
      neighbourhoods,
    },
    revalidate: 1,
  };
}

export default Newsroom;
