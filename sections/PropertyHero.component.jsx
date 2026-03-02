import { baseUrl } from '../utils/baseUrl';

import ContentWrapper from './ContentWrapper.component';
import { ImageLoader } from '../utils/imageLoader';

const Hero = ({ property }) => {
    const { address, hero } = property;
    const image = baseUrl(hero.content.image.data.attributes.url);
    
    return (
        <div className="comingSoonHero">
            <ContentWrapper cssClass="comingSoonHero__copy">
                <div className="comingSoonHero__copy--wrapper">
                    <div>
                        <h3 style={{ marginBottom: '10px' }}>Coming Soon</h3>
                        <h2 className="themeHeader">{property.name}</h2>
                    </div>
                    <h3 className="comingSoonHero__address themeHeader">{address.streetAddress}, {address.city.name}</h3>
                    <p>{hero.description}</p>
                </div>
            </ContentWrapper>

            <div className="comingSoonHero__content">
                {ImageLoader(image, '', '', 1042, 675, 10)}
            </div>
        </div>
)
}

export default Hero;