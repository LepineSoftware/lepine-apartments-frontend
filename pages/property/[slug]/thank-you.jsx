import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "../../../styles/pages/propertyThankYou.module.scss";

import Container from "../../../components/Container.component";
import NavV3 from "../../../components/v2/NavV3/NavV3.component";
import Footer from "../../../sections/Footer.component";

import { apiUrl } from "../../../utils/apiUrl";
import { baseUrl } from "../../../utils/baseUrl";
import { populate } from "../../../utils/populate";
import { pageIdEquals } from "../../../utils/strapiFilters";

import thankYouProperties from "../../../static/property/thankYouProperties.json";

const PropertyThankYou = ({
  slug,
  brand,
  name,
  streetAddress,
  city,
  logo,
  contactInfo,
}) => {
  const router = useRouter();
  const phoneNumber = contactInfo?.info?.phone || null;
  const phoneHref = phoneNumber ? `tel:${phoneNumber}` : null;
  const propertyHref = `/property/${slug}`;

  useEffect(() => {
    if (!router.isReady) return;

    const params = { ...router.query, property: slug };
    delete params.slug;
    window.thankYouParams = params;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submitted", ...params });
  }, [router.isReady, router.query, slug]);

  return (
    <div className={styles.propertyThankYouWrapper}>
      <Container page="thankYou" theme={slug} brand={brand}>
        <Head>
          <title>{`Thank You | ${name} | Lépine Apartments`}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <NavV3
          v2
          pageId={slug}
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          contact={contactInfo}
          rentCopy="Rent Today"
        />

        <main className="propertyThankYou">
          <div className="propertyThankYou__content" data-aos="fade">
            {logo && (
              <img
                className="propertyThankYou__logo"
                src={logo}
                alt={`${name} logo`}
              />
            )}
            <h1 className="themeHeader">
              Thank You for Your Interest in {name}.
            </h1>
            <p>
              Your inquiry has been received. A member of our {name} leasing
              team will contact you shortly to discuss availability, pricing,
              and next steps.
            </p>
            {streetAddress && (
              <p className="propertyThankYou__address">
                {streetAddress}
                {city ? `, ${city}` : ""}
              </p>
            )}
            <div className="propertyThankYou__actions">
              <Link href={propertyHref}>
                <div className="btn themeBtn">Back to {name}</div>
              </Link>
              {phoneHref && (
                <a href={phoneHref} className="btn themeBtn">
                  Call {phoneNumber}
                </a>
              )}
            </div>
          </div>
        </main>

        <Footer socialLinks findMyApartment content={contactInfo} />
      </Container>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: thankYouProperties.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const config = thankYouProperties.find((p) => p.slug === slug);

  const propertyRes = await fetch(
    `${apiUrl}/properties?${pageIdEquals}${slug}&${populate}`,
  );
  const propertyData = await propertyRes.json();
  const property = propertyData?.data?.[0]?.attributes;

  if (!property) return { notFound: true, revalidate: 60 };

  const contactRes = await fetch(`${apiUrl}/contact?populate=deep`);
  const contactData = await contactRes.json();

  const logoUrl = property.logos?.dark?.data?.attributes?.url;

  return {
    props: {
      slug,
      brand: config?.brand || null,
      name: property.name,
      streetAddress: property.address?.streetAddress || null,
      city: property.address?.city?.data?.attributes?.name || null,
      logo: logoUrl ? baseUrl(logoUrl) : null,
      contactInfo: { info: contactData.data.attributes.info },
    },
    revalidate: 60,
  };
}

export default PropertyThankYou;
