import Head from "next/head";
import Container from "../../components/Container.component";
import ContentWrapper from "../../sections/ContentWrapper.component";
import { renderRichText } from "../../utils/renderRichText";
import Logo from "../../assets/svg/lepine.svg";
import Image from "next/image";
import Link from "next/link";
import privacyPolicy from "../../static/global/privacyPolicy.json";

const PrivacyPolicy = () => {
  return (
    <Container page="homeV2">
      <Head>
        <title>Privacy Policy | Lépine Apartments</title>
      </Head>

      <ContentWrapper cssClass="privacyPolicy" size="xl">
        <Link className="privacyPolicy__logo" href="/">
          <Image src={Logo.src} height={87} width={288} alt="Lepine" />
        </Link>

        {privacyPolicy.copy && (
          <div
            dangerouslySetInnerHTML={{
              __html: renderRichText(privacyPolicy.copy),
            }}
          />
        )}
      </ContentWrapper>
    </Container>
  );
};

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 1,
  };
}

export default PrivacyPolicy;
