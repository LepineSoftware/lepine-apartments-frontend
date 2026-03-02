import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/pages/property.module.scss";

import { appUrl } from "../../utils/appUrl";
import { apiUrl } from "../../utils/apiUrl";
import fetchPropertyPosts from "../../utils/fetchPropertyPosts";

import Head from "next/head";
import { baseUrl } from "../../utils/baseUrl";
import Container from "../../components/Container.component";
import NavSecondary from "../../sections/NavSecondary.component";
import PropertyGallery from "../../sections/PropertyGallery.component";
import FAQ from "../../components/v3/FAQ/FAQ.component";
import Footer from "../../sections/Footer.component";
import PageTop from "../../components/PageTop.component";

import { submitUtmSource } from "../../utils/gtag";
import fetchLeasingSteps from "../../utils/fetchLeasingSteps";
import { parseGalleryImages } from "../../utils/parseGalleryImages";
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import ImageCopyBlock from "../../components/v2/ImageCopyBlock/ImageCopyBlock.component";
import PropertyFeaturesV3 from "../../components/v3/PropertyFeatures/PropertyFeatures.component";
import TestimonialsV3 from "../../components/v3/Testimonials/Testimonials.component";
import { populate } from "../../utils/populate";
import { parseStrapiSingleImage } from "../../utils/parseStrapiImages";
import GridList from "../../components/v2/GridList/GridList.component";

import AOS from "aos";
import "aos/dist/aos.css";
import authHeaders from "../../utils/strapiAuthHeaders";
import InstagramFeed from "../../components/v3/InstagramFeed/InstagramFeed.component";
import fetchInstagramRecentPosts from "../../utils/fetchInstagramRecentPosts";
import FullVideoHero from "../../components/v3/FullVideoHero/FullVideoHero.component";
import Newsroom from "../../sections/Newsroom/Newsroom.component";
import ModelSuitesV3 from "../../components/v3/ModelSuites/ModelSuites.component";
import PropertyMapV3 from "../../components/v3/PropertyMap/PropertyMap.component";
import FeaturedListings from "../../components/v3/FeaturedListingsz/FeaturedListings.component";
import SuiteDesignAndFeatures from "../../components/v3/SuiteDesignAndFeatures/SuiteDesignAndFeatures.component";

import ContactFormPopup from "../../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopup2025 from "../../components/v2/Contact/ContactPopup2025.component";
import ContactPopupTrigger from "../../components/v2/Contact/ContactPopupTrigger.component";

import HowardGrantFAQs from "../../static/property/howardgrant/faqs.json";
import HowardGrantListings from "../../static/property/howardgrant/listings.json";

const Property = ({
  popup,
  property,
  city,
  contactInfo,
  posts,
  testimonials,
  leasingSteps,
  featuredListings,
  contactUs,
  minmax,
  siblingProperties,
  instagramPosts,
}) => {
  const {
    meta,
    pageId,
    logos,
    propertySuite,
    modelSuites,
    name,
    address,
    features,
    listings,
    gallery,
    displayMap,
    map,
    orbit,
    contact,
    global,
    suiteDesignFeatures,
    suiteFinishFeatures,
    mapCopy,
    leasingCopy,
  } = property;

  const title = `${name} | Lépine Apartments`;
  const phoneNumber = contactInfo.info.phone;
  const phoneHref = `tel:${phoneNumber}`;

  const [navSecondarySticky, setNavSecondarySticky] = useState(false);

  const listingsPopupBuildingImage = baseUrl(
    listings?.popupImage.data.attributes.url,
  );

  const logoDark = baseUrl(logos.dark.data.attributes.url);
  const logoLight = baseUrl(logos.light.data.attributes.url);
  const logoMap = baseUrl(logos.markers.propertyPage.data.attributes.url);

  const [paramsSubmitted, setParamsSubmitted] = useState(false);
  const [showMeeting, setShowMeeting] = useState(false);
  const [contactPopupIsActive, setContactPopupIsActive] = useState(false);

  const [links, setLinks] = useState({
    listings: null,
    propertyFeatures: null,
    propertyMap: null,
    faq: null,
    contact: null,
  });

  const router = useRouter();

  const checkUrlParams = async () => {
    if (!paramsSubmitted && router.query.utm_source) {
      await submitUtmSource(router.query.id, router.query.utm_source);
      setParamsSubmitted(true);
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    contactPopupIsActive
      ? body.classList.add("noscroll")
      : body.classList.remove("noscroll");
  }, [contactPopupIsActive]);

  useEffect(() => {
    document.addEventListener("scroll", () =>
      window.scrollY > 1
        ? setNavSecondarySticky(true)
        : setNavSecondarySticky(false),
    );

    checkUrlParams();

    AOS.init({
      easing: "ease",
      once: true,
      offset: 0,
      duration: 600,
    });
  }, []);

  useEffect(() => {
    setNavSecondarySticky(false);
  }, [router.pathname]);

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

  const image = baseUrl(propertySuite?.image.image.data.attributes.url);

  const leasingStepsV2 = {
    header: leasingSteps.header,
    copy: leasingSteps.copy,
    steps: leasingSteps.steps.map((step) => step.item),
    image: parseStrapiSingleImage(leasingSteps.image),
  };

  const renderAvailabilityCopy = (availabilityCopy) => {
    if (!minmax.error) {
      switch (availabilityCopy) {
        case "none":
          return null;

        case "*sqft.min* to *sqft.max* apartments available starting at *price.min*":
          return `${minmax.sqft.min} sqft to ${minmax.sqft.max} sqft apartments available starting at $${minmax.price.min}`;

        default:
          return null;
      }
    } else return null;
  };

  const availabilityCopy = renderAvailabilityCopy(property.availabilityCopy);

  const logo = {
    dark: baseUrl(logos.dark.data.attributes.url),
    light: baseUrl(logos.light.data.attributes.url),
    map: baseUrl(logos.markers.propertyPage.data.attributes.url),
  };

  const currentTime = Date.now();
  const popupExpires = popup?.content?.expires
    ? Date.parse(popup?.content?.expires)
    : null;
  const popupExpired = currentTime > popupExpires;

  const contactBGImage = property?.hero?.content?.image?.data?.attributes?.url
    ? baseUrl(property.hero.content.image.data.attributes.url)
    : null;

  return (
    <div className={styles.propertyWrapper}>
      <Container page="propertyV2" theme={pageId}>
        <Head>
          <title>{meta?.title ? meta?.title : title}</title>
          {meta?.description && (
            <meta name="description" content={meta?.description} />
          )}
          {meta?.keywords && <meta name="keywords" content={meta?.keywords} />}
          {/* <Script type="text/javascript" async defer src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" /> */}

          <meta
            property="og:title"
            content={meta?.title ? meta?.title : title}
          />
          <meta
            property="og:image"
            content={baseUrl(property.hero.content.image.data.attributes.url)}
          />
        </Head>

        <NavV3
          links={links}
          navSecondarySticky={navSecondarySticky}
          logoDark={logoDark}
          logoLight={logoLight}
          pageId={pageId}
          current="communities"
          city={city}
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          contact={contactInfo}
          rentCopy="Rent Today"
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
          video={property.hero.content.video}
          availabilityCopy={availabilityCopy}
          bgImage={baseUrl(property.hero.content.image.data.attributes.url)}
          reverse
          featuredListingsLength={featuredListings.length}
          btnCopy="Find My Apartment"
          btnHref="#listings"
          logos={logo}
        />
        <NavSecondary
          links={links}
          v2
          sticky={navSecondarySticky}
          setNavSecondarySticky={setNavSecondarySticky}
          logo={logoLight}
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          blogPosts={posts.length}
          propertyNav
          rentCopy="Rent Today"
        />
        {propertySuite && (
          <ImageCopyBlock
            id="lifestyle"
            header="Upgrade Your Lifestyle"
            subtitle={`Make Your Home at ${property.name}`}
            copy={propertySuite?.copy}
            showcaseColSize={50}
            showcaseImage={image}
            showcaseHeight={100}
            copyColSize={50}
            btnCopy="Explore Your Options"
            btnHref="#listings"
            sp="sp"
          />
        )}
        {modelSuites && <ModelSuitesV3 items={modelSuites} />}
        {HowardGrantListings.length > 0 && (
          <FeaturedListings
            setContactPopupIsActive={setContactPopupIsActive}
            siblingProperties={siblingProperties}
            personas={global.listings.personas}
            listings={HowardGrantListings}
            content={listings}
            city={city}
            property={name}
            popupImage={listingsPopupBuildingImage}
            pageId={pageId}
            bgImage={baseUrl(property.hero.content.image.data.attributes.url)}
          />
        )}

        {suiteDesignFeatures && suiteFinishFeatures && (
          <SuiteDesignAndFeatures
            design={suiteDesignFeatures}
            features={suiteFinishFeatures}
          />
        )}
        {features && (
          <PropertyFeaturesV3
            features={features}
            copy={features.copy}
            amenities={features.amenities}
          />
        )}
        {gallery.length > 0 && (
          <PropertyGallery
            id="propertyGallery"
            images={parseGalleryImages(features.gallery)}
            lightbox
          />
        )}
        {displayMap && (
          <PropertyMapV3
            copy={mapCopy}
            logo={logoMap}
            zoom={15}
            city={city}
            coords={address.coords}
            items={map}
            pageId={pageId}
          />
        )}
        {/* {orbit && orbit.displayOrbit && <PropertyOrbit video={orbit.video} v3 />} */}
        {orbit?.images.length > 0 && (
          <PropertyGallery
            id="orbitGallery"
            images={parseGalleryImages(orbit.images)}
            lightbox
          />
        )}
        {instagramPosts.length > 0 && <InstagramFeed posts={instagramPosts} />}
        {HowardGrantFAQs.length > 0 && (
          <FAQ
            content={HowardGrantFAQs}
            bgImage={baseUrl(property.hero.content.image.data.attributes.url)}
            v2
          />
        )}
        {testimonials.length > 0 && (
          <TestimonialsV3 testimonials={testimonials} />
        )}
        {leasingStepsV2 && (
          <GridList
            type="peaceOfMind"
            id="peaceOfMind"
            propertyLeasingCopy={leasingCopy}
            image={leasingStepsV2.image}
            header={leasingStepsV2.header}
            copy={leasingStepsV2.copy}
            items={leasingStepsV2.steps}
            sp="sp"
          />
        )}
        {posts.length > 0 && (
          <Newsroom header="Latest News" posts={posts} newsroom />
        )}
        {/* {contact && 
                <ContactPopup2025
                    content={contactInfo}
                    type="form"
                    pageId={pageId}
                    portalId={contact.portalId}
                    goalName={listings.goalName}
                    formId={contact.formId}
                    bookNowURL={listings.bookNowURL}
                    showMeeting={showMeeting}
                    setShowMeeting={setShowMeeting}
                    showMeetingToggle
                    tourLocation={address.tourLocation}
                    phone={contactInfo.phone}
                    imageL={baseUrl(contactUs?.images?.data[0]?.attributes?.url)}
                    imageR={baseUrl(contactUs?.images?.data[1]?.attributes?.url)}
                />
            } */}

        {contact && (
          <div
            className="bigimage"
            id="contactform"
            data-page={pageId}
            style={
              contactBGImage && { backgroundImage: `url('${contactBGImage}')` }
            }
          >
            <div className="bigimage__content">
              <ContactPopup2025
                htmlFormId="hs-form-1"
                type="form"
                pageId={pageId}
                portalId={contact.portalId}
                goalName={listings.goalName}
                formId={contact.formId}
                phone={contactInfo.phone}
                contactPopupIsActive={contactPopupIsActive}
                setContactPopupIsActive={setContactPopupIsActive}
              />
            </div>
          </div>
        )}

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
            goalName={listings.goalName}
            formId={contact.formId}
            phone={contactInfo.phone}
            setContactPopupIsActive={setContactPopupIsActive}
          />
        </ContactFormPopup>

        <Footer socialLinks findMyApartment content={contactInfo} />
      </Container>
    </div>
  );
};

export async function getStaticProps(ctx) {
  let id = "howardgrant";

  const url = `${appUrl}/api/property?id=${id}`;
  const res = await fetch(url);
  const data = await res.json();

  const propertyGlobalUrl = `${appUrl}/api/propertyGlobal`;
  const propertyGlobalRes = await fetch(propertyGlobalUrl);
  const propertyGlobalData = await propertyGlobalRes.json();

  const indexUrl = `${apiUrl}/home?${populate}`;
  const indexRes = await fetch(indexUrl);
  const indexData = await indexRes.json();

  let featuredListingsData;
  const featuredListingsUrl = `${appUrl}/api/propertyListings?property=${id}&isFeatured=true`;
  const featuredListingsRes = await fetch(featuredListingsUrl, authHeaders);
  featuredListingsData = await featuredListingsRes.json();

  const propertyPosts = await fetchPropertyPosts(id);
  const leasingSteps = await fetchLeasingSteps();

  const testimonialsUrl = `${appUrl}/api/testimonials?property=${id}`;
  const testimonialsRes = await fetch(testimonialsUrl);
  const testimonialsData = await testimonialsRes.json();

  const propertyMinMaxUrl = `${apiUrl}/property-listings/minmax?property=${id}`;
  const propertyMinMaxRes = await fetch(propertyMinMaxUrl, authHeaders);
  const propertyMinMaxData = await propertyMinMaxRes.json();

  const siblingPropertyUrl = `${appUrl}/api/property/siblings?property=${id}`;
  const siblingPropertyRes = await fetch(siblingPropertyUrl, authHeaders);
  const siblingPropertyData = await siblingPropertyRes.json();

  const contactUrl = `${apiUrl}/contact?populate=deep`;
  const contactRes = await fetch(contactUrl);
  const contactData = await contactRes.json();

  const contactInfo = {
    info: contactData.data.attributes.info,
  };

  let popup;
  const popupUrl = data?.data[0]?.attributes?.popup?.url
    ? data?.data[0]?.attributes?.popup?.url
    : null;

  const instagramPosts = await fetchInstagramRecentPosts(15);

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
      type: data?.data[0]?.attributes?.popup?.collection,
    };
  } else {
    popup = null;
  }

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
        minmax: propertyMinMaxData,
        popup,
        property,
        city,
        contactInfo,
        posts: propertyPosts,
        testimonials: testimonialsData,
        contactUs: indexData.data.attributes.contactUs,
        leasingSteps,
        featuredListings: featuredListingsData,
        siblingProperties:
          siblingPropertyData[0]?.properties?.length > 0
            ? siblingPropertyData[0].properties
            : [],
        instagramPosts: instagramPosts.data,
      },
      revalidate: 1,
    };
  }
}

export default Property;
