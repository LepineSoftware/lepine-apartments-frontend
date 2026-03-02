import { Fragment, useContext } from "react"
import ImageBlock from "./ImageBlock";

const CaptionCardBlock = ({ header, image, subtitle, subtitleIcon, copy, pdf, btnCopy, href }) => {
    return (
        <Fragment>
            <div className="suites__image">
                {image && <ImageBlock image={image} subtitle={subtitle} icon={subtitleIcon} />}
            </div>

            <div className="suites__copy">
                <h2 className="themeHeader">{header}</h2>
                <p className="rt">{copy}</p>
                {pdf && <a target="_blank" rel="noreferrer" href={pdf}><div className="btn themeBtn">{btnCopy}</div></a>}
                {href && <a href={href}><div className="btn themeBtn">{btnCopy}</div></a>}
            </div>
        </Fragment>
    )
}

export default CaptionCardBlock;