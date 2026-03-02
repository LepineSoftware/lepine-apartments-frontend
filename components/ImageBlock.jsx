import { ImageLoader } from "../utils/imageLoader";

const ImageBlock = ({ image, icon, subtitle }) => {
    return (
        <div className="imageBlock">
            <div className="imageBlock__image">
                {ImageLoader(image, '', subtitle, 500, 550, 10)}
            </div>

            <div className="imageBlock__content">
                {icon && <div className="imageBlock__icon">
                    {ImageLoader(icon, '', subtitle, 90, 90, 10)}
                </div>}
                <div className="imageBlock__subtitle">
                    <h3 className="themeHeader">{subtitle}</h3>
                </div>
            </div>
        </div>
    )
}

export default ImageBlock;