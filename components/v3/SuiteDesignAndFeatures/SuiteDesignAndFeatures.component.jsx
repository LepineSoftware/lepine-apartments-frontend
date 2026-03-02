import ContentWrapper from "../../../sections/ContentWrapper.component";
import { ImageLoader } from "../../../utils/imageLoader";

import {  Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { submitGAEvent } from "../../../utils/submitGAEvent";

const SuiteDesignAndFeatures = ({ design, features }) => {    
    return (
        <section className="suiteDesignAndFeatures sp">
            <ContentWrapper size="xl">
                {design.image && <div className="suiteDesignAndFeatures__col" data-col="designImage">
                    {ImageLoader(design.image, '', '', 1000, 1000, 0.1)}
                </div>}

                {design.items && <div className="suiteDesignAndFeatures__col" data-col="designItems">
                    {design.header && <h2 className="themeHeader">{design.header}</h2>}
                    <ul>
                        {design.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>}

                {features.items && <div className="suiteDesignAndFeatures__col" data-col="featuresItems">
                    {features.items && <h2 className="themeHeader">{features.header}</h2>}
                    <ul>
                        {features.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    {features.pdf && features.btnCopy && <a href={features.pdf} target="_blank" rel="noreferrer" className="btn themeBtn" onClick={() => submitGAEvent('download_suites_features_finishes_pdf')}>{features.btnCopy}</a>}
                </div>}

                {features.gallery && <div className="suiteDesignAndFeatures__col" data-col="featuresGallery">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={25}
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{ delay: 2500 }}
                        className="suiteDesignAndFeatures__swiper"
                    >
                        {features.gallery.map((image, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    {ImageLoader(image, '', '', 773, 500, 10)}
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>}
            </ContentWrapper>
        </section>
    )
}

export default SuiteDesignAndFeatures;