import Link from "next/link";
import { ImageLoader } from "../../../utils/imageLoader";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const NeighbourhoodCard = ({ name, city, image, href, theme, svg, i }) => {
    return (
        <Link href={href} className="neighbourhoodCard" data-theme={theme} data-aos="fade" data-aos-delay={i * 50} onClick={() => submitGAEvent('neighbourhood_card_clicked')}>
            <div className="neighbourhoodCard__image themeBGDark">
                {image && ImageLoader(image, 'neighbourhoodCard__propertyImage', '', 300, 300, 0.1)}
                {svg ? ImageLoader(svg, 'neighbourhoodCard__logo', '', 225, 225, 0.1) : <div className="neighbourhoodCard__logo"><p>Coming<br/>Soon</p></div>}
            </div>

            <div className="neighbourhoodCard__content">
                <p className="neighbourhoodCard__name">{name}</p>
                {city && <p className="neighbourhoodCard__city">{city}</p>}
            </div>
        </Link>
    );
}

export default NeighbourhoodCard;