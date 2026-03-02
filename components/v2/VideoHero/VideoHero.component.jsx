import ContentWrapper from "../../../sections/ContentWrapper.component"
import { renderRichText } from "../../../utils/renderRichText";


import ScrollArrow from '../../../assets/svg/ScrollArrow.svg';
import { ImageLoader } from "../../../utils/imageLoader";
import Link from "next/link";
import SocialLinksBar from "../SocialLinksBar/SocialLinksBar.component";

const VideoHero = ({ header, video }) => {
    return (
        <header id="hero" className="videoHero">
            <video src={`${video}`} preload="none" autoPlay playsInline muted loop>
                <source src={video}></source>
            </video>

            <SocialLinksBar />

            <ContentWrapper cssClass="videoHero__content">
                {/* <div dangerouslySetInnerHTML={{ __html: renderRichText(header) }} /> */}
            </ContentWrapper>

            <Link aria-label="Scroll down to learn more about Lépine Apartments" href="#lifestyle" className="videoHero__scroll">
                {ImageLoader(ScrollArrow.src, '', '', 50, 50, 0.1)}
            </Link>
        </header>
    )
}

export default VideoHero;