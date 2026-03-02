import { useEffect, useState } from "react";

import styles from "../../styles/pages/commercial.module.scss";

import { appUrl } from "../../utils/appUrl";
import { apiUrl } from "../../utils/apiUrl";

import Head from "next/head";
import { baseUrl } from "../../utils/baseUrl";
import Container from "../../components/Container.component";
import NavSecondary from "../../sections/NavSecondary.component";
import Footer from "../../sections/Footer.component";
import PageTop from "../../components/PageTop.component";

import NavV3 from "../../components/v2/NavV3/NavV3.component";
import ImageCopyBlock from "../../components/v2/ImageCopyBlock/ImageCopyBlock.component";
import PropertyFeaturesV3 from "../../components/v3/PropertyFeatures/PropertyFeatures.component";
import { populate } from "../../utils/populate";

import AOS from "aos";
import "aos/dist/aos.css";
import authHeaders from "../../utils/strapiAuthHeaders";
import listings40mcgill from "../../temp/40mcgill";
import CommercialListingsContainer from "../../components/v3/FeaturedListingsz/CommercialListingsContainer.component";
import UnitSpecifications from "./components/UnitSpecifications/UnitSpecifications.component";
import ContactCommercial from "../../components/v2/Contact/ContactCommercial.component";
import { ImageLoader } from "../../utils/imageLoader";
import Link from "next/link";

import ScrollArrow from "../../assets/svg/ScrollArrow.svg";

const Commercial = ({ popup, property, city, contactInfo, contactUs }) => {
  const { meta, pageId, features, listings, contact } = property;

  const title = `16 New Commercial Spaces for Lease in Kanata, ON | Les Boutiques at Carré Saint Louis`;
  const phoneNumber = contactInfo.info.phone;
  const phoneHref = `tel:${phoneNumber}`;

  const [navSecondarySticky, setNavSecondarySticky] = useState(false);

  const logoDark =
    "https://lepine-storage.nyc3.digitaloceanspaces.com/b30cf55524ebcf6333485025867fc9ca.svg";
  const logoLight =
    "https://lepine-storage.nyc3.digitaloceanspaces.com/fa0f3a8aa681b90fbf0d6d5912ad4b83.svg";

  const [links, setLinks] = useState({
    floorplans: null,
    keyFeatures: null,
    unitSpecifications: null,
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
    document.addEventListener("scroll", () =>
      window.scrollY > 1
        ? setNavSecondarySticky(true)
        : setNavSecondarySticky(false),
    );

    AOS.init({
      easing: "ease",
      once: true,
      offset: 0,
      duration: 600,
    });
  }, []);

  useEffect(() => {
    const links = {
      floorplans: document.getElementById("listings") ? "#listings" : null,
      keyFeatures: document.getElementById("propertyFeatures")
        ? "#propertyFeatures"
        : null,
      unitSpecifications: document.getElementById("unitSpecifications")
        ? "#unitSpecifications"
        : null,
      contact: document.getElementById("contact") ? "#contact" : null,
    };

    setLinks(links);
  }, []);

  const logo = {
    dark: "https://lepine-storage.nyc3.digitaloceanspaces.com/b30cf55524ebcf6333485025867fc9ca.svg",
    light:
      "https://lepine-storage.nyc3.digitaloceanspaces.com/fa0f3a8aa681b90fbf0d6d5912ad4b83.svg",
  };

  const currentTime = Date.now();
  const popupExpires = popup?.content?.expires
    ? Date.parse(popup?.content?.expires)
    : null;
  const popupExpired = currentTime > popupExpires;

  const aboutCopy = `Construction is underway! Don't miss your chance to secure your spot in this vibrant retail destination. Located at 1050 Canadian Shield in Kanata, Les Boutiques at Carré Saint Louis offers a unique opportunity for businesses to thrive while providing residents with the local, high-quality shopping experiences they desire. This exceptional mixed-use development by Lépine blends luxurious living with prime commercial spaces - perfect variety of businesses-including convenience stores, restaurants, personal services, and medical clinics. Designed with a chic European villa aesthetic, Les Boutiques features elegant interlock terraces and striking blue canopies over the front entrance retail spaces, enhancing its appeal as a sophisticated setting for your business to thrive.`;

  const aboutImage =
    "https://lepine-storage.nyc3.digitaloceanspaces.com/b0821f37fb14ad3ae0d19762c83fc856.jpg";

  const keyFeaturesCopy =
    "Position your business for success at Les Boutiques at Carré Saint Louis - a premier retail destination in Ottawa's thriving marketplace. Join a community that values luxury and convenience and tap into the growing demand for unique, high-quality retail experiences.";

  const commercialListings = [
    {
      leased: false,
      title: "C001",
      unit: "1A",
      sqft: 778,
      dim1: 52,
      dim2: 15,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0011A.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C001-1A.pdf",
    },
    {
      group: 1,
      leased: false,
      title: "C001",
      unit: "1B",
      sqft: 1333,
      dim1: 24,
      dim2: 55,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0011B.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C001-1B.pdf",
    },
    {
      group: 1,
      leased: false,
      title: "C001",
      unit: "1C",
      sqft: 1040,
      dim1: 80,
      dim2: 13,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0011C.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C001-1C.pdf",
    },
    {
      group: 1,
      leased: false,
      title: "C001",
      unit: "1D",
      sqft: 1059,
      dim1: 37,
      dim2: 28,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0011D.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C001-1D.pdf",
    },
    {
      group: 2,
      leased: true,
      title: "C002",
      unit: "2A",
      sqft: 537,
      dim1: 36,
      dim2: 15,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0022A.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C002-2A.pdf",
    },
    {
      group: 2,
      leased: true,
      title: "C002",
      unit: "2B",
      sqft: 405,
      dim1: 36,
      dim2: 11,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0022B.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C002-2B.pdf",
    },
    {
      group: 3,
      leased: true,
      title: "C003",
      unit: "3A",
      sqft: 550,
      dim1: 36,
      dim2: 15,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0033A.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C003-3A.pdf",
    },
    {
      group: 3,
      leased: true,
      title: "C003",
      unit: "3B",
      sqft: 296,
      dim1: 36,
      dim2: 8,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0033B.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C003-3B.pdf",
    },
    {
      group: 4,
      leased: true,
      title: "C004",
      unit: "4A",
      sqft: 454,
      dim1: 45,
      dim2: 10,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0044A.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C004-4A.pdf",
    },
    {
      group: 4,
      leased: true,
      title: "C004",
      unit: "4B",
      sqft: 577,
      dim1: 44,
      dim2: 13,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0044B.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C004-4B.pdf",
    },
    {
      group: 4,
      leased: true,
      title: "C004",
      unit: "4C",
      sqft: 577,
      dim1: 44,
      dim2: 13,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0044C.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C004-4C.pdf",
    },
    {
      group: 4,
      leased: true,
      title: "C004",
      unit: "4D",
      sqft: 777,
      dim1: 44,
      dim2: 18,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0044D.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C004-4D.pdf",
    },
    {
      group: 5,
      leased: true,
      title: "C005",
      unit: "5A",
      sqft: 215,
      dim1: 14,
      dim2: 13,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0055A.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C005-5A.pdf",
    },
    {
      group: 5,
      leased: true,
      title: "C005",
      unit: "5B",
      sqft: 420,
      dim1: 35,
      dim2: 10,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0055B.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C005-5B.pdf",
    },
    {
      group: 5,
      leased: true,
      title: "C005",
      unit: "5C",
      sqft: 506,
      dim1: 12,
      dim2: 39,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0055C.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C005-5C.pdf",
    },
    {
      group: 5,
      leased: true,
      title: "C005",
      unit: "5D",
      sqft: 517,
      dim1: 42,
      dim2: 11,
      available: "Fall 2026",
      description: "P1 Level Floor",
      image:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/floorplans/C0055D.png",
      pdf: "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/pdf/Les_Boutiques_Campanale_Lepine_Unit_C005-5D.pdf",
    },
  ];

  const commercialAmenities = [
    {
      cardImage:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/efccb0dacff5990149c51b84364ad921.jpg",
      header: "Customizable Retail Spaces",
      copy: "Brand new, mixed-use building currently under construction, featuring customizable retail spaces ranging from 200 to over 1,300 sq. ft., with options to combine spaces to suit diverse business needs.",
      type: "commercial",
    },
    {
      cardImage:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/9790580d71000cb198f1ac04a764dfe7.png",
      header: "Prime Location in Kanata",
      copy: "Prime location in Kanata's Town Centre, surrounded by over 2,000 multi-residential units and single-family homes, ensuring consistent foot traffic.",
      type: "commercial",
    },
    {
      cardImage:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/641a281b86c3a7bc7abf5e0b9d7a9d4a.jpg",
      header: "Exclusive Resident Access",
      copy: "Serve and network with 236 on-site residents enjoying luxury amenities, including a gym, saltwater pool, lounge, and party room.",
      type: "commercial",
    },
    {
      cardImage:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/b0821f37fb14ad3ae0d19762c83fc856.jpg",
      header: "High-Visibility Storefronts",
      copy: "High-visibility storefronts with large windows, abundant natural light, and outdoor terraces elevate your brand's presence in a vibrant shopping district.",
      type: "commercial",
    },
    {
      cardImage:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/b0821f37fb14ad3ae0d19762c83fc856.jpg",
      header: "Convenient Parking Options",
      copy: "Ample street and underground parking options for easy accessibility.",
      type: "commercial",
    },
    {
      cardImage:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/772116d69a903653ba4e564af189f57c.jpg",
      header: "Eco-Friendly Design",
      copy: "Built to high environmental standards, combining modern aesthetics with eco-friendly features.",
      type: "commercial",
    },
    {
      cardImage:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/3399d3bfd80ae64d95d1a93f6dd52d4b.jpg",
      header: "Thriving Market Potential",
      copy: "Growth opportunities for businesses looking to succeed in a dynamic, affluent community with an underserved customer base.",
      type: "commercial",
    },
  ];

  const featuredListingsPersonas = {
    images: [
      "https://lepine-storage.nyc3.digitaloceanspaces.com/e85c8555e6268784704e150c74e23923.jpg",
    ],
  };

  return (
    <div className={styles.commercialWrapper}>
      <Container page="propertyV2" theme="cslcommercial">
        <Head>
          <title>{title}</title>
          {meta?.description && (
            <meta name="description" content={meta?.description} />
          )}
          {meta?.keywords && <meta name="keywords" content={meta?.keywords} />}
        </Head>

        <NavV3
          links={links}
          navSecondarySticky={true}
          logoDark={logoDark}
          logoLight={logoLight}
          pageId={pageId}
          city={city}
          phoneNumber="613-290-2262"
          phoneHref="tel:6132902262"
          contact={contactInfo}
          rentCopy="Lease Commercial Today"
        />
        <PageTop />
        {/* <FullVideoHero
                id="hero"
                type="property"
                // header={property.hero.header}
                // subtitle="1050 Canadian Shield, Kanata"
                copy={property.hero.description}
                showcaseColSize={50}
                showcaseHeight={100}
                copyColSize={50}
                cornerImageLeft
                video="https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/CSLCommercial480.mp4"
                // bgImage="https://lepine-storage.nyc3.digitaloceanspaces.com/be8738371abaef9f0d0c37d932cf3078.jpg"
                reverse
                featuredListingsLength={featuredListings.length}
                // btnCopy="Inquire Now"
                // btnHref="#contact"
                // logos={logo}
            /> */}

        <div className="csl__hero">
          <video
            autoPlay
            playsInline
            muted
            loop
            src="https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/CSLCommercial720.mp4"
          ></video>

          <Link aria-label="" href="#connecting" className="videoHero__scroll">
            {ImageLoader(ScrollArrow.src, "", "", 50, 50, 0.1)}
          </Link>
        </div>

        <NavSecondary
          links={links}
          v2
          sticky={navSecondarySticky}
          logo={logoLight}
          phoneNumber="613-290-2262"
          phoneHref="tel:6132902262"
          blogPosts={0}
          propertyNav
          rentCopy="Lease Commercial Today"
        />

        {/* <div style={{ height: '50px', width: '100% '}} /> */}

        {/* <ImageCopyBlock
                header="Connecting Business With Community"
                subtitle="Now Leasing Commercial for Spring 2026 Occupancy"
                copy={aboutCopy}
                showcaseColSize={50}
                // showcaseImage={aboutImage}
                // showcaseHeight={100}
                copyColSize={50}
                btnCopy="View Floorplans"
                btnHref="#listings"
                video="https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/CSLCommercial480.mp4"
                type="commercialvideo"
            /> */}

        <ImageCopyBlock
          id="connecting"
          header="Connecting Business With Community"
          subtitle="Commercial Spaces in Kanata Now Leasing for Spring 2026 Occupancy"
          copy={aboutCopy}
          showcaseColSize={50}
          showcaseImage={aboutImage}
          showcaseHeight={100}
          copyColSize={50}
          btnCopy="View Floorplans"
          btnHref="#listings"
          // sp="sp-bottom"
        />

        <div style={{ height: "50px", width: "100% " }} />

        {features && (
          <PropertyFeaturesV3
            id="keyFeatures"
            type="commercial"
            copy={keyFeaturesCopy}
            amenities={commercialAmenities}
          />
        )}

        {/* <section className="commercial__businessOpportunity">
                <ContentWrapper cssClass="commercial__businessOpportunity--container sp-bottom">
                    <h2>Discover Kanata&apos;s Best Business Opportunity</h2>

                    <h3>Experience the vibrancy of Kanata&apos;s Town Centre at Les Boutiques at Carré Saint Louis, located at 1050 Canadian Shield Avenue. Nestled in a thriving neighbourhood with over 2,000 homes, steps from major attractions, and unmatched accessibility, this dynamic location is ready to welcome your business.</h3>

                    <div className="commercial__businessOpportunity--video">
                        {ImageLoader("https://lepine-storage.nyc3.digitaloceanspaces.com/9afc40412f5412fb6a14b64bbb343269.jpg", '', '', 1500, 1500, 0.1)}
                    </div>
                </ContentWrapper>
            </section> */}

        <CommercialListingsContainer
          type="commercial"
          personas={featuredListingsPersonas}
          listings={commercialListings}
          bgImage="https://lepine-storage.nyc3.digitaloceanspaces.com/be8738371abaef9f0d0c37d932cf3078.jpg"
        />
        <UnitSpecifications id="unitSpecifications" />

        {contact && (
          <ContactCommercial
            content={contactInfo}
            type="form"
            pageId={pageId}
            portalId={contact.portalId}
            goalName={listings.goalName}
            formId={contact.formId}
            bookNowURL={listings.bookNowURL}
            showMeeting={false}
            phone={contactInfo.phone}
            imageL={baseUrl(contactUs?.images?.data[0]?.attributes?.url)}
            imageR={baseUrl(contactUs?.images?.data[1]?.attributes?.url)}
          />
        )}

        <Footer content={contactInfo} />
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  let id = "carresaintlouis";

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

  if (id === "40mcgill") {
    featuredListingsData = listings40mcgill;
  } else {
    const featuredListingsUrl = `${appUrl}/api/propertyListings?property=${id}&isFeatured=true`;
    const featuredListingsRes = await fetch(featuredListingsUrl, authHeaders);
    featuredListingsData = await featuredListingsRes.json();
  }

  const propertyMinMaxUrl = `${apiUrl}/property-listings/minmax?property=${id}`;
  const propertyMinMaxRes = await fetch(propertyMinMaxUrl, authHeaders);
  const propertyMinMaxData = await propertyMinMaxRes.json();

  const contactUrl = `${apiUrl}/contact?populate=deep`;
  const contactRes = await fetch(contactUrl);
  const contactData = await contactRes.json();

  const contactInfo = {
    info: contactData.data.attributes.info,
  };

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
        property,
        city,
        contactInfo,
        contactUs: indexData.data.attributes.contactUs,
        featuredListings: featuredListingsData,
      },
      revalidate: 1,
    };
  }
}

export default Commercial;
