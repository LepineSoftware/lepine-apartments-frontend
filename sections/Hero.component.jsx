import { baseUrl } from '../utils/baseUrl';

import Button from '../components/Button.component';
import ContentWrapper from './ContentWrapper.component';
import { ImageLoader } from '../utils/imageLoader';
import { renderRichText } from '../utils/renderRichText';

const Hero = ({ content }) => {
    const overlay = content.overlayImage.data ? baseUrl(content.overlayImage.data.attributes.url) : null;
    const imageUrl = baseUrl(content.image.data.attributes.url);

    const { header, copy } = content;

    return (
            <div className="hero">
                <div className="hero__copy">
                    <ContentWrapper>
                    <div className="hero__copy--wrapper">
                        <h1 className="themeHeader">{header}</h1>
                        <div dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />
                        {/* <Button phase={phase} /> */}
                    </div>
                    </ContentWrapper>
                </div>

                <div className="hero__content">
                    {overlay && <div className="hero__content--overlay">
                        {ImageLoader(overlay, '', '', 846, 610, 10)}
                    </div>}
                    {ImageLoader(imageUrl, '', '', 1042, 675, 10)}
                </div>
            </div>
    )
}

export default Hero;