import { Fragment } from 'react';
import HeroArrow from '../../../assets/svg/heroArrow.svg';
import { ImageLoader } from '../../../utils/imageLoader';

const CornerImage = ({ left, right}) => {
    return (
        <Fragment>
            {left && <div className="cornerImage">{ImageLoader(HeroArrow.src, '', '', 1000, 1000, 0.1)}</div>}            
            {right && <div className="cornerImage reverse">{ImageLoader(HeroArrow.src, '', '', 1000, 1000, 0.1)}</div>}
        </Fragment>
    )
}

export default CornerImage;