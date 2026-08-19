import { useEffect } from "react";

import styles from "../../styles/pages/herosRidge.module.scss";

import Head from "next/head";

import { apiUrl } from "../../utils/apiUrl";
import { populate } from "../../utils/populate";
import fetchYouTubePlaylist from "../../utils/fetchYouTubePlaylist";
import fetchPosts from "../../utils/fetchPosts";

import Container from "../../components/Container.component";
import GridList from "../../components/v2/GridList/GridList.component";
import NeighbourhoodCardsContainer from "../../components/v2/NeighbourhoodCard/NeighbourhoodCardsContainer.component";
import Footer from "../../sections/Footer.component";
import { appUrl } from "../../utils/appUrl";
import CondensedNav from "../../components/v2/CondensedNav/CondensedNav.component";
import SideImageContent from "../../components/v2/SideImageContent/SideImageContent.component";

import AOS from "aos";
import "aos/dist/aos.css";
import Newsroom from "../../sections/Newsroom/Newsroom.component";
import HerosRidgePlaylist from "../../components/v3/HerosRidgePlaylist/HerosRidgePlaylist.component";

import fetchNeighbourhoods from "../../utils/fetchNeighbourhoods";
import HerosRidgeHero from "../../components/v2/ImageCopyBlock/HerosRidgeHero.component";

const Home = ({ posts, herosRidgeData, playlist, neighbourhoods }) => {
  useEffect(() => {
    AOS.init({
      easing: "ease",
      once: true,
      offset: 0,
      duration: 600,
    });
  }, []);

  return (
    <div className={styles.herosRidgeWrapper}>
      <Container page="herosRidge">
        <Head>
          <title>
            {herosRidgeData.meta.title
              ? herosRidgeData.meta.title
              : `Hero&apos;s Ridge | Lépine Apartments`}
          </title>
          {herosRidgeData.meta?.description && (
            <meta
              name="description"
              content={herosRidgeData.meta?.description}
            />
          )}
        </Head>

        <CondensedNav />

        <h1 className="srOnly">Hero&apos;s Ridge</h1>

        <HerosRidgeHero
          id="hero"
          herosRidge={herosRidgeData.hero}
          header={herosRidgeData.hero.header}
          subtitle={herosRidgeData.hero.subtitle}
          copy={herosRidgeData.hero.copy}
          showcaseImage={herosRidgeData.nominate.imageLeft}
          showcaseColSize={50}
          showcaseHeight={100}
          copyColSize={50}
          reverse
          pdf="#nominate"
        />

        <GridList
          id="about"
          image={herosRidgeData.about.image}
          contentBlock
          header={herosRidgeData.about.header}
          subtitle={herosRidgeData.about.subtitle}
          copy={herosRidgeData.about.copy}
          logo={herosRidgeData.about.logo}
          mapleLeafBG
          sp="sp"
        />

        {playlist.items.length > 0 && (
          <HerosRidgePlaylist playlist={playlist} />
        )}

        <SideImageContent
          id="nominate"
          imageLeft={herosRidgeData.nominate.imageLeft}
          imageRight={herosRidgeData.nominate.imageRight}
          header={herosRidgeData.nominate.header}
          copy={herosRidgeData.nominate.copy}
          btnCopy={herosRidgeData.nominate.btnCopy}
          file={herosRidgeData.nominate.file}
          disclaimer={herosRidgeData.nominate.disclaimer}
          herosRidge
          heroForm
        />

        {neighbourhoods && (
          <NeighbourhoodCardsContainer
            gridRows={1}
            copy={herosRidgeData.communities.copy}
            sp
            neighbourhoods={neighbourhoods}
          />
        )}

        {posts.length > 0 && (
          <Newsroom
            header={herosRidgeData.initiatives.header}
            copy={herosRidgeData.initiatives.copy}
            posts={posts}
          />
        )}
        <Footer socialLinks />
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const indexUrl = `${apiUrl}/home?${populate}`;
  const indexRes = await fetch(indexUrl);
  const indexData = await indexRes.json();

  const herosRidgeUrl = `${appUrl}/api/herosRidge`;
  const herosRidgeRes = await fetch(herosRidgeUrl);
  const herosRidgeData = await herosRidgeRes.json();

  const posts = await fetchPosts();
  const filteredPosts = posts.filter((post) =>
    post.categories.includes("Sponsorships"),
  );

  const HerosRidgePlaylist = await fetchYouTubePlaylist(
    "PL8J-jMLAGtJVoFMdYEB5i13Z8jEOIWwL3",
  );

  const neighbourhoods = await fetchNeighbourhoods();

  return {
    props: {
      popup: indexData.data.attributes.popup
        ? indexData.data.attributes.popup
        : null,
      hero: indexData.data.attributes.hero,
      overview: indexData.data.attributes.overview,
      currentCommunities: indexData.data.attributes.currentCommunities,
      team: indexData.data.attributes.team,
      herosRidge: indexData.data.attributes.herosRidge,
      posts: filteredPosts,
      contactUs: indexData.data.attributes.contactUs,
      herosRidgeData: herosRidgeData,
      playlist: HerosRidgePlaylist,
      neighbourhoods,
    },
    revalidate: 1,
  };
}

export default Home;
