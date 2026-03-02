import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Global Components
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import Footer from "../../sections/Footer.component";
import { apiUrl } from "../../utils/apiUrl";

// Page Styles
import s from "./discover.module.scss";

const DiscoverIndex = ({ contact, pages }) => {
  const phoneNumber = contact?.info?.phone || null;
  const phoneHref = `tel:${phoneNumber}`;

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <div className={`${s.relocateWrapper} ${s.indexBgBlack}`}>
      <Head>
        <title>Discover Lépine | Explore Lighter Living</title>
        <meta
          name="description"
          content="Explore our curated guides on relocating to the National Capital Region and the benefits of the Lépine resort-style lifestyle."
        />
      </Head>

      <NavV3
        v2
        phoneNumber={phoneNumber}
        phoneHref={phoneHref}
        contact={contact}
        rentCopy="Rent Today"
      />

      {/* FIXED 100VH BLURRED BACKGROUND */}
      <div className={s.fixedBackground}>
        <img
          src="https://lepine-storage.nyc3.digitaloceanspaces.com/8997c142f4ce02f21044dc1bd8449d61.jpg?key=0.3568363971904899"
          alt="Lépine Discovery Background"
          className={s.fixedBackground__img}
        />
        <div className={s.fixedBackground__overlay} />
      </div>

      {/* SCROLLABLE CONTENT LAYER */}
      <main className={s.indexMain}>
        <section className={`${s.hero} ${s.indexHero}`}>
          <div className={s.hero__content} data-aos="fade-up">
            <p className={s.subheading} style={{ color: "#fff", opacity: 0.8 }}>
              Knowledge Base
            </p>
            <h1 className={s.indexHero__title}>Lépine Discovery Hub</h1>
            <p className={s.indexHero__description}>
              Your guide to rightsizing, relocating, and reclaiming your time.
            </p>
          </div>
        </section>

        <section className={s.indexGridSection}>
          <div className={`${s.gridSection__grid} ${s.indexGrid}`}>
            {pages.map((page, i) => (
              <Link
                href={`/discover/${page.slug}`}
                key={page.slug}
                className={s.indexCardLink}
              >
                <div
                  className={s.discoveryCard}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className={s.discoveryCard__imageContainer}>
                    <img src={page.image} alt={page.title} />
                  </div>

                  <div className={s.discoveryCard__body}>
                    <span className={s.discoveryCard__label}>
                      Lighter Living Guide
                    </span>
                    <h3 className={s.discoveryCard__title}>{page.title}</h3>
                    <div className={s.discoveryCard__cta}>Read More →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Footer socialLinks findMyApartment content={contact} />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const dirPath = path.join(process.cwd(), "static/discover");
  const files = fs.readdirSync(dirPath);

  const pages = files
    .filter(
      (f) =>
        !fs.lstatSync(path.join(dirPath, f)).isDirectory() &&
        f.endsWith(".json"),
    )
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return {
        slug: file.replace(".json", ""),
        title:
          content.meta?.title?.split("|")[0].trim() ||
          file.replace(".json", ""),
        description:
          content.meta?.description?.substring(0, 150) + "..." ||
          "Explore this Lépine guide.",
        image:
          content.hero?.bgImage ||
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      };
    });

  const contactRes = await fetch(`${apiUrl}/contact?populate=deep`);
  const contactData = await contactRes.json();

  return {
    props: {
      contact: contactData.data.attributes,
      pages,
    },
    revalidate: 60,
  };
}

export default DiscoverIndex;
