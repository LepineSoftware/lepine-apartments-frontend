import Image from 'next/image';
import CloseIcon from '../../../assets/svg/menuCloseLight.svg';

const ContactFormPopup = ({ contactPopupIsActive, setContactPopupIsActive, children }) => {
    const classes = ['contactFormPopup'];
    contactPopupIsActive && classes.push('active');

    return (
        <section className={classes.join(' ')}>
            <div className="contactFormPopup__close themeBtn" onClick={() => setContactPopupIsActive(false)}>
                <Image src={CloseIcon} height={20} width={20} alt="Close" />
            </div>

            <div className="contactFormPopup__content">
                {children}
            </div>
        </section>
    )
}

export default ContactFormPopup;