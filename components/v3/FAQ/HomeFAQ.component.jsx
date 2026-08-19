import { useState } from "react";
import ContentWrapper from "../../../sections/ContentWrapper.component";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const HomeFAQ = ({ items }) => {
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ((prev) => (prev === index ? null : index));
        submitGAEvent("faq_item_expanded");
    };

    if (!items || items.length === 0) return null;

    return (
        <section id="faq" className="faqV3 homeFAQ sp themeBGDark" data-aos="fade">
            <ContentWrapper cssClass="faqV3__wrapper" size="xl">
                <h2 className="faqV3__header">Frequently Asked<br />Questions</h2>

                <div className="faqV3__container">
                    <div className="faqV3__category--container">
                        <div className="faqV3__category active">
                            {items.map((faq, i) => {
                                const isActive = activeFAQ === i;
                                const itemClasses = ["faqV3__item"];
                                isActive && itemClasses.push("active");

                                return (
                                    <div
                                        key={i}
                                        className={itemClasses.join(" ")}
                                        onClick={() => toggleFAQ(i)}
                                    >
                                        <div className="faqV3__question">
                                            <h3 className="themeHeader">{faq.question}</h3>
                                            <div className="faqV3__question--icon themeBorder" aria-hidden="true"></div>
                                        </div>

                                        <div className="faqV3__answer">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );
};

export default HomeFAQ;
