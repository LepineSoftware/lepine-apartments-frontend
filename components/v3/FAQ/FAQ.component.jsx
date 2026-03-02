import { useState } from "react";
import ContentWrapper from '../../../sections/ContentWrapper.component';
import { renderRichText } from "../../../utils/renderRichText";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const FAQV3 = ({ content, bgImage }) => {
    const [currentCategory, setCurrentCategory] = useState('building');

    const styles = { backgroundImage: `url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' };
    
    const FAQButton = ({ category }) => {
        const classes = ['faqV3__btn'];
        currentCategory === category ? classes.push('themeBGDark', 'active') : classes.push('themeBGLight');

        return (
            <div className={classes.join(' ')} data-faq={category} onClick={() => { toggleFAQCategory(category); submitGAEvent('faq_category_changed'); }}>
                <h3 className="faqV3__btn--copy">The {category}</h3>
            </div>
        )
    }

    const FAQSection = ({ category, items }) => {
        const classes = ['faqV3__category'];
        currentCategory === category && classes.push('active');


        const [activeFAQ, setActiveFAQ] = useState(0);

        return (
            <div className={classes.join(' ')} data-faq={category}>
                {
                    items.map((faq, i) => {
                        return (
                            <FAQItem key={i} question={faq.question} answer={faq.answer} isActive={i === activeFAQ} setActiveFAQ={setActiveFAQ} faqKey={i} />
                        )
                    })
                }
            </div>
        )
    }

    const FAQItem = ({ question, answer, isActive, setActiveFAQ, faqKey }) => {
        const itemClasses = ['faqV3__item'];
        isActive && itemClasses.push('active');

        const questionClasses = ['faqV3__question'];
        // isActive && questionClasses.push('themeBGDark');

        const questionHeaderClasses = ['themeHeader'];

        return (
            <div className={itemClasses.join(' ')} onClick={() => { setActiveFAQ(faqKey); submitGAEvent('faq_item_expanded'); }}>
                <div className={questionClasses.join(' ')}>
                    <h3 className={questionHeaderClasses.join(' ')}>{question}</h3>
                    <div className="faqV3__question--icon themeBorder">
                        {isActive ? '-' : '+'}
                    </div>
                </div>

                <div className="faqV3__answer">
                    {answer && <div dangerouslySetInnerHTML={{ __html: renderRichText(answer) }} />}
                </div>
            </div>
        );
    }

    const toggleFAQCategory = (category) => {
        category !== currentCategory && setCurrentCategory(category);
    }

    return (
            <section id="faqV3" className="faqV3 sp themeBGDark" data-aos="fade">
                <div className="faqV3__bg" style={styles}></div>

                <ContentWrapper cssClass="faqV3__wrapper" size="xl">
                    <h2 className="faqV3__header">Frequently Asked<br/>Questions</h2>

                    <div className="faqV3__container">
                        <div className="faqV3__btn--container">
                            {content.map((c, i) => c.items.length > 0 && <FAQButton key={i} category={c.category} />)}
                        </div>

                        <div className="faqV3__category--container">
                            {content.map((category, i) => {
                                return <FAQSection key={i} category={category.category} items={category.items} />
                            })}
                        </div>
                    </div>
                </ContentWrapper>
            </section>
    )
}

export default FAQV3;