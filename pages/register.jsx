import styles from "../styles/pages/property2025.module.scss";

import { appUrl } from "../utils/appUrl";
import { apiUrl } from "../utils/apiUrl";

import Head from "next/head";
import Container from "../components/Container.component";

import { populate } from "../utils/populate";
import RegisterPopup from "../components/v2/Contact/RegisterPopup.component";

import Image from "next/image";
import Logo from "../assets/svg/lepine.svg";

const Property = ({ property, contactInfo }) => {
  const { pageId, contact } = property;

  return (
    <div className={styles.property2025Wrapper}>
      <Container page="propertyV2" theme={pageId} brand="2025">
        <Head>
          <title>Open House Registration | Lépine Apartments</title>
        </Head>

        <div className="registrationForm">
          <div className="registrationForm__logo">
            <Image src={Logo} alt="Lépine" height="87" width="288" />
          </div>

          <RegisterPopup
            htmlFormId="hs-form-1"
            type="form"
            pageId="register"
            portalId="22452018"
            goalName="oh_registration_form_submitted"
            formId="810cb9f4-0b2c-435b-86c0-e77cd625153d"
            phone={contactInfo.phone}
          />
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
        property,
        city,
        contactInfo,
        contactUs: indexData.data.attributes.contactUs,
      },
      revalidate: 1,
    };
  }
}

export default Property;
