import Head from "next/head";
import Container from "../../components/Container.component";
import AboutSection from "../../sections/AboutSection.component";
import Footer from "../../sections/Footer.component";
import PropertyHero from "../../sections/PropertyHero.component";
import { apiUrl } from "../../utils/apiUrl";
import { useState } from "react";

import styles from "../../styles/pages/comingsoon.module.scss";

import PropertyGallery from "../../sections/PropertyGallery.component";
import PropertyListingsRegister from "../../components/PropertyListingsRegister.component";
import { baseUrl } from "../../utils/baseUrl";
import NavSecondary from "../../sections/NavSecondary.component";
import fetchComingSoons from "../../utils/fetchComingSoons";
import { parseGalleryImages } from "../../utils/parseGalleryImages";
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import ContentWrapper from "../../sections/ContentWrapper.component";
import { ImageLoader } from "../../utils/imageLoader";

function ComingSoon({
  pageId,
  name,
  property,
  leasingTeam,
  sponsorships,
  sustainability,
  contact,
  gallery,
  registration,
  contactInfo,
  meta,
}) {
  const title = `${name} | Lépine Apartments`;
  const phoneNumber = contactInfo.info.phone;
  const phoneHref = `tel:${phoneNumber}`;

  const constructionTimelineItems = [
    {
      title: "Item 1",
      date: "January 2025",
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/2eb19851f225a9bed2ad5faa8fe73efc.png",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "https://www.lepineapartments.com/newsroom/johannes-gardens-officially-opens-in-carleton-place",
      current: false,
    },
    {
      title: "Item 2",
      date: "June 2025",
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/5bc484716809f3d5589d00987085437a.jpg?w=2560&h=900&q=10",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "https://www.lepineapartments.com/newsroom/johannes-gardens-officially-opens-in-carleton-place",
      current: false,
    },
    {
      title: "Item 3",
      date: "August 2025",
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/335126254334716e9f2a3df531b2196e.jpg",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "https://www.lepineapartments.com/newsroom/johannes-gardens-officially-opens-in-carleton-place",
      current: false,
    },
    {
      title: "Item 4",
      date: "November 2025",
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/5bc484716809f3d5589d00987085437a.jpg?w=2560&h=900&q=10",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "https://www.lepineapartments.com/newsroom/johannes-gardens-officially-opens-in-carleton-place",
      current: true,
    },
    {
      title: "Item 5",
      date: "February 2026",
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/4e50827838507a1eb44b4094726b1506.png",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "https://www.lepineapartments.com/newsroom/johannes-gardens-officially-opens-in-carleton-place",
      current: false,
    },
    {
      title: "Item 6",
      date: "June 2026",
      image:
        "https://lepine-storage.nyc3.digitaloceanspaces.com/5bc484716809f3d5589d00987085437a.jpg?w=2560&h=900&q=10",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "https://www.lepineapartments.com/newsroom/johannes-gardens-officially-opens-in-carleton-place",
      current: false,
    },
  ];

  const ConstructionTimeline = ({ items }) => {
    const initActive = items.findIndex((item) => item.current === true);
    const [active, setActive] = useState(initActive);

    const ConstructionItem = ({ item, i }) => {
      const classes = ["constructionTimeline__number"];
      i === active && classes.push("active");

      return (
        <div className={classes.join(" ")} key={i} onClick={() => setActive(i)}>
          <p>{i + 1}</p>
        </div>
      );
    };

    const ConstructionSlide = ({ item, i }) => {
      const classes = ["constructionTimeline__slide"];
      i === active && classes.push("active");

      return (
        <div className={classes.join(" ")} key={i}>
          <div className="constructionTimeline__slide--img">
            {ImageLoader(item.image, "", "", 1000, 1000, 0.1)}
          </div>

          <div className="constructionTimeline__slide--content">
            <h4 className="constructionTimeline__slide--title">{item.title}</h4>
            <p className="constructionTimeline__slide--date">{item.date}</p>
            <p className="constructionTimeline__slide--copy">{item.copy}</p>
          </div>
        </div>
      );
    };

    const handleTimelineChange = (direction, i) => {
      if (direction === "next") {
        if (active === constructionTimelineItems.length - 1) {
          setActive(0);
        } else setActive((prevState) => prevState + 1);
      } else {
        if (active === 0) {
          setActive(constructionTimelineItems.length - 1);
        } else setActive((prevState) => prevState - 1);
      }
    };

    const ConstructionTimelineBtn = ({ direction }) => {
      if (direction === "prev") {
        return (
          <button
            className="constructionTimeline__nav"
            data-direction="prev"
            onClick={() => handleTimelineChange("prev")}
          >
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.13 19.62"
            >
              <g isolation="isolate">
                <path
                  d="m11.57,1.31c.43.43.42,1.12-.02,1.54l-5.41,5.16h12.91c.6,0,1.08.48,1.08,1.08v1.44c0,.6-.48,1.08-1.08,1.08H6.14s5.41,5.16,5.41,5.16c.44.42.44,1.11.02,1.54l-1,1c-.42.42-1.1.42-1.52,0L.32,10.57c-.42-.42-.42-1.1,0-1.52L9.05.32c.42-.42,1.1-.42,1.52,0l1,1Z"
                  fill="#ffffff"
                />
              </g>
            </svg>
          </button>
        );
      } else {
        return (
          <button
            className="constructionTimeline__nav"
            data-direction="next"
            onClick={() => handleTimelineChange("next")}
          >
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.13 19.62"
            >
              <g isolation="isolate">
                <path
                  d="m11.57,1.31c.43.43.42,1.12-.02,1.54l-5.41,5.16h12.91c.6,0,1.08.48,1.08,1.08v1.44c0,.6-.48,1.08-1.08,1.08H6.14s5.41,5.16,5.41,5.16c.44.42.44,1.11.02,1.54l-1,1c-.42.42-1.1.42-1.52,0L.32,10.57c-.42-.42-.42-1.1,0-1.52L9.05.32c.42-.42,1.1-.42,1.52,0l1,1Z"
                  fill="#ffffff"
                />
              </g>
            </svg>
          </button>
        );
      }
    };

    return (
      <div className="constructionTimeline sp">
        <ContentWrapper size="xl" cssClass="constructionTimeline__container">
          <div className="constructionTimeline__title">
            <h2>Construction Timeline</h2>
          </div>

          <ConstructionTimelineBtn direction="prev" />
          <ConstructionTimelineBtn direction="next" />

          <div className="constructionTimeline__numbers--wrapper">
            <div className="constructionTimeline__numbers">
              {items.map((item, i) => (
                <ConstructionItem key={i} item={item} i={i} />
              ))}
              <div className="constructionTimeline__numbers--progress" />
            </div>
          </div>

          <div className="constructionTimeline__slides">
            {items.map((item, i) => (
              <ConstructionSlide key={i} item={item} i={i} />
            ))}
          </div>
        </ContentWrapper>
      </div>
    );
  };

  return (
    <div className={styles.comingSoonWrapper}>
      <Container page="comingsoon">
        <Head>
          <title>{title}</title>
          <title>{meta?.title ? meta?.title : title}</title>
          {meta?.description && (
            <meta name="description" content={meta?.description} />
          )}
          {meta?.keywords && <meta name="keywords" content={meta?.keywords} />}
        </Head>

        <NavV3
          pageId={pageId}
          current="communities"
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          contact={contactInfo}
          rentCopy="Rent Today"
        />
        {property.hero && (
          <PropertyHero property={property} type="comingSoon" />
        )}
        <NavSecondary phoneNumber={phoneNumber} phoneHref={phoneHref} />

        {/* <ConstructionTimeline items={constructionTimelineItems} /> */}

        <PropertyListingsRegister
          portalId={registration.portalId}
          formId={registration.formId}
          content={registration.content}
        />
        {sponsorships && (
          <AboutSection
            id="sponsorships"
            theme="light"
            content={sponsorships}
          />
        )}
        {gallery.length > 0 && (
          <PropertyGallery images={parseGalleryImages(gallery)} lightbox />
        )}
        {leasingTeam && (
          <AboutSection id="leasingTeam" theme="light" content={leasingTeam} />
        )}
        <Footer />
      </Container>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const id = "lesjardinsfrancoise";
  const comingSoonPages = await fetchComingSoons();
  const comingSoonPage = comingSoonPages.filter((page) => page.pageId === id);

  const contactUrl = `${apiUrl}/contact?populate=deep`;
  const contactRes = await fetch(contactUrl);
  const contactData = await contactRes.json();

  const contactInfo = {
    info: contactData.data.attributes.info,
  };

  const property = {
    hero: comingSoonPage[0].hero,
    address: comingSoonPage[0].address,
    name: comingSoonPage[0].name,
  };

  const registrationContent = {
    formId: comingSoonPage[0].registration.registrationFormId,
    portalId: comingSoonPage[0].registration.registrationPortalId,
    content: {
      header: comingSoonPage[0].registration.header,
      copy: comingSoonPage[0].registration.copy,
      backgroundImage: comingSoonPage[0].registration?.backgroundImage
        ? baseUrl(
            comingSoonPage[0].registration?.backgroundImage.data.attributes.url,
          )
        : null,
    },
  };

  return {
    props: {
      pageId: id,
      meta: comingSoonPage[0].meta,
      name: comingSoonPage[0].name,
      property,
      registration: registrationContent,
      sponsorships: comingSoonPage[0].design,
      leasingTeam: comingSoonPage[0].stylishAndModern,
      gallery: comingSoonPage[0].gallery,
      contactInfo,
    },
    revalidate: 1,
  };
}

export default ComingSoon;
