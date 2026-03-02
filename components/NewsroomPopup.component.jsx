import Image from "next/image";
import Link from "next/link";
import menuCloseIcon from "../assets/svg/return-arrow.svg";
import parseStrapiDate from "../utils/parseStrapiDate";
import { ImageLoader } from "../utils/imageLoader";
import { renderRichText } from "../utils/renderRichText";
import Logo from "../assets/svg/lepine.svg";
import CopyToClipboard from "./v3/CopyToClipboard/CopyToClipboard.component";
import Script from "next/script";
import NeighbourhoodCardsContainer from "./v2/NeighbourhoodCard/NeighbourhoodCardsContainer.component";
import PropertyGallery from "../sections/PropertyGallery.component";

const NewsroomPopup = ({ post, neighbourhoods }) => {
  const url = post.slug
    ? `${process.env.NEXT_PUBLIC_LEPINE_APARTMENTS_URL}/newsroom/${post.slug}`
    : null;

  const AuthorBlock = ({ biography }) => {
    return (
      <div className="newsroomPopup__author">
        {biography && post.author.biography && (
          <div className="newsroomPopup__author--row">
            <h3>About the author:</h3>
          </div>
        )}

        <div className="newsroomPopup__author--row">
          <div className="newsroomPopup__author--block">
            {post.author.image &&
              ImageLoader(post.author.image, "", "", 2560, 900, 10)}

            <div className="newsroomPopup__author--copy">
              <p style={{ fontWeight: "bold" }}>{post.author.name}</p>
              <p>{post.author.title}</p>
            </div>
          </div>
        </div>

        {biography && post.author.biography && (
          <div className="newsroomPopup__author--row">
            <p>{post.author.biography}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {url && <div id="fb-root"></div>}

      <div className="newsroomPopup">
        <Link
          href="/newsroom"
          className="newsroomPopup__close"
          data-screen="desktop"
        >
          <Image src={menuCloseIcon} height={35} width={35} alt="" />
        </Link>

        <div className="newsroomPopup__wrapper">
          <div className="newsroomPopup__image">
            {post.images.headerLg &&
              ImageLoader(
                post.images.headerLg,
                "newsroomPopup__image--large",
                "",
                2560,
                900,
                10,
              )}
            {post.images.headerSm &&
              ImageLoader(
                post.images.headerSm,
                "newsroomPopup__image--small",
                "",
                1024,
                575,
                10,
              )}
            <Link
              href="/newsroom"
              className="newsroomPopup__close"
              data-screen="mobile"
            >
              <Image src={menuCloseIcon} height={35} width={35} alt="" />
            </Link>
          </div>

          <div className="newsroomPopup__content">
            <div className="newsroom__content--utility">
              <Image
                className="newsroomPopup__logo"
                src={Logo.src}
                height={87}
                width={255}
                alt="Lépine"
              />
              <div className="newsroom__content--share">
                {url && (
                  <CopyToClipboard
                    href={url}
                    promptCopy="Copy URL"
                    successCopy="URL copied!"
                  />
                )}
                {/* {url && <Script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0" />}
                                {url && <div className="fb-share-button" data-href={url} data-layout="button">Share to Facebook</div>} */}
              </div>
            </div>

            <div className="newsroomPopup__header">
              <h1>{post.title}</h1>
            </div>

            <hr />

            <div className="newsroomPopup__subheader">
              {post.author && <AuthorBlock />}
              <div className="newsroomPopup__dates">
                <p>
                  Last updated {parseStrapiDate(post.updatedAt.split("T")[0])}
                </p>
                <p>Posted {parseStrapiDate(post.date)}</p>
              </div>
            </div>

            <hr />

            <div
              className="newsroomPopup__copy rt"
              dangerouslySetInnerHTML={{ __html: renderRichText(post.article) }}
            />

            {/* {post.author && <>
                            <hr />
                            <AuthorBlock biography />
                            <hr />
                        </>} */}

            {post?.gallery?.length > 0 && (
              <PropertyGallery
                id="blogGallery"
                images={post.gallery}
                lightbox
              />
            )}

            <Link href="/newsroom" className="newsroomPopup__footer">
              Return to Newsroom
            </Link>
          </div>
        </div>

        {neighbourhoods && (
          <NeighbourhoodCardsContainer
            gridRows={1}
            copy="Visit a Lépine apartment today to discover your dream home in a neighbourhood you love. Walk-ins welcome at all locations."
            sp
            neighbourhoods={neighbourhoods}
            isNewsroom
          />
        )}
      </div>
    </>
  );
};

export default NewsroomPopup;
