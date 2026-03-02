import NominationForm from '../../../pages/herosridge/components/NominationForm.component';
import { ImageLoader } from '../../../utils/imageLoader';
import { renderRichText } from '../../../utils/renderRichText';

const SideImageContent = ({
    imageLeft,
    imageRight,
    header,
    copy,
    btnCopy,
    file,
    disclaimer,
    id,
    herosRidge,
    heroForm
}) => {

    const mobileInfoBG = {
        backgroundImage: `url('${imageRight}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.25
    }

    if (heroForm) {
            return (
                <section className="sideImageContent" id={id}>
                    <div className="sideImageContent__col" data-col="img1" data-aos="fade-right">
                        {ImageLoader(imageLeft, '', '', 650, 500, 10)}
                    </div>

                    <div className="sideImageContent__col" data-col="cta">
                        <div className="sideImageContent__copy">
                            {header && <h2>Nominate Your Hero</h2>}
                            <p className='sideImageContent__rt'>Fill out the form to nominate a Canadian Armed Forces veteran to be honoured in Lepine&apos;s box suite, Hero&apos;s Ridge, at an upcoming Ottawa Senators home game.</p>
                            
                            {disclaimer && <p>{disclaimer}</p>}
                            {btnCopy && file && <a href={file} target="_blank" rel="noreferrer" className="btn jostBold">Download Mail-In Copy</a>}

                            <NominationForm />

                            {herosRidge && <p>Read more at <a className="herosRidgeRed" href="http://policy.herosridge.ca/" target="_blank" rel='noreferrer'>policy.herosridge.ca</a></p>}
                        </div>
                    </div>

                    <div className="sideImageContent__col" data-col="img2" data-aos="fade-left">
                        {ImageLoader(imageRight, '', '', 650, 500, 10)}
                    </div>
                </section>
            );
    } else {
        return (
            <section className="sideImageContent" id={id}>
                <div className="sideImageContent__row" data-row="main">
                    <div className="sideImageContent__col sideImageContent__col--img1" data-col="img" data-aos="fade-right">
                        {ImageLoader(imageLeft, '', '', 650, 500, 10)}
                    </div>
                    <div className="sideImageContent__col" data-col="cta">
                    <div className="sideImageContent__copy">
                            {header && <h2>{header}</h2>}
                            {copy && <div className='sideImageContent__rt' dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />}
                            {btnCopy && file && <a href={file} target="_blank" rel="noreferrer" className="btn jostBold">{btnCopy}</a>}
                            {disclaimer && <p>{disclaimer}</p>}
                            {herosRidge && <p>Read more at <a className="herosRidgeRed" href="http://policy.herosridge.ca/" target="_blank" rel='noreferrer'>policy.herosridge.ca</a></p>}
                    </div>
                    </div>
                    <div className="sideImageContent__col sideImageContent__col--img2" data-col="img" data-aos="fade-left">
                        {ImageLoader(imageRight, '', '', 650, 500, 10)}
                    </div>
                </div>
            </section>
        );
    }

}

export default SideImageContent;