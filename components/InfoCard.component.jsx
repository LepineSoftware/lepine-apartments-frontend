import Link from "next/link";

import { baseUrl } from "../utils/baseUrl";
import { ImageLoader } from "../utils/imageLoader";
import PlayButton from '../assets/svg/playButton.svg';
import AppPopup from "./AppPopup.component";


const InfoCard = ({ title, date, slug, preview, image, type, properties, i, video }) => {
    switch (type) {
        case 'testimonial':
            return (
                <div className="infoCard" data-card="testimonial">
                    <div className="infoCard__media">
                        {ImageLoader(image, '', '', 400, 400, 10)}
                    </div>

                    <div className="infoCard__content">
                        <h3 className="infoCard__title themeHeader">
                            {title}
                        </h3>
        
                        {date && <p className="infoCard__date">{date}</p>}
                        {preview && <p className="infoCard__copy">{preview}</p>}
                        {slug && <p className="infoCard__link">Read More</p>}
                    </div>
                </div>
            );
            break;

        case 'testimonialV2':
            const VideoTrigger = <div className="infoCard__media--video">{ImageLoader(PlayButton.src, '', '', 100, 100, 0.1)}</div>;

            return (
                <div className="infoCard" data-card="testimonialV2">
                    <div className="infoCard__media">
                        {ImageLoader(image, '', '', 400, 400, 10)}
                        {video && <AppPopup trigger={VideoTrigger} video={video} />}    
                    </div>

                    <div className="infoCard__content">
                        <h3 className="infoCard__title themeHeader">
                            {title}
                        </h3>
        
                        {date && <p className="infoCard__date">{date}</p>}
                        {preview && <p className="infoCard__copy">{preview}</p>}
                        {slug && <p className="infoCard__link">Read More</p>}
                    </div>
                </div>
            );
            break;


        case 'community':
            return (
                <div className="infoCard" data-card="community" data-content-type={contentType} data-aos="fade" data-aos-delay={i * 100}>
                    <div className="infoCard__content">
                        <h3 className="infoCard__title themeHeader">
                            {title}
                        </h3>
        
                        {preview && <p className="infoCard__copy">{preview}</p>}

                        {properties && 
                            <div className="infoCard__properties">
                                {properties.map((p, i) => {
                                    const { pageId, name } = p;

                                    return (
                                        <div className="infoCard__property" key={i} data-theme={pageId}>
                                            <div className="infoCard__property--icon">
                                                <svg id="a" xmlns="http://www.w3.org/2000/svg" width="12.23" height="16.31" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 12.23 16.31"><defs><clipPath id="c"><rect y="0" width="12.23" height="16.31" fill="none"/></clipPath></defs><g id="b"><g clipPath="url(#c)"><g id="d"><path d="m5.49,15.98C.86,9.27,0,8.58,0,6.12,0,2.74,2.74,0,6.11,0c3.38,0,6.12,2.74,6.12,6.11h0c0,2.47-.86,3.16-5.49,9.86-.24.35-.72.43-1.06.19l-.19-.19h0Zm.63-7.82c1.41,0,2.55-1.14,2.55-2.55s-1.14-2.55-2.55-2.55-2.55,1.14-2.55,2.55,1.14,2.55,2.55,2.55Z" fill="#fff"/></g></g></g></svg>
                                            </div>
                                            <Link href={`/property/${pageId}`}><p className="infoCard__property--link">{name}<span> - Visit Website</span></p></Link>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            );
            break;


    
        default:
            return (
            <Link href={`/newsroom/${slug}`}>
                <div className="infoCard" data-aos="fade" data-aos-delay={i * 100}>
                    <div className="infoCard__media">
                        {ImageLoader(image, '', '', 400, 400, 10)}
                    </div>

                    <div className="infoCard__content">
                        <h3 className="infoCard__title themeHeader">
                            {title}
                        </h3>

                        {date && <p className="infoCard__date">{date}</p>}
                        {slug && <p className="infoCard__link">Read More</p>}
                    </div>
                </div>
            </Link>
            )
            break;
    }
}

export default InfoCard;