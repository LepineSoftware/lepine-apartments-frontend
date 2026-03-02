import { ImageLoader } from "../../../utils/imageLoader"

const ShowcaseImage = ({ image, classes, screen, colSize, reverse }) => {
    const showcaseClasses = ['showcaseImage'];
    reverse && showcaseClasses.push('reverse');

    return (
        <div className={showcaseClasses.join(' ')} data-screen={screen} data-colsize={colSize}>
            {ImageLoader(image, classes, '', 1230, 750, 0.1)}
        </div>
    )
}

export default ShowcaseImage;