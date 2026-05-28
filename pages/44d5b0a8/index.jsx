import Container from "../../components/Container.component";
import ContentWrapper from "../../sections/ContentWrapper.component";
import fetchInstagramRecentPosts from "../../utils/fetchInstagramRecentPosts";
import fetchYoutubeRecentVideos from "../../utils/fetchYouTubeRecentVideos";
import fetchRecentLinkedInPosts from "../../utils/fetchRecentLinkedInPosts";
import { ImageLoader } from "../../utils/imageLoader";
import Image from "next/image";
import { useState, useEffect } from "react";
import LogoDark from "../../assets/svg/lepine.svg";
import Link from "next/link";
import CloseIcon from "../../assets/svg/menuCloseLight.svg";
import Star from "../../assets/svg/star.svg";
import fetchPosts from "../../utils/fetchPosts";
import fetchGoogleReviews from "../../utils/fetchGoogleReviews";
import fetchFacebookRecentPosts from "../../utils/fetchFacebookRecentPosts";

import styles from "../../styles/pages/socialDashboard.module.scss";

const SocialDashboard = ({
  youtube,
  instagram,
  linkedin,
  newsroom,
  google,
  facebook,
}) => {
  const [platform, setPlatform] = useState("facebook");
  const [contentPopupActive, setContentPopupActive] = useState(false);
  const [contentPopupHref, setContentPopupHref] = useState(null);

  useEffect(() => {
    const body = document.querySelector("body");
    contentPopupActive
      ? body.classList.add("noscroll")
      : body.classList.remove("noscroll");
  }, [contentPopupActive]);

  const GoogleReviewItem = ({ item, i }) => {
    const { author_name, name, rating, relative_time_description, text } = item;

    return (
      <div
        className="socialDashboard__item"
        data-platform="googlereview"
        data-aos="fade"
        data-aos-delay={i * 50}
      >
        <div className="socialDashboard__item--content">
          <h4>{author_name}</h4>

          <div
            style={{
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent: "center",
              alignItems: "flex-start",
              rowGap: "5px",
            }}
          >
            <p>{name}</p>
            <p>{relative_time_description}</p>
            <p>
              {Array.from(Array(rating), (e, i) => (
                <Image key={i} src={Star} height={15} width={15} />
              ))}
            </p>
          </div>

          <p>{text !== "" ? text : "Rating only"}</p>
        </div>
      </div>
    );
  };

  const YouTubeItem = ({ item, i }) => {
    const { title, thumbnails, publishTime, description } = item.snippet;
    const date = new Date(publishTime);

    const styles = {
      backgroundImage: `url('${thumbnails.high.url}')`,
      backgroundPosition: "center",
      backgroundSize: "165%",
      backgroundRepeat: "no-repeat",
    };

    return (
      <div
        className="socialDashboard__item"
        data-platform="youtube"
        data-aos="fade"
        data-aos-delay={i * 50}
        onClick={(e) => setContentPopup(e, item.id.videoId)}
        style={styles}
      >
        {publishTime && (
          <div className="socialDashboard__item--info">
            <p className="socialDashboard__item--date">
              {date.getUTCMonth() + 1}/{date.getUTCDate()}/
              {date.getUTCFullYear()}
            </p>
          </div>
        )}

        <div className="socialDashboard__item--footer">
          {title && (
            <h3 className="socialDashboard__item--title">
              {title
                .replace("&#39;", "'")
                .replace("&quot;", "")
                .replace("&amp;", "&")
                .replace("&quot;", "")}
            </h3>
          )}

          {description && (
            <p className="socialDashboard__item--description">{description}</p>
          )}
        </div>
      </div>
    );
  };

  const setContentPopup = (e, href) => {
    e.preventDefault();
    setContentPopupHref(href);
    setContentPopupActive(true);
  };

  const FacebookItem = ({ item, i }) => {
    const {
      attachments,
      created_time,
      id,
      is_popular,
      message,
      permalink_url,
    } = item;
    const date = new Date(created_time);
    const styles = attachments
      ? {
          backgroundImage: `url('${attachments.data[0].media.image.src}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }
      : null;

    if (attachments) {
      return (
        <a
          className="socialDashboard__item"
          style={styles}
          data-platform="facebook"
          data-aos="fade"
          data-aos-delay={i * 50}
          href={permalink_url}
          target="_blank"
        >
          {created_time && (
            <div className="socialDashboard__item--info">
              <p className="socialDashboard__item--date">
                {date.getUTCMonth() + 1}/{date.getUTCDate()}/
                {date.getUTCFullYear()}
              </p>
            </div>
          )}

          {message && (
            <div className="socialDashboard__item--content">
              <p>{message}</p>
            </div>
          )}
        </a>
      );
    }
  };

  const InstagramItem = ({ item, i }) => {
    const {
      media_type,
      media_url,
      timestamp,
      caption,
      thumbnail_url,
      permalink,
    } = item;
    const date = new Date(timestamp);

    const bgStyles =
      media_type === "VIDEO"
        ? {
            backgroundImage: `url('${thumbnail_url}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }
        : {
            backgroundImage: `url('${media_url}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          };

    return (
      <div
        className="socialDashboard__item"
        data-platform="instagram"
        data-aos="fade"
        data-aos-delay={i * 50}
        onClick={(e) => setContentPopup(e, permalink)}
        style={bgStyles}
      >
        <div className="socialDashboard__item--content">
          {caption && (
            <p className="socialDashboard__item--description">{caption}</p>
          )}
        </div>

        {timestamp && (
          <div className="socialDashboard__item--info">
            <p className="socialDashboard__item--date">
              {date.getUTCMonth() + 1}/{date.getUTCDate()}/
              {date.getUTCFullYear()}
            </p>
          </div>
        )}
      </div>
    );
  };

  const LinkedInItem = ({ item, i }) => {
    const { createdAt, id, lifecycleState } = item;
    const date = new Date(createdAt);

    if (lifecycleState === "PUBLISHED") {
      return (
        <div
          className="socialDashboard__item"
          data-platform="linkedin"
          data-aos="fade"
          data-aos-delay={i * 50}
          onClick={(e) => setContentPopup(e, id)}
        >
          <div className="socialDashboard__item--embed">
            <iframe
              src={`https://www.linkedin.com/embed/feed/update/${id}`}
              height="795"
              width="504"
              frameborder="0"
              allowfullscreen=""
              title="Embedded post"
            ></iframe>
          </div>

          <div className="socialDashboard__item--embedOverlay"></div>

          {createdAt && (
            <div className="socialDashboard__item--info">
              <p className="socialDashboard__item--date">
                {date.getUTCMonth() + 1}/{date.getUTCDate()}/
                {date.getUTCFullYear()}
              </p>
            </div>
          )}
        </div>
      );
    }
  };

  const NewsroomItem = ({ item, i }) => {
    const { title, date, images, preview, slug } = item;
    const styles = {
      backgroundImage: `url('${images.thumbnail}')`,
      backgroundPosition: "center",
      backgroundSize: "165%",
      backgroundRepeat: "no-repeat",
    };

    return (
      <Link
        href={`/newsroom/${slug}`}
        target="_blank"
        rel="noreferrer"
        className="socialDashboard__item"
        data-platform="youtube"
        data-aos="fade"
        data-aos-delay={i * 50}
        style={styles}
      >
        {date && (
          <div className="socialDashboard__item--info">
            <p className="socialDashboard__item--date">{date}</p>
          </div>
        )}

        <div className="socialDashboard__item--footer">
          {title && <h3 className="socialDashboard__item--title">{title}</h3>}

          {preview && (
            <p className="socialDashboard__item--description">{preview}</p>
          )}
        </div>
      </Link>
    );
  };

  const SocialDashboardMenuBtn = ({ label, id }) => {
    const classes = ["btn", "btnSocial"];
    platform === id && classes.push("active");
    return (
      <div
        className={classes.join(" ")}
        onClick={() => setPlatform(id)}
        data-platform={id}
      >
        {label}
      </div>
    );
  };

  const SocialDashboardContentPopup = ({ embed }) => {
    const [closing, setClosing] = useState(false);

    const closeContentPopup = () => {
      setClosing(true);

      setTimeout(() => {
        setContentPopupActive(false);
      }, 50);
    };

    const classes = ["socialDashboard__popup"];
    closing && classes.push("fadeOut");

    return (
      <div className={classes.join(" ")} onClick={() => closeContentPopup()}>
        <div
          className="btnBlue socialDashboard__popup--close"
          onClick={() => closeContentPopup()}
        >
          <Image src={CloseIcon.src} width={25} height={25} alt="Close" />
        </div>

        <div
          className="socialDashboard__popup--content"
          data-platform={platform}
        >
          {platform === "instagram" && (
            <iframe
              width="320"
              height="440"
              src={`${embed}embed/`}
              frameborder="0"
              scrolling="no"
            ></iframe>
          )}
          {platform === "facebook" && (
            <iframe
              width="320"
              height="440"
              src={embed}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          )}
          {platform === "youtube" && (
            <iframe
              src={`https://www.youtube.com/embed/${embed}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          )}
          {platform === "linkedin" && (
            <iframe
              src={`https://www.linkedin.com/embed/feed/update/${embed}`}
              height="795"
              width="504"
              frameborder="0"
              allowfullscreen=""
              title="Embedded post"
            ></iframe>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.socialDashboardWrapper}>
      <Container cssClass="socialDashboard" page="social">
        {contentPopupActive && (
          <SocialDashboardContentPopup embed={contentPopupHref} />
        )}

        <ContentWrapper className="socialDashboard__container">
          <ContentWrapper cssClass="socialDashboard__logo" size="xl">
            <Link href="/">{ImageLoader(LogoDark.src, "", "", 288, 87)}</Link>

            <h2>Social Media Dashboard</h2>
          </ContentWrapper>

          <div className="socialDashboard__menu">
            <SocialDashboardMenuBtn label="Facebook" id="facebook" />
            <SocialDashboardMenuBtn label="Instagram" id="instagram" />
            <SocialDashboardMenuBtn label="YouTube" id="youtube" />
            <SocialDashboardMenuBtn label="LinkedIn" id="linkedin" />
            <SocialDashboardMenuBtn label="Newsroom" id="newsroom" />
            <SocialDashboardMenuBtn label="Google" id="googlereview" />
          </div>

          <div className="socialDashboard__posts" data-platform={platform}>
            {platform === "youtube" &&
              (youtube?.recent?.items ?? []).map((item, i) => (
                <YouTubeItem item={item} i={i} key={i} />
              ))}
            {platform === "instagram" &&
              (instagram?.recent?.data ?? []).map((item, i) => (
                <InstagramItem item={item} i={i} key={i} />
              ))}
            {platform === "facebook" &&
              (facebook?.recent?.data ?? []).map((item, i) => (
                <FacebookItem item={item} i={i} key={i} />
              ))}
            {platform === "linkedin" &&
              (linkedin?.recent?.elements ?? []).map((item, i) => (
                <LinkedInItem item={item} i={i} key={i} />
              ))}
            {platform === "newsroom" &&
              (newsroom?.recent ?? []).map((item, i) => (
                <NewsroomItem item={item} i={i} key={i} />
              ))}
            {platform === "googlereview" &&
              (google?.recent ?? []).map((item, i) => (
                <GoogleReviewItem item={item} i={i} key={i} />
              ))}
          </div>
        </ContentWrapper>
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const recentYouTubeVideos = await fetchYoutubeRecentVideos();
  const recentInstagramPosts = await fetchInstagramRecentPosts();
  const recentFacebookPosts = await fetchFacebookRecentPosts();
  const recentLinkedInPosts = await fetchRecentLinkedInPosts();
  const recentNewsroomPosts = await fetchPosts();
  const googleReviews = await fetchGoogleReviews();

  return {
    props: {
      youtube: {
        recent: recentYouTubeVideos,
      },
      instagram: {
        recent: recentInstagramPosts,
      },
      facebook: {
        recent: recentFacebookPosts,
      },
      linkedin: {
        recent: recentLinkedInPosts,
      },
      newsroom: {
        recent: recentNewsroomPosts,
      },
      google: {
        recent: googleReviews,
      },
    },
    revalidate: 1,
  };
}

export default SocialDashboard;
