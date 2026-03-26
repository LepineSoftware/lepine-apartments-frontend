import styles from "../styles/pages/property2025.module.scss";

import { appUrl } from "../utils/appUrl";
import { apiUrl } from "../utils/apiUrl";
import fetchPropertyPosts from "../utils/fetchPropertyPosts";

import Head from "next/head";
import Container from "../components/Container.component";

import { populate } from "../utils/populate";

import fetchInstagramRecentPosts from "../utils/fetchInstagramRecentPosts";
import ContactFormPopup from "../components/v3/ContactFormPopup/ContactFormPopup.component";
import ContactPopup2025 from "../components/v2/Contact/ContactPopup2025.component";

const Property = ({ property, contactInfo }) => {
  const { pageId, contact } = property;

  return (
    <div className={styles.property2025Wrapper}>
      <Container page="propertyV2" theme={pageId} brand="2025">
        <Head>
          <title>Open House Registration | Lépine Apartments</title>
        </Head>

        <div className="bigimage" id="contactform" data-page="carresaintlouis">
          <div className="bigimage__content">
            <ContactPopup2025
              htmlFormId="hs-form-1"
              type="form"
              pageId={pageId}
              portalId={contact.portalId}
              goalName="oh_registration_form_submitted"
              formId={contact.formId}
              phone={contactInfo.phone}
            />
          </div>
        </div>
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
        instagramPosts: instagramPosts.data,
      },
      revalidate: 1,
    };
  }
}

export default Property;
