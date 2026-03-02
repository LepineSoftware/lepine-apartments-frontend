import Head from "next/head";
import { useEffect } from "react";

import styles from "../../styles/pages/careers.module.scss";

import Container from "../../components/Container.component";
import Footer from "../../sections/Footer.component";
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import InstagramFeed from "../../components/v3/InstagramFeed/InstagramFeed.component";
import Newsroom from "../../sections/Newsroom/Newsroom.component";

import AOS from "aos";
import "aos/dist/aos.css";
import fetchPosts from "../../utils/fetchPosts";
import fetchJobListings from "../../utils/fetchJobListings";
import fetchInstagramRecentPosts from "../../utils/fetchInstagramRecentPosts";
import ContentWrapper from "../../sections/ContentWrapper.component";
import LepineValues from "../../components/v3/LepineValues/LepineValues.component";
import { submitGAEvent } from "../../utils/submitGAEvent";
import CareerPerks from "../../components/v3/CareerPerks/CareerPerks.component";
import CareersJobListings from "../../components/v3/CareersJobListings/CareersJobListings.component";

import contact from "../../static/global/contact.json";

const Careers = ({ posts, instagramPosts, jobListings }) => {
  const phoneNumber = contact?.info?.phone ? contact?.info?.phone : null;
  const phoneHref = `tel:${phoneNumber}`;

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      duration: 300,
      disable: "mobile",
    });
  });

  return (
    <div className={styles.careersWrapper}>
      <Container page="careers">
        <Head>
          <title>Careers | Lépine Apartments</title>
        </Head>

        <NavV3
          v2
          phoneNumber={phoneNumber}
          phoneHref={phoneHref}
          contact={contact}
          rentCopy="Rent Today"
          current="careers"
        />

        <div className="careers__hero">
          <video
            src="https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/careers/LepineCareersCut2.mp4"
            preload="none"
            autoPlay
            playsInline
            muted
            loop
          />
          <ContentWrapper>
            <h1 data-aos="fade" data-aos-delay="">
              Work With Us
            </h1>
            <p data-aos="fade" data-aos-delay="250">
              Build your future with Lépine, a leader in residential
              development. We are always looking for passionate, driven
              individuals to join our team. At Lépine, you will find a
              supportive work environment, exciting projects, and opportunities
              to grow your career in construction, design, property management,
              and more. Join us in building Canada together – where quality
              meets community.
            </p>
            <a
              onClick={() => submitGAEvent("moved_to_dayforce")}
              data-aos="fade"
              data-aos-delay="500"
              href="https://jobs.dayforcehcm.com/en-CA/lepine/CANDIDATEPORTAL"
              rel="noreferrer"
              target="_blank"
              className="btn"
            >
              View Open Positions
            </a>
          </ContentWrapper>
        </div>
        <CareerPerks />

        {jobListings.length > 0 && <CareersJobListings jobs={jobListings} />}

        <LepineValues />
        {posts.length > 0 && (
          <Newsroom header="Latest News" posts={posts} newsroom />
        )}
        {instagramPosts.length > 0 && <InstagramFeed posts={instagramPosts} />}

        <Footer socialLinks findMyApartment content={contact} />
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const posts = await fetchPosts();
  const jobListings = await fetchJobListings();
  const instagramPosts = await fetchInstagramRecentPosts(10);

  return {
    props: {
      posts,
      instagramPosts: instagramPosts.data,
      jobListings,
    },
    revalidate: 1,
  };
}

export default Careers;
