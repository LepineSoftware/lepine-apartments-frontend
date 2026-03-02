import ContentWrapper from "../../../sections/ContentWrapper.component";
import { ImageLoader } from "../../../utils/imageLoader";

const FullVideoHero = ({ id, header, subtitle, copy, video, featuredListingsLength, btnCopy, btnHref, logos, bgImage }) => {
    return (
        <section className="fullVideoHero themeBGDark" id={id}>
            {video && <video autoPlay playsInline muted loop src={video} className="fullVideoHero__video"></video>}
            {!video && bgImage !== undefined && <div className="fullVideoHero__video">{ImageLoader(bgImage, '', '', 2560, 1080, 1)}
            {/* <div className="fullVideoHero__fade"></div> */}
                </div>}
            
            <ContentWrapper size="xl" cssClass="fullVideoHero__content">
                {logos && logos.light && ImageLoader(logos.light, 'fullVideoHero__logo', '', 852, 130, 0.5)}
                {/* {header && <h1 className="fullVideoHero__header">{header}</h1>} */}
                {subtitle && <h3 className="fullVideoHero__subtitle">{subtitle}</h3>}
                {/* {copy && <p className="fullVideoHero__copy">{copy}</p>} */}
                {btnCopy && btnHref && featuredListingsLength > 0 && <a href={btnHref} className="btn themeBtn">{btnCopy}</a>}
            </ContentWrapper>
        </section>
    );
}

export default FullVideoHero;