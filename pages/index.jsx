import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "../styles/pages/home.module.scss";

import { apiUrl } from "../utils/apiUrl";
import { appUrl } from "../utils/appUrl";
import fetchPosts from "../utils/fetchPosts";

import Container from "../components/Container.component";
import Footer from "../sections/Footer.component";
import VideoHero from "../components/v2/VideoHero/VideoHero.component";
import GridList from "../components/v2/GridList/GridList.component";
import ImageCopyBlock from "../components/v2/ImageCopyBlock/ImageCopyBlock.component";
import ContactV2 from "../components/v2/Contact/ContactV2.component";
import NeighbourhoodCardsContainer from "../components/v2/NeighbourhoodCard/NeighbourhoodCardsContainer.component";
import NavV3 from "../components/v2/NavV3/NavV3.component";

import AOS from "aos";
import "aos/dist/aos.css";

import fetchInstagramRecentPosts from "../utils/fetchInstagramRecentPosts";
import InstagramFeed from "../components/v3/InstagramFeed/InstagramFeed.component";
import Newsroom from "../sections/Newsroom/Newsroom.component";
import TestimonialsV3 from "../components/v3/Testimonials/Testimonials.component";
import fetchNeighbourhoods from "../utils/fetchNeighbourhoods";
import ContactPopupTrigger from "../components/v2/Contact/ContactPopupTrigger.component";
import ContactFormPopup from "../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopup2025 from "../components/v2/Contact/ContactPopup2025.component";

import contact from "../static/global/contact.json";
import OpenHousePopup from "../components/OpenHousePopup/OpenHousePopup";
import BuildingMap from "../components/BuildingMap.component";

const Home = ({
  testimonials,
  posts,
  contactUs,
  homeV2,
  popup,
  instagramPosts,
  neighbourhoods,
}) => {
  const phoneNumber = contact?.info?.phone ? contact?.info?.phone : null;
  const phoneHref = `tel:${phoneNumber}`;

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      duration: 300,
      disable: "mobile",
    });
  });

  const currentTime = Date.now();
  const popupExpires = popup?.content?.expires
    ? Date.parse(popup?.content?.expires)
    : null;
  const popupExpired = currentTime > popupExpires;

  const [contactPopupIsActive, setContactPopupIsActive] = useState(false);
  useEffect(() => {
    const body = document.querySelector("body");
    contactPopupIsActive
      ? body.classList.add("noscroll")
      : body.classList.remove("noscroll");
  }, [contactPopupIsActive]);

  return (
    <div className={styles.homeWrapper}>
      <Container page="homeV2">
        <Head>
          <title>
            {homeV2.meta?.title
              ? homeV2.meta?.title
              : `Lépine Apartments | Your Stage for Life&apos;s Play`}
          </title>
          {homeV2.meta?.description && (
            <meta name="description" content={homeV2.meta?.description} />
          )}
        </Head>

        <OpenHousePopup />

        <NavV3
          v2
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          contact={contact}
          rentCopy="Rent Today"
        />
        
        <VideoHero header={homeV2.hero.header} video={homeV2.hero.video} />

        <ImageCopyBlock
          id="lifestyle"
          header={homeV2.lifestyle.header}
          copy={homeV2.lifestyle.copy}
          showcaseImage={homeV2.lifestyle.image}
          showcaseColSize={50}
          copyColSize={50}
          reverse
          cornerImageRight
          sp="sp-top"
        />
        <GridList
          id="overview"
          image={homeV2.overview.image}
          items={homeV2.overview.items}
          sp="sp"
        />

        {neighbourhoods && (
          <NeighbourhoodCardsContainer
            header={homeV2.neighbourhoods.header}
            copy={homeV2.neighbourhoods.copy}
            gridRows={2}
            sp
            neighbourhoods={neighbourhoods}
          />
        )}

        <ImageCopyBlock
          id="renaissance"
          background={homeV2.renaissance.backgroundImage}
          header={homeV2.renaissance.header}
          copy={homeV2.renaissance.copy}
          showcaseImage={homeV2.renaissance.image}
          showcaseColSize={50}
          showcaseHeight={80}
          copyColSize={50}
          reverse
          sp="sp"
          btnCopy="Read More About Lépine"
          btnHref="/about"
        />

        {instagramPosts.length > 0 && <InstagramFeed posts={instagramPosts} />}

        <ImageCopyBlock
          id="herosRidge"
          header={homeV2.herosRidge.header}
          subtitle={homeV2.herosRidge.subtitle}
          copy={homeV2.herosRidge.copy}
          showcaseImage={homeV2.herosRidge.image}
          showcaseColSize={50}
          showcaseHeight={80}
          copyColSize={50}
          btnCopy="Learn More About Hero's Ridge"
          btnHref="/herosridge"
        />

        {testimonials.length > 0 && (
          <TestimonialsV3 testimonials={testimonials} />
        )}

        {posts.length > 0 && (
          <Newsroom header="Latest News" posts={posts} newsroom />
        )}

        {contact && (
          <ContactV2
            content={contact}
            contactUs={contactUs}
            infoBar
            phone={contact.info.phone}
            type="form"
            portalId="22452018"
            goalName="home_form_submitted"
            formId="ec38dcaf-e697-48b3-8228-92aa14b18797"
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
            goalName="home_form_submitted"
            formId="ec38dcaf-e697-48b3-8228-92aa14b18797"
            phone={contact.info.phone}
            setContactPopupIsActive={setContactPopupIsActive}
          />
        </ContactFormPopup>

        <Footer socialLinks findMyApartment content={contact} />
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const { apiUrl } = require("../utils/apiUrl");
  const { parseStrapiSingleImage } = require("../utils/parseStrapiImages");
  const { populate } = require("../utils/populate");

  // 1. Fetch Home Page Content directly (replaces /api/home)
  const homeRes = await fetch(`${apiUrl}/home-page?${populate}`);
  const homeData = await homeRes.json();
  const homeJSON = homeData.data.attributes;

  const homeV2 = {
    hero: {
      header: homeJSON.hero.header,
      video: homeJSON.hero.video,
    },
    lifestyle: {
      header: homeJSON.lifestyle.header,
      subtitle: homeJSON.lifestyle.subtitle,
      copy: homeJSON.lifestyle.copy,
      image: parseStrapiSingleImage(homeJSON.lifestyle.image),
    },
    overview: {
      header: homeJSON.overview.header,
      copy: homeJSON.overview.copy,
      image: parseStrapiSingleImage(homeJSON.overview.image),
      items: homeJSON.overview.items.map((item) => ({
        header: item.header,
        copy: item.copy,
        icon: parseStrapiSingleImage(item.icon),
      })),
    },
    neighbourhoods: {
      header: homeJSON.neighbourhoods.header,
      copy: homeJSON.neighbourhoods.copy,
    },
    renaissance: {
      header: homeJSON.renaissance.header,
      subtitle: homeJSON.renaissance.subtitle,
      copy: homeJSON.renaissance.copy,
      backgroundImage: parseStrapiSingleImage(
        homeJSON.renaissance.backgroundImage,
      ),
      image: parseStrapiSingleImage(homeJSON.renaissance.image),
      copyIcon: parseStrapiSingleImage(homeJSON.renaissance.copyIcon),
    },
    herosRidge: {
      header: homeJSON.herosRidge.header,
      subtitle: homeJSON.herosRidge.subtitle,
      copy: homeJSON.herosRidge.copy,
      image: parseStrapiSingleImage(homeJSON.herosRidge.image),
      copyIcon: parseStrapiSingleImage(homeJSON.herosRidge.copyIcon),
    },
    meta: homeJSON.meta,
  };

  // 2. Fetch Testimonials directly (replaces /api/testimonials)
  const testimonialsRes = await fetch(
    `${apiUrl}/testimonials?populate[1]=image&populate[2]=properties&sort[3]=video:asc`,
  );
  const testimonialsData = await testimonialsRes.json();
  const testimonials = testimonialsData.data.map((testimonial) => {
    const { name, description, copy, image, video } = testimonial.attributes;
    return {
      name,
      description,
      copy,
      image: parseStrapiSingleImage(image),
      video,
    };
  });

  // 3. Use Refactored Utilities (Ensure these now fetch from apiUrl directly)
  const posts = await fetchPosts();
  const instagramPosts = await fetchInstagramRecentPosts(10);
  const neighbourhoods = await fetchNeighbourhoods();

  // 4. Fetch Contact Us Content directly
  const contactUsUrl = `${apiUrl}/home?populate[0]=contactUs.images`;
  const contactUsRes = await fetch(contactUsUrl);
  const contactUsData = await contactUsRes.json();

  // 5. Popup Logic
  let popup = null;
  const popupUrl = homeJSON?.popup?.url ? homeJSON.popup.url : null;

  if (popupUrl) {
    const popupRes = await fetch(popupUrl);
    const popupData = await popupRes.json();

    popup = {
      content: {
        title: popupData?.data?.attributes?.title,
        date: popupData?.data?.attributes?.date,
        time: popupData?.data?.attributes?.time,
        theme: popupData?.data?.attributes?.theme,
        expires: popupData?.data?.attributes?.expires,
        property: {
          name: popupData?.data?.attributes?.property.data.attributes.name,
          streetAddress:
            popupData?.data?.attributes?.property.data.attributes.address
              .streetAddress,
          postalCode:
            popupData?.data?.attributes?.property.data.attributes.address
              .postalCode,
          city: popupData?.data?.attributes?.property.data.attributes.address
            .city.data.attributes.name,
          googleMaps:
            popupData?.data?.attributes?.property.data.attributes.address
              .googleMaps,
        },
      },
      type: homeJSON?.popup?.collection,
    };
  }

  return {
    props: {
      popup,
      testimonials,
      posts,
      contactUs: contactUsData.data.attributes.contactUs,
      homeV2,
      instagramPosts: instagramPosts.data || [],
      neighbourhoods,
    },
    revalidate: 1,
  };
}
export default Home;
