import ContentWrapper from "../../../sections/ContentWrapper.component";
import { ImageLoader } from "../../../utils/imageLoader";
import { renderRichText } from "../../../utils/renderRichText";
import CornerImage from "../CornerImage/CornerImage.component";
import ShowcaseImage from "../ShowcaseImage/ShowcaseImage.component";
import PlayButton from '../../../assets/svg/playButton.svg';
import AppPopup from "../../AppPopup.component";
import SocialLinksBar from "../SocialLinksBar/SocialLinksBar.component";

const ImageCopyBlock = ({
    id,
    herosRidge,
    background,
    columnImage,
    showcaseImage,
    showcaseColSize,
    showcaseHeight,
    header,
    subtitle,
    copy,
    copyColSize,
    copyIcon,
    reverse,
    mobileReverse,
    cornerImageLeft,
    cornerImageRight,
    sp,
    btnCopy,
    btnHref,
    type,
    video,
    availabilityCopy,
    featuredListingsLength

}) => {
    const containerClasses = ['imageCopyBlock__container'];
    reverse && containerClasses.push('reverse');
    herosRidge && containerClasses.push('herosRidge');
    showcaseImage && containerClasses.push('showcaseContainer');
    sp && containerClasses.push(sp);

    const contentClasses = ['imageCopyBlock'];
    reverse && contentClasses.push('reverse');

    let showcaseImageClass;
    reverse ? showcaseImageClass = 'imgRoundBottomRight' : showcaseImageClass = 'imgRoundBottomLeft';

    const HerosRidgeTrigger = ImageLoader(PlayButton.src, '', '', 100, 100, 0.1);

    const formDownload = () => {
        const gtag = window.gtag;
        gtag('event', 'HerosRidgeFormDownload');
    }

    const renderCopy = () => (
        <div className="imageCopyBlock__copy--wrapper" data-type="copy">
            {header && <h2 className="imageCopyBlock__header themeHeader">{header}</h2>}
            {subtitle && <h3 className="imageCopyBlock__subtitle">{subtitle}</h3>}
            {copy && <div className="imageCopyBlock__copy rt" dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />}
            {herosRidge && herosRidge.btnCopy && herosRidge.btnHref && <a href={herosRidge.btnHref} className="btn imageCopyBlock__btn" onClick={() => formDownload()}>{herosRidge.btnCopy}</a>}
            {btnCopy && btnHref && <a href={btnHref} className="btn themeBtn imageCopyBlock__btn">{btnCopy}</a>}
        </div>
    );
    
    const renderCopyIcon = () => (
        <div className="imageCopyBlock__copy--wrapper" data-type="copyIcon">
            <div className="imageCopyBlock__col--copyIconRow">
                {header && <h2 className="imageCopyBlock__header">{header}</h2>}
            </div>

            <div className="imageCopyBlock__col--copyIconRow">
                {copyIcon && <div className="imageCopyBlock__col--copyIcon" data-screen="desktop">
                    {ImageLoader(copyIcon, '', '', 250, 250, 0.1)}
                </div>}


                <div className="imageCopyBlock__col--copyIconRow--content">
                    {subtitle && <div className="imageCopyBlock__subtitle">
                        {copyIcon && <div className="imageCopyBlock__col--copyIcon" data-screen="mobile">
                            {ImageLoader(copyIcon, '', '', 250, 250, 0.1)}
                        </div>}
                        <h3>{subtitle}</h3>
                    </div>}
                    {copy && <div className="imageCopyBlock__copy" dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />}
                    {herosRidge && herosRidge.btnCopy && herosRidge.btnHref && <a href={herosRidge.btnHref} className="btn imageCopyBlock__btn" onClick={() => formDownload()}>{herosRidge.btnCopy}</a>}
                    {btnCopy && btnHref && <a href={btnHref} className="btn imageCopyBlock__btn">{btnCopy}</a>}
                </div>
            </div>
        </div>
    );

    const renderProperty = () => (
        <section className={containerClasses.join(' ')} id={id} data-type={type}>
            {cornerImageLeft && <CornerImage left />}
            {cornerImageRight && <CornerImage right />}

            {video && 
                <div className="showcaseImage showcaseImage__video reverse" data-showcase="50" data-screen="mobile">
                    <video src={`${video}#t=0.1`} preload="none" alt="Hero" autoPlay playsInline muted loop></video>
                    <SocialLinksBar />
                </div>}

            <ContentWrapper size="xl">
                <div className={contentClasses.join(' ')}>
                    {columnImage && <div className="imageCopyBlock__col" data-col="image">
                        {ImageLoader(columnImage, 'imageCopyBlock__image', '', 900, 600, 0.1)}
                    </div>}
                    
                    <div className="imageCopyBlock__col" data-showcase={showcaseColSize} data-height={showcaseHeight}>
                        {video && <div className="showcaseImage showcaseImage__video reverse" data-showcase="50" data-screen="desktop"><video src={`${video}#t=0.1`} preload="none" alt="Hero" autoPlay playsInline muted loop></video><SocialLinksBar /></div>}
                        {!video && showcaseImage && <ShowcaseImage image={showcaseImage} classes={showcaseImageClass} screen="desktop" reverse={reverse} />}
                    </div>

                    <div className="imageCopyBlock__col" data-col="copy" data-copy={copyColSize}>
                        <div className="imageCopyBlock__col--wrapper">
                            {header && <h2 className="imageCopyBlock__header themeHeader">{header}</h2>}
                            {subtitle && <h3 className="imageCopyBlock__subtitle themeHeader" style={{ flex: '1 1 100%' }}>{subtitle}</h3>}
                            {availabilityCopy && <h3 className="imageCopyBlock__subtitle" style={{ flex: '1 1 100%' }}>{availabilityCopy}</h3>}
                            {copy && <div className="imageCopyBlock__copy" dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />}
                            {btnCopy && btnHref && featuredListingsLength > 0 && <a href={btnHref} className="btn imageCopyBlock__btn themeBtn">{btnCopy}</a>}
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );

    const renderCommercial = () => (
        <section className={containerClasses.join(' ')} id={id} data-type={type} data-aos="">
            <div className="imageCopyBlock__col" data-showcase={showcaseColSize} data-screen-commercial="desktop">
                <div className="showcaseImage showcaseImage__video" data-showcase="50" style={{ height: '100%', borderRadius: '0' }}>
                    <video style={{ objectFit: 'contain', height: '100%', borderRadius: '0' }} src={video} alt="" autoPlay playsInline muted loop></video>
                </div>
            </div>

            <ContentWrapper size="xl">
                <div className={contentClasses.join(' ')}>
                    <div className="imageCopyBlock__col" data-showcase={showcaseColSize} style={{ borderRadius: '0 0 50px 0' }} data-screen-commercial="desktop">
                        <div className="showcaseImage showcaseImage__video" data-showcase="50" style={{ height: '100%', borderRadius: '0 0 50px 0'  }}>
                            <video style={{ objectFit: 'cover', height: '100%', borderRadius: '0 0 50px 0' }} src={video} alt="" autoPlay playsInline muted loop></video>
                        </div>
                    </div>

                    <div className="imageCopyBlock__col" data-col="copy" data-copy={copyColSize} data-copyicon={copyIcon && 'true'}>
                        <div className="imageCopyBlock__col--wrapper" data-type={herosRidge && 'herosRidge'}>
                            <div className="imageCopyBlock__logo">
                                {herosRidge && herosRidge.logo && ImageLoader(herosRidge.logo, '', '', 481, 119, 0.1)}
                                {/* {herosRidge && herosRidge.btnCopy && herosRidge.btnHref && <a href={herosRidge.btnHref} className="btn imageCopyBlock__btn">{herosRidge.btnCopy}</a>} */}
                            </div>

                            {copyIcon ? renderCopyIcon() : renderCopy()}
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );
    
    if (type === 'property') {
        return renderProperty();
    } else if (type === 'commercialvideo') {
        return renderCommercial();
    } else {
        return (
            <section className={containerClasses.join(' ')} id={id} data-type={type} data-aos="">
                {cornerImageLeft && <CornerImage left />}
                {cornerImageRight && <CornerImage right />}
                {!herosRidge && showcaseImage && <ShowcaseImage image={showcaseImage} classes={showcaseImageClass} screen="mobile" reverse={reverse} />}
                {background && <div className="imageCopyBlock__bg">{ImageLoader(background, '', '', 1000, 1000, 0.1)}</div>}

                <ContentWrapper size="xl">
                    <div className={contentClasses.join(' ')}>
                        {columnImage && <div className="imageCopyBlock__col" data-col="image">
                            {ImageLoader(columnImage, 'imageCopyBlock__image', '', 900, 600, 0.1)}
                        </div>}
                        
                        {showcaseImage && <div className="imageCopyBlock__col" data-showcase={showcaseColSize} data-height={showcaseHeight}>
                            {!herosRidge && <ShowcaseImage image={showcaseImage} classes={showcaseImageClass} screen="desktop" reverse={reverse} />}
                            {herosRidge && 
                                <div className="showcaseImage showcaseImage__video reverse" data-showcase="50">
                                    <video src={herosRidge.video} alt="Hero's Ridge" autoPlay playsInline muted loop></video>
                                    <div className="showcaseImage__video--overlay">
                                        <AppPopup trigger={HerosRidgeTrigger} video={herosRidge.youtubePopup} />
                                    </div>
                                </div>}
                        </div>}

                        <div className="imageCopyBlock__col" data-col="copy" data-copy={copyColSize} data-copyicon={copyIcon && 'true'}>
                            <div className="imageCopyBlock__col--wrapper" data-type={herosRidge && 'herosRidge'}>
                                <div className="imageCopyBlock__logo">
                                    {herosRidge && herosRidge.logo && ImageLoader(herosRidge.logo, '', '', 481, 119, 0.1)}
                                    {/* {herosRidge && herosRidge.btnCopy && herosRidge.btnHref && <a href={herosRidge.btnHref} className="btn imageCopyBlock__btn">{herosRidge.btnCopy}</a>} */}
                                </div>

                                {copyIcon ? renderCopyIcon() : renderCopy()}
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </section>
        );
    }
}

export default ImageCopyBlock;