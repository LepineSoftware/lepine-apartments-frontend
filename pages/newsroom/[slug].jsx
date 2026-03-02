import styles from "../../styles/pages/newsroomPost.module.scss";

import NewsroomPopup from "../../components/NewsroomPopup.component";
import fetchSlugs from "../../utils/fetchSlugs";
import { useRouter } from "next/router";
import Head from "next/head";
import qs from "qs";
import { apiUrl } from "../../utils/apiUrl";
import { baseUrl } from "../../utils/baseUrl";
import fetchNeighbourhoods from "../../utils/fetchNeighbourhoods";
import NavV3 from "../../components/v2/NavV3/NavV3.component";
import fetchContactInfo from "../../utils/fetchContactInfo";
import fetchContactImages from "../../utils/fetchContactImages";

const NewsroomPost = ({ post, neighbourhoods, contact }) => {
  const phoneNumber = contact?.info?.phone ? contact?.info?.phone : null;
  const phoneHref = `tel:${phoneNumber}`;

  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Newsroom | Lépine Apartments</title>
        </Head>

        <div className="redirect__container">
          <div className="redirect__content">
            <h3>Redirecting you to lepineapartments.com/newsroom</h3>
          </div>
        </div>
      </>
    );
  } else {
    const title = `${post.title} | Lépine Apartments`;

    return (
      <div className={styles.newsroomPostWrapper}>
        <div className="container" data-page="newsroompost">
          <Head>
            <title>{post.meta?.title ? post.meta?.title : title}</title>
            {post.preview && <meta name="description" content={post.preview} />}
            {post.meta?.keywords && (
              <meta name="keywords" content={post.meta?.keywords} />
            )}
            <meta
              property="og:title"
              content={post.meta?.title ? post.meta?.title : title}
            />
            <meta property="og:image" content={post.images.headerLg} />
            <meta property="og:type" content="article" />
            <meta
              property="og:site_name"
              content={post.meta?.title ? post.meta?.title : title}
            />
            <meta property="og:locale" content="en_US" />
            <meta
              property="article:published_time"
              content={`${post.date}T11:00:00.000Z`}
            ></meta>
            <meta
              property="article:modified_time"
              content={post.updatedAt}
            ></meta>
          </Head>
          <NavV3
            phoneNumber={phoneNumber}
            phoneHref={phoneHref}
            current="newsroom"
            contact={contact}
            rentCopy="Rent Today"
          />
          <NewsroomPopup post={post} neighbourhoods={neighbourhoods} />
        </div>
      </div>
    );
  }
};

export async function getStaticPaths() {
  const slugs = await fetchSlugs();

  return {
    paths: slugs,
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug;

  const query = qs.stringify({
    publicationState: "live",
    fields: ["title", "date", "preview", "article", "slug", "updatedAt"],
    populate: [
      "properties.pageId",
      "categories.name",
      "images.thumbnail",
      "images.headerLg",
      "images.headerSm",
      "meta.description",
      "meta.keywords",
      "author.name",
      "author.title",
      "author.image",
      "gallery",
    ],
    encodeValuesOnly: true,
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const url = `${apiUrl}/blogs?${query}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.data.length === 0) {
    return {
      redirect: {
        destination: "/newsroom",
        permanent: false,
      },
    };
  } else {
    const {
      title,
      date,
      preview,
      slug,
      images,
      article,
      meta,
      updatedAt,
      categories,
      properties,
      author,
      gallery,
    } = data.data[0].attributes;
    const categoriesMap = categories.data.map((c) => c.attributes.name);
    const propertiesMap = properties.data.map((c) => c.attributes.name);

    const galleryObj =
      gallery?.data?.length > 0
        ? gallery?.data?.map((img) => baseUrl(img.attributes.url))
        : null;

    const authorObj = author?.data?.attributes
      ? {
          name: author.data?.attributes?.name,
          title: author.data?.attributes?.title,
          biography: author.data?.attributes?.biography,
          image: baseUrl(author.data?.attributes?.image?.data?.attributes?.url),
        }
      : null;

    const imagesObj = {
      headerLg: baseUrl(images.headerLg.data.attributes.url),
      headerSm: baseUrl(images.headerSm.data.attributes.url),
      thumbnail: baseUrl(images.thumbnail.data.attributes.url),
    };

    const post = {
      author: authorObj,
      title,
      date,
      updatedAt,
      preview,
      article,
      slug,
      properties: propertiesMap,
      categories: categoriesMap,
      meta,
      images: imagesObj,
      gallery: galleryObj,
    };

    const neighbourhoods = await fetchNeighbourhoods();

    const contact = {
      images: await fetchContactImages(),
      info: await fetchContactInfo(),
    };

    return {
      props: {
        post,
        neighbourhoods,
        contact,
      },
      revalidate: 1,
    };
  }
}

export default NewsroomPost;
