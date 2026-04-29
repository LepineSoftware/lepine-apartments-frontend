import { useEffect, useState } from "react";

import styles from "../../styles/pages/property2025.module.scss";

import { appUrl } from "../../utils/appUrl";
import { apiUrl } from "../../utils/apiUrl";
import fetchPropertyPosts from "../../utils/fetchPropertyPosts";

import Head from "next/head";
import { baseUrl } from "../../utils/baseUrl";
import Container from "../../components/Container.component";
import Footer from "../../sections/Footer.component";
import PageTop from "../../components/PageTop.component";

import NavV3 from "../../components/v2/NavV3/NavV3.component";
import { populate } from "../../utils/populate";

import AOS from "aos";
import "aos/dist/aos.css";
import InstagramFeed from "../../components/v3/InstagramFeed/InstagramFeed.component";
import fetchInstagramRecentPosts from "../../utils/fetchInstagramRecentPosts";
import FullVideoHero from "../../components/v3/FullVideoHero/FullVideoHero.component";
import KeyFeaturesSwiper from "../../components/v3/KeyFeaturesSwiper/KeyFeaturesSwiper";
import Link from "next/link";
import FeaturedFloorplans from "../../components/v3/FeaturedFloorplans/FeaturedFloorplans.component";
import ContactFormPopup from "../../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopup2025 from "../../components/v2/Contact/ContactPopup2025.component";
import ContactPopupTrigger from "../../components/v2/Contact/ContactPopupTrigger.component";

import floorplans from "../../static/property/carresaintlouis/floorplans.json";
import keyFeatures from "../../static/property/carresaintlouis/keyFeatures.json";

const Property = ({ property, city, contactInfo, posts, instagramPosts }) => {
  const { meta, pageId, logos, name, contact } = property;

  const title = `${name} | Lépine Apartments`;
  const phoneNumber = contactInfo.info.phone;
  const phoneHref = `tel:${phoneNumber}`;

  const [contactPopupIsActive, setContactPopupIsActive] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    contactPopupIsActive
      ? body.classList.add("noscroll")
      : body.classList.remove("noscroll");
  }, [contactPopupIsActive]);

  const logoDark = baseUrl(logos.dark.data.attributes.url);
  const logoLight = baseUrl(logos.light.data.attributes.url);

  const [links, setLinks] = useState({
    listings: null,
    propertyFeatures: null,
    propertyMap: null,
    faq: null,
    contact: null,
  });

  useEffect(() => {
    AOS.init({
      easing: "ease",
      once: true,
      offset: 0,
      duration: 600,
    });
  }, []);

  useEffect(() => {
    const links = {
      listings: document.getElementById("listings") ? "#listings" : null,
      propertyFeatures: document.getElementById("propertyFeatures")
        ? "#propertyFeatures"
        : null,
      propertyMap: document.getElementById("propertyMap")
        ? "#propertyMap"
        : null,
      faq: document.getElementById("faq") ? "#faq" : null,
      blog: posts && posts.length > 0 ? "#newsroom" : null,
      contact: document.getElementById("contact") ? "#contact" : null,
    };

    setLinks(links);
  }, []);

  const logo = {
    dark: baseUrl(logos.dark.data.attributes.url),
    light: baseUrl(logos.light.data.attributes.url),
    map: baseUrl(logos.markers.propertyPage.data.attributes.url),
  };

  const Bienvenue = () => (
    <div className="bienvenue" id="bienvenue" data-page="carresaintlouis">
      1
      <div className="bienvenue__wrapper sp" data-page="carresaintlouis">
        <div className="contentWrapper bienvenue__content" data-wrapper="xl">
          <h2 className="themeHeader" data-aos="fade-right" data-aos-delay="50">
            Experience Refined Living
            <br />
            at Carré Saint Louis{" "}
          </h2>
          <p data-aos="fade-left" data-aos-delay="100">
            Welcome to Kanata’s newest resort-style community, where timeless
            elegance meets modern convenience. Building on the success of The
            Normand and Saint Emilion, is the latest addition to Lépine’s
            exceptional portfolio in this vibrant neighbourhood.
          </p>

          <p data-aos="fade-left" data-aos-delay="150">
            This six-storey residence features European-inspired architecture
            with 236 thoughtfully designed suites. Each home offers spacious
            layouts, sophisticated finishes, and abundant natural light. Choose
            from one, two, and three-bedroom suites and enjoy premier amenities
            such as a fitness centre, saltwater pool, yoga studio, and tranquil
            outdoor spaces.
          </p>

          <p data-aos="fade-left" data-aos-delay="200">
            Ideally situated at 1050 Canadian Shield Avenue, you’re steps from
            Kanata Centrum’s upscale dining and shopping, entertainment at the
            Canadian Tire Centre, and seamless transit with nearby LRT stations
            and highway access. More than just a residence, Carré Saint Louis is
            a destination where sophistication, comfort, and community come
            together to create an unparalleled lifestyle.
          </p>

          <div
            className="btn themeBtn"
            data-aos="fade-up"
            data-aos-delay="500"
            onClick={() => setContactPopupIsActive(true)}
          >
            Register Today
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.property2025Wrapper}>
      <Container page="propertyV2" theme={pageId} brand="2025">
        <Head>
          <title>{meta?.title ? meta?.title : title}</title>
          {meta?.description && (
            <meta name="description" content={meta?.description} />
          )}
          {meta?.keywords && <meta name="keywords" content={meta?.keywords} />}
        </Head>

        <NavV3
          rentCopy="Rent Today"
          links={links}
          navSecondarySticky={false}
          logoDark={logoDark}
          logoLight={logoLight}
          pageId={pageId}
          current="communities"
          city={city}
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          contact={contactInfo}
        />
        <PageTop />

        <FullVideoHero
          id="hero"
          type="property"
          header={property.hero.header}
          subtitle={`${property.address.streetAddress}, ${property.address.city.name}`}
          copy={property.hero.description}
          showcaseColSize={50}
          showcaseHeight={100}
          copyColSize={50}
          cornerImageLeft
          availabilityCopy=""
          bgImage={baseUrl(property.hero.content.image.data.attributes.url)}
          reverse
          featuredListingsLength={floorplans.length}
          logos={logo}
          btnCopy="Explore Our Floorplans"
          btnHref="#featuredFloorplans"
        />

        <Bienvenue />

        <FeaturedFloorplans
          items={floorplans}
          contactPopupIsActive={contactPopupIsActive}
          setContactPopupIsActive={setContactPopupIsActive}
        />

        <KeyFeaturesSwiper items={keyFeatures} />

        <div className="bigimage" id="contactform" data-page="carresaintlouis">
          <div className="bigimage__content">
            <ContactPopup2025
              htmlFormId="hs-form-1"
              type="form"
              pageId={pageId}
              portalId={contact.portalId}
              goalName="carresaintlouis_property_form_submitted"
              formId={contact.formId}
              phone={contactInfo.phone}
              contactPopupIsActive={contactPopupIsActive}
              setContactPopupIsActive={setContactPopupIsActive}
            />
          </div>
        </div>

        <ContactPopupTrigger setContactOpen={setContactPopupIsActive} />

        <ContactFormPopup
          contactPopupIsActive={contactPopupIsActive}
          setContactPopupIsActive={setContactPopupIsActive}
        >
          <ContactPopup2025
            type="form"
            htmlFormId="hs-form-2"
            pageId={pageId}
            portalId={contact.portalId}
            goalName="carresaintlouis_property_form_submitted"
            formId={contact.formId}
            phone={contactInfo.phone}
            setContactPopupIsActive={setContactPopupIsActive}
          />
        </ContactFormPopup>

        <Link
          href="/commercial"
          className="contactV2__banner"
          style={{ fontWeight: "bold" }}
        >
          <div className="contactV2__banner--overlay"></div>
          <div data-aos="fade" data-aos-delay="250">
            Interested in retail space? Click here to find out more about Les
            Boutiques at Carré Saint Louis
          </div>
        </Link>

        {instagramPosts?.length > 0 && <InstagramFeed posts={instagramPosts} />}

        <Footer findMyApartment content={contactInfo} />
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const id = "carresaintlouis";

  const url = `${appUrl}/api/property?id=${id}`;
  const res = await fetch(url);
  const data = await res.json();

  const propertyGlobalUrl = `${appUrl}/api/propertyGlobal`;
  const propertyGlobalRes = await fetch(propertyGlobalUrl);
  const propertyGlobalData = await propertyGlobalRes.json();

  const indexUrl = `${apiUrl}/home?${populate}`;
  const indexRes = await fetch(indexUrl);
  const indexData = await indexRes.json();

  const propertyPosts = await fetchPropertyPosts(id);

  const contactUrl = `${apiUrl}/contact?populate=deep`;
  const contactRes = await fetch(contactUrl);
  const contactData = await contactRes.json();

  const contactInfo = {
    info: contactData.data.attributes.info,
  };

  const instagramPosts = await fetchInstagramRecentPosts(15);

  if (data.meta.pagination.total === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    let property = data.data[0].attributes;
    property.global = propertyGlobalData;
    const city = property.address.city.name;

    return {
      props: {
        property,
        city,
        contactInfo,
        posts: propertyPosts,
        contactUs: indexData.data.attributes.contactUs,
        instagramPosts: instagramPosts.data? instagramPosts.data : null,
      },
      revalidate: 1,
    };
  }
}

export default Property;
