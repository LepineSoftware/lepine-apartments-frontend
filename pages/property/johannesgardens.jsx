import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/pages/property2025.module.scss";

import { appUrl } from "../../utils/appUrl";
import { apiUrl } from "../../utils/apiUrl";
import fetchPropertyPosts from "../../utils/fetchPropertyPosts";

import Head from "next/head";
import { baseUrl } from "../../utils/baseUrl";
import Container from "../../components/Container.component";
import Footer from "../../sections/Footer.component";
import PageTop from "../../components/PageTop.component";

import { submitUtmSource } from "../../utils/gtag";
import fetchLeasingSteps from "../../utils/fetchLeasingSteps";
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import { populate } from "../../utils/populate";

import AOS from "aos";
import "aos/dist/aos.css";
import authHeaders from "../../utils/strapiAuthHeaders";
import listings40mcgill from "../../temp/40mcgill";
import InstagramFeed from "../../components/v3/InstagramFeed/InstagramFeed.component";
import fetchInstagramRecentPosts from "../../utils/fetchInstagramRecentPosts";
import KeyFeaturesSwiper from "../../components/v3/KeyFeaturesSwiper/KeyFeaturesSwiper";
import ContentWrapper from "../../sections/ContentWrapper.component";
import FeaturedFloorplans from "../../components/v3/FeaturedFloorplans/FeaturedFloorplans.component";
import ContactFormPopup from "../../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopup2025 from "../../components/v2/Contact/ContactPopup2025.component";
import ContactPopupTrigger from "../../components/v2/Contact/ContactPopupTrigger.component";
import { ImageLoader } from "../../utils/imageLoader";
import Newsroom from "../../sections/Newsroom/Newsroom.component";

import Image from "next/image";
import ImageParallaxBar from "../../components/ImageParallaxBar.component";
import PropertyGallery from "../../sections/PropertyGallery.component";

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

  const [paramsSubmitted, setParamsSubmitted] = useState(false);

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
    checkUrlParams();

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

  useEffect(() => {
    const sections = ["hero", "welcome"];
    let current = 0;
    const init = document.getElementById("hero");
    let isScrolling = false;
    let disableScrolling = false;

    if (window.scrollY > 200) disableScrolling = true;

    !disableScrolling &&
      document.addEventListener("scroll", (e) => {
        if (!disableScrolling) {
          e.preventDefault();

          if (isScrolling) {
            return false;
          } else {
            isScrolling = true;

            // Scroll action happens
            if (current < sections.length - 1) {
              current = current + 1;
            } else {
              disableScrolling = true;
            }

            const scroll = document.getElementById(sections[current])?.offsetTop;

            window.scrollTo({
              top: scroll,
              behavior: "smooth",
            });

            setTimeout(() => {
              isScrolling = false;
              if (sections[current] === sections[sections.length - 1]) {
                disableScrolling = true;
              }
            }, 1000);
          }
        }
      });
  }, []);

  const floorplans = [
    {
      type: "main",
      name: "304",
      unitType: "2 Bed + 2 Bath + Balcony",
      sqft: 1157,
      description: `2-bedroom, 2-bathroom suite at Johanne’s Gardens by Lépine Apartments in Carleton Place. This elegant home features a bright open-concept living and dining area (14' x 22'), a modern kitchen (12' x 9'), two large bedrooms (12' x 16' and 11' x 20'), and your choice of a private balcony or a terrace up to 25' x 10'. Enjoy high-end finishes, 9-ft ceilings, oversized windows, in-suite laundry.`,
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/73fc8ba103980899def2bff9798425b7.png",
      pdf: "https://lepine-storage.nyc3.digitaloceanspaces.com/e33bd4001ebe3bd3b91ca6d72b01aa4f.pdf",
    },
    {
      type: "main",
      name: "118",
      unitType: "1 Bed + Office + Terrace",
      sqft: 942,
      description: `1-bedroom + office suite with a balcony or private terrace at Johanne’s Gardens by Lépine Apartments in Carleton Place. This open-concept home features a spacious living and dining area (13' x 22'), a modern kitchen (10' x 9'), a large bedroom (14' x 14'), a versatile office space (10' x 12'), and private outdoor space up to 23' x 10'. Designed with high-end finishes, 9-ft ceilings, and oversized windows, plus the convenience of in-suite laundry.`,
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/f2d23c17e9c4dc4318e9ab953fd14c70.png",
      pdf: "https://lepine-storage.nyc3.digitaloceanspaces.com/0c987d0de1b00338e5b5f16505f4be76.pdf",
    },
    {
      type: "sub",
      name: "101 - 401, 122 - 422",
      unitType: "2 Bed + 2 Bath + Office – Balcony or Terrace",
      sqft: 1294,
      description: `Spacious 2-bedroom + office, 2-bathroom suites at Lépine Apartments in Carleton Place, featuring balcony or terrace options. Enjoy open-concept layouts with high-end finishes, a modern kitchen, 9-ft ceilings, oversized windows, and in-suite laundry.`,
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/19600c794c8c4a9ed07729171cc04479.png",
      pdf: "https://lepine-storage.nyc3.digitaloceanspaces.com/c62b888b21cd705dd18be29c3cc25097.pdf",
    },
    {
      type: "sub",
      name: "102 - 402, 123 - 423",
      unitType: "2 Bed + 2 Bath + Office – Balcony or Terrace",
      sqft: 1294,
      description: `Spacious 2-bedroom + office, 2-bathroom suites at Lépine Apartments in Carleton Place, featuring balcony or terrace options. Enjoy open-concept layouts with high-end finishes, a modern kitchen, 9-ft ceilings, oversized windows, and in-suite laundry.`,
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/daaeb2ca86a19ebac37baf5ed60f80c0.png",
      pdf: "https://lepine-storage.nyc3.digitaloceanspaces.com/496b7e01924183a6b67d3c11d49b2780.pdf",
    },
    {
      type: "sub",
      name: "121, 221, 321, 421",
      unitType: "2 Bed + 2 Bath – Balcony or Terrace",
      sqft: 1154,
      description: `2-bedroom, 2-bathroom suite at Johanne’s Gardens by Lépine Apartments in Carleton Place. Featuring an open-concept living and dining area (13' x 22'), a modern kitchen (12' x 9'), two oversized bedrooms (12' x 16' and 11' x 20'), and private outdoor space with balcony or terrace options up to 25' x 10'. Enjoy high-end finishes, 9-ft ceilings, natural light, and the convenience of in-suite laundry.`,
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/b2549f98defb33e0862257f45e9f7af9.png",
      pdf: "https://lepine-storage.nyc3.digitaloceanspaces.com/3918f8719170a373179f56cfc22d2e33.pdf",
    },
    {
      type: "sub",
      name: "207, 307, 407",
      unitType: "1 Bed + Balcony",
      sqft: 830,
      description: `1-bedroom suite with a private 13' x 7' balcony at Johanne's Gardens by Lépine Apartments in Carleton Place. Featuring an open-concept living and dining area (14' x 20'), a modern kitchen (9' x 11'), a large bedroom (13' x 13'), and an elegant bathroom, this home offers comfort, natural light, and thoughtful design.`,
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/daaeb2ca86a19ebac37baf5ed60f80c0.png",
      pdf: "https://lepine-storage.nyc3.digitaloceanspaces.com/dda683902e64d55745915d4194d7ce3b.pdf",
    },
  ];

  const keyFeatures = [
    {
      type: "image",
      header: "A History of Excellence",
      copy: "Rooted in a legacy dating back to Montreal’s founding, the Lépine family has always pursued opportunity and progress. As a family-owned apartment development and property management company, we have spent the past 70 years pioneering multi-family real estate, and opening new rental markets across Eastern Ontario.<br/><br/>Lépine has set a new standard for sophisticated rental living – blending quality craftsmanship, elegant design, and modern convenience. Our resort-style rental apartment communities in Ottawa, Carleton Place, Renfrew, and Smiths Falls are designed with sustainability and accessibility in mind, offering carefree living in the neighbourhoods you know and love.",
      url: "https://lepine-storage.nyc3.digitaloceanspaces.com/3a4f7a317b49a8ce594da434d1583c67.jpg",
    },
    {
      type: "image",
      header: "The Perfect Blend of Location and Lifestyle",
      copy: `This Lépine community is ideally located in the charming and historic town of Carleton Place, offering a perfect blend of small-town tranquility and modern convenience. With scenic walking trails, boutique shopping, and waterfront dining just moments away, everything you need is within easy reach.<br/><br/>
              Enjoy a stroll along the Mississippi River, explore local cafés and markets, or take advantage of nearby parks and recreation. With convenient highway access, Ottawa is just a short drive away, allowing you to stay connected while embracing a relaxed, resort-style lifestyle. Carleton Place isn’t just a location – it’s a community where comfort, connection, and quality living come together.`,
      url: "https://lepine-storage.nyc3.digitaloceanspaces.com/aa7479f1a4a897574720da9125f036cb.jpg",
    },
    {
      type: "image",
      header: "A Commitment to Sustainability",
      copy: "Sustainability is at the heart of Lépine Apartments, where every element is designed to reduce energy consumption while enhancing comfort and efficiency. The building is illuminated with high-efficiency LED lighting, ensuring bright and sustainable common spaces. Advanced central heating and cooling systems provide year-round climate control, while spray-foam insulation and zero air leakage optimize energy performance.<br/><br>With high-performance insulated walls, windows, and roofing, the building maintains consistent temperatures while minimizing heating and cooling demands. Each suite is equipped with electrical and water submetering, allowing residents to monitor and manage their energy use efficiently. A comprehensive waste recycling program further supports responsible environmental practices, ensuring Lépine Apartments remains a sustainable and environmentally conscious community.",
      url: "https://lepine-storage.nyc3.digitaloceanspaces.com/5125b5e81c05186af8ce56efb1344c44.jpg",
    },
    {
      type: "image",
      header: "Designed for Accessibility",
      copy: "At Lépine Apartments inclusivity and barrier-free living are fundamental, ensuring that residents of all abilities can navigate the community with ease. Barrier-free entryways and wide doorways provide seamless mobility throughout the building, while accessible common areas, including the lobby, fitness centre, and social spaces, promote comfort and independence. Elevator access to all floors ensures that every resident can move freely, with spacious designs accommodating wheelchairs and mobility aids. Select suites feature adaptive layouts,",
      url: "https://lepine-storage.nyc3.digitaloceanspaces.com/61b29919be5c1c01587e6966d0277b10.jpg",
    },
    {
      type: "image",
      header: "Built for Lasting Comfort",
      copy: "At Lépine Apartments, superior craftsmanship and high-quality materials ensure a safe, quiet, and comfortable living environment. Our reinforced concrete frame construction provides durability, while acoustically insulated slabs and walls enhance privacy and minimize noise between suites.<br/><br/>Fire safety is a top priority, with modern sprinkler systems, fire-resistant construction, and smoke alarms in every suite. Thoughtful insulation exceeds industry standards, ensuring a home that is both energy-efficient and environmentally responsible. Each suite features 100% air compartmentalization and individual fresh air intakes, creating a healthier and more controlled indoor environment.",
      url: "https://lepine-storage.nyc3.digitaloceanspaces.com/d825396a8f0ea1d1b365cdd7fcf0b4b3.jpg",
    },
    {
      type: "image",
      header: "A Community Built on Style and Quality",
      copy: "At Lépine Apartments you’ll find more than just a home – you will become part of a thoughtfully designed community that blends elegance, comfort, and connection. Every detail has been carefully crafted to create a refined living experience, where timeless architecture meets modern convenience. Lépine’s commitment to quality and sustainability ensures that your home is built to last, offering both beauty and durability. From stylish interiors to serene outdoor spaces, Lépine Apartments is designed for those who appreciate superior craftsmanship and a lifestyle of ease. Welcome home.",
      url: "https://lepine-storage.nyc3.digitaloceanspaces.com/bc8b1d9c6cf52deaa93c1677d5c3e04c.jpg",
    },
    {
      type: "image",
      header: "Designed for Your Well-Being",
      copy: "Lépine Apartments in Carleton Place offers a thoughtfully curated selection of amenities designed to enhance comfort, convenience, and community living. Whether you are looking to relax, stay active, or connect with neighbours, every space has been crafted with your well-being in mind.",
      url: "https://lepine-storage.nyc3.digitaloceanspaces.com/c42766bdb241f5cb66e544afd63ff527.jpg",
    },
  ];

  const interiorGallery = [
    "https://lepine-storage.nyc3.digitaloceanspaces.com/6663a6cf0c69aa29a2512535ab4b55e5.jpg",
    "https://lepine-storage.nyc3.digitaloceanspaces.com/6f7935ae56b413e593f2891f9fc68f05.jpg",
    "https://lepine-storage.nyc3.digitaloceanspaces.com/6abb71b41d2e69184c54586881c123c7.jpg",
    "https://lepine-storage.nyc3.digitaloceanspaces.com/ffd637ec3b6eefd18949f510af779050.jpg",
    "https://lepine-storage.nyc3.digitaloceanspaces.com/88de34a7941ae2767258378282841059.jpg",
    "https://lepine-storage.nyc3.digitaloceanspaces.com/1e13dfc5a63232fa93baa9c391a1db2e.jpg",
    "https://lepine-storage.nyc3.digitaloceanspaces.com/a065595e71f67764b30988893d527012.jpg",
  ];

  const SuiteFeatures = () => {
    const content = {
      header: "Inspired Design for a Modern Lifestyle",
      copy: `Each suite at Lépine Apartments is thoughtfully crafted to combine
            elegance, comfort, and functionality, creating a refined living
            space that supports a modern and active lifestyle. Featuring
            open-concept layouts, high-end finishes, and energy-efficient
            technology, these suites are designed for effortless living, with
            spacious interiors, natural light, and thoughtful details that
            enhance everyday convenience. Whether you’re working from home,
            entertaining guests, or enjoying a quiet evening, your suite is
            designed to meet your needs in style and comfort.`,
      items: [
        `Open-concept layouts with space for home offices in select suites`,
        `Barrier-free accessible design in select suites for enhanced mobility`,
        `Minimum 9-foot high ceilings in living areas for a bright, airy feel`,
        `8-foot high ceilings in bedrooms for cozy, comfortable spaces`,
        `Oversized entrance and interior doors for accessibility and ease of movement`,
        `Acoustically insulated panoramic windows with casements, allowing for natural light and noise reduction`,
        `Energy-efficient technology, including solar panels to reduce environmental impact`,
        `Window coverings included for privacy and convenience`,
        `Under mount kitchen sinks with spray faucets for a sleek and functional design`,
        `Acrylic one-piece bath module with grab bars and curved shower rod for safety and comfort`,
        `60-inch walk-in showers in select suites for easy accessibility`,
        `Ceiling-mounted electrical outlets in bedrooms for seamless organization`,
      ],
    };

    return (
      <section className="suiteFeatures2025 sp-top">
        <ContentWrapper cssClass="suiteFeatures2025__content" size="xl">
          <h2 className="suiteFeatures2025__title themeHeader">
            {content.header}
          </h2>

          <p className="suiteFeatures2025__subtitle">{content.copy}</p>

          <div className="suiteFeatures2025__list">
            <h3 className="themeHeader">Suite Features</h3>

            <ul>
              {content.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="suiteFeatures2025__image">
            {ImageLoader(
              "https://lepine-storage.nyc3.digitaloceanspaces.com/563c57781067ad4e49c809824f95a022.png",
              "",
              "",
              400,
              400,
              0.1,
            )}
          </div>
        </ContentWrapper>
      </section>
    );
  };

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

        <div className="jgHero">
          <div className="jgHero__image">
            {ImageLoader(
              "https://lepine-storage.nyc3.digitaloceanspaces.com/3a4f7a317b49a8ce594da434d1583c67.jpg",
              "",
              "",
              1000,
              1000,
              0.1,
            )}
          </div>

          <div className="jgHero__logo">
            <Image
              src="https://lepine-storage.nyc3.digitaloceanspaces.com/179df4c242f6adeb1be8c5034e208c24.svg"
              alt=""
              height={233}
              width={574}
              data-aos="fade"
            />
            <h4 data-aos="fade">277 Coleman Street, Carleton Place</h4>
            <a className="btn themeBtn" href="#welcome" data-aos="fade-up">
              Learn More
            </a>
          </div>
        </div>

        <div className="welcome" id="welcome" data-page="johannesgardens2">
          <div className="welcome__wrapper sp" data-page="johannesgardens2">
            <div className="contentWrapper welcome__content" data-wrapper="xl">
              <h2
                className="themeHeader"
                data-aos="fade-right"
                data-aos-delay="50"
              >
                Experience Refined Living at Lépine Apartments in Carleton Place
              </h2>

              <div
                className="welcome__row"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                {/* <div className="welcome__row--image">
                {ImageLoader('https://lepine-storage.nyc3.digitaloceanspaces.com/3a4f7a317b49a8ce594da434d1583c67.jpg', '', '', 400, 400, 0.1)}
              </div> */}

                <div className="welcome__row--copy">
                  <p>
                    Welcome to Lépine Apartments in Carleton Place, a premier
                    resort-style community, where timeless elegance meets modern
                    convenience. Inspired by Lépine’s legacy of excellence, this
                    community offers an exceptional living experience in a
                    serene and picturesque setting.
                  </p>
                  <p>
                    This four-storey residence features 222 thoughtfully
                    designed suites with spacious layouts, quality finishes, and
                    abundant natural light. Choose from one, two, and
                    three-bedroom suites and enjoy premium amenities, including
                    a state-of-the-art fitness centre, saltwater pool, yoga
                    studio, and beautifully landscaped outdoor spaces.
                  </p>
                </div>
              </div>

              <div
                className="welcome__row"
                data-aos="fade-right"
                data-aos-delay="150"
              >
                {/* <div className="welcome__row--image">
                                    {ImageLoader('https://lepine-storage.nyc3.digitaloceanspaces.com/3a4f7a317b49a8ce594da434d1583c67.jpg', '', '', 400, 400, 0.1)}
                                </div> */}

                <div className="welcome__row--copy">
                  <p>
                    Ideally located in the heart of Carleton Place, Lépine
                    Apartments places you moments from scenic walking trails,
                    charming local shops, and waterfront dining. With easy
                    access to Ottawa, you can enjoy small-town charm with
                    big-city convenience.
                  </p>
                  <p>
                    Lépine Apartments is not just a place to live – it’s a
                    destination where comfort, community, and sophisticated
                    living come together to create an unparalleled lifestyle.
                  </p>
                </div>
              </div>

              <div
                className="btn themeBtn"
                data-aos="fade-up"
                data-aos-delay="500"
                onClick={() => setContactPopupIsActive(true)}
              >
                Apply Now
              </div>
            </div>
          </div>
        </div>

        {/* <ImageParallaxBar image="https://lepine-storage.nyc3.digitaloceanspaces.com/96e1ee3a122b1866878c43a357c923ab.jpg" /> */}
        <ImageParallaxBar image="https://lepine-storage.nyc3.digitaloceanspaces.com/e6168b9b0dcd2adcc565a258cdb0f9f9.jpg" />

        <FeaturedFloorplans
          items={floorplans}
          contactPopupIsActive={contactPopupIsActive}
          setContactPopupIsActive={setContactPopupIsActive}
        />

        <ImageParallaxBar image="https://lepine-storage.nyc3.digitaloceanspaces.com/6663a6cf0c69aa29a2512535ab4b55e5.jpg" />

        <SuiteFeatures />

        <section style={{ margin: "50px 0" }}>
          {interiorGallery.length > 0 && (
            <PropertyGallery
              id="interiorGallery"
              images={interiorGallery}
              lightbox
            />
          )}
        </section>

        <KeyFeaturesSwiper items={keyFeatures} />

        {posts.length > 0 && (
          <Newsroom header="Latest News" posts={posts} newsroom />
        )}

        <div className="bigimage" id="contactform" data-page="johannesgardens">
          <div className="bigimage__content">
            <ContactPopup2025
              type="form"
              htmlFormId="hs-form-1"
              pageId={pageId}
              portalId={contact.portalId}
              goalName="johannesgardens_property_form_submitted"
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
            goalName="johannesgardens_property_form_submitted"
            formId={contact.formId}
            phone={contactInfo.phone}
            setContactPopupIsActive={setContactPopupIsActive}
          />
        </ContactFormPopup>

        {instagramPosts?.length > 0 && <InstagramFeed posts={instagramPosts} />}

        <Footer findMyApartment content={contactInfo} />
      </Container>
    </div>
  );
};

export async function getStaticProps(ctx) {
  const id = "johannesgardens";

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

  const propertyPosts = await fetchPropertyPosts(id);
  const leasingSteps = await fetchLeasingSteps();

  const testimonialsUrl = `${appUrl}/api/testimonials?property=${id}`;
  const testimonialsRes = await fetch(testimonialsUrl);
  const testimonialsData = await testimonialsRes.json();

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
        instagramPosts: instagramPosts.data? instagramPosts.data: null,
      },
      revalidate: 1,
    };
  }
}

export default Property;
