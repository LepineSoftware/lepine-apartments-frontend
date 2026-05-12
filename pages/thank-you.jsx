import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "../styles/pages/thankyou.module.scss";

import Container from "../components/Container.component";
import NavV3 from "../components/v2/NavV3/NavV3.component";
import Footer from "../sections/Footer.component";

import contact from "../static/global/contact.json";

const ThankYou = () => {
  const router = useRouter();
  const phoneNumber = contact?.info?.phone || null;
  const phoneHref = phoneNumber ? `tel:${phoneNumber}` : null;

  useEffect(() => {
    if (!router.isReady) return;

    const params = { ...router.query };
    window.thankYouParams = params;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submitted", ...params });
  }, [router.isReady, router.query]);

  return (
    <div className={styles.thankYouWrapper}>
      <Container page="thankYou">
        <Head>
          <title>Thank You | Lépine Apartments</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <NavV3
          v2
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          contact={contact}
          rentCopy="Rent Today"
        />

        <main className="thankYou">
          <div className="thankYou__content" data-aos="fade">
            <h1 className="themeHeader">Thank You for Reaching Out.</h1>
            <p>
              Your inquiry has been received. A member of our leasing team will
              contact you shortly to discuss availability, pricing, and next
              steps.
            </p>
            <Link href="/">
              <div className="btn themeBtn">Back to Home</div>
            </Link>
          </div>
        </main>

        <Footer socialLinks findMyApartment content={contact} />
      </Container>
    </div>
  );
};

export default ThankYou;
