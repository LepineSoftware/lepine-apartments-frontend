import Head from "next/head";
import Container from "../../components/Container.component";
import AboutSection from "../../sections/AboutSection.component";
import Footer from "../../sections/Footer.component";
import PropertyHero from "../../sections/PropertyHero.component";
import { apiUrl } from "../../utils/apiUrl";

import styles from "../../styles/pages/comingsoon.module.scss";

import PropertyGallery from "../../sections/PropertyGallery.component";
import PropertyListingsRegister from "../../components/PropertyListingsRegister.component";
import { baseUrl } from "../../utils/baseUrl";
import NavSecondary from "../../sections/NavSecondary.component";
import fetchComingSoons from "../../utils/fetchComingSoons";
import { parseGalleryImages } from "../../utils/parseGalleryImages";
import NavV3 from "../../components/v2/NavV3/NavV3.component";

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
        <PropertyListingsRegister
          portalId={registration.portalId}
          formId={registration.formId}
          content={{
            ...registration.content,
            header: "Register for René’s Court Updates",
            copy: "Join our priority list for exclusive updates and early leasing opportunities.",
          }}
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
  const id = "renescourt";
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
