import ContentWrapper from "../../../sections/ContentWrapper.component"
import { ImageLoader } from "../../../utils/imageLoader"
import { renderRichText } from "../../../utils/renderRichText";
import mapleLeaf from '../../../assets/svg/mapleLeaf.svg';

const GridList = ({ id, type, items, contentBlock, image, sp, header, subtitle, copy, logo, mapleLeafBG, propertyLeasingCopy }) => {
    const classes = ['gridList'];
    sp && classes.push(sp);

    const renderContentBlock = () => {
        return (
            <>
                {header && <h2>{header}</h2>}
                {subtitle && <h3 className="jostSemiBold">{subtitle}</h3>}
                {copy && <div dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />}
                {logo && ImageLoader(logo, 'gridList__logo', '', 242, 88, 0.1)}
            </>
        )
    }

    const mapleLeafBGStyles = {
        backgroundImage: `url('${mapleLeaf.src}')`,
    }

    const renderGridList = () => (
        <section id={id} className={classes.join(' ')} style={mapleLeafBG && mapleLeafBGStyles}>
            <ContentWrapper cssClass="gridList__container">
                <div className="gridList__image" data-aos="fade">
                    {image && ImageLoader(image, '', '', 870, 885, 0.1)}
                </div>

                {items && <div className="gridList__content" data-type="list" data-aos="fade">
                    {items.map((item, i) => {
                        return (<div key={i} className="gridList__item">
                            {item.icon && <div className="gridList__item--icon">
                                {ImageLoader(item.icon, '', '', 100, 100, 0.1)}
                            </div>}

                            <div className="gridList__item--copy">
                                <h3>{item.header}</h3>
                                <p>{item.copy}</p>
                            </div>
                        </div>)
                    })}
                </div>}

                {contentBlock && <div className="gridList__content" data-type="copy">{renderContentBlock()}</div>}
            </ContentWrapper>
        </section>
    )

    const renderPeaceOfMindGridList = () => {
        const styles = {
            display: 'flex',
            flexFlow: 'column nowrap',
            rowGap: '25px'
        };

        return (
            <section id={id} className={classes.join(' ')} style={mapleLeafBG && mapleLeafBGStyles} data-type="peaceOfMind">
                <ContentWrapper cssClass="gridList__container">
                    <div className="gridList__image" data-aos="fade">
                        {image && ImageLoader(image, '', '', 870, 885, 0.1)}
                    </div>
    
                    {items && <div className="gridList__content" data-type="list">
                        {header && <h2 className="themeHeader">{header}</h2>}
                        {propertyLeasingCopy ? <div className="rt" style={styles} dangerouslySetInnerHTML={{ __html: renderRichText(propertyLeasingCopy) }} /> : <p>{copy}</p>}
    
                        {items.map((item, i) => (
                            <div key={i} className="gridList__item" data-type="number">
                               <div className="gridList__item--icon" data-type="number"><span className="themeHeader">{i + 1}</span></div>
                               <div className="gridList__item--copy"><p>{item}</p></div>
                           </div>
                        ))}
                    </div>}
                </ContentWrapper>
            </section>
        )
    }

    if (type === 'peaceOfMind') {
        return renderPeaceOfMindGridList();
    } else {
        return renderGridList();
    }
}

export default GridList;