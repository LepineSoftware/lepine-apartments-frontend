import LepineLogo from '../assets/svg/lepineLight.svg';
import Image from 'next/image';
import Link from 'next/link';
import ContentWrapper from './ContentWrapper.component';
import AppPopup from '../components/AppPopup.component';
import TranslucentButton from '../components/v2/TranslucentButton/TranslucentButton.component';
import FacebookLogo from '../assets/svg/facebook.svg';
import InstagramLogo from '../assets/svg/instagram.svg';
import YouTubeLogo from '../assets/svg/youtube.svg';
import LinkedInLogo from '../assets/svg/linkedin.svg';
import privacyPolicy from '../static/global/privacyPolicy.json';

const Footer = ({ findMyApartment, socialLinks, content }) => {
    const PrivacyPolicyTrigger = () => <p>Privacy Policy</p>

    return (
        <footer className="footer themeBGDark" id="footer">
            <ContentWrapper cssClass="footer__content">
                <div className="footer__logo">
                    <Image src={LepineLogo} alt="" width={287} height={87} />
                </div>

                <div className="footer__utility">
                    <p style={{ "user-select": "none" }}>&copy; Lépine Apartments. All Rights Reserved.</p>

                    <div className="footer__popup--container">
                        {content?.info?.email && <a href={`mailto:${content.info.email}`} rel="noreferrer">{content.info.email}</a>}
                        {content?.info?.phone && <a href={`tel:${content.info.phone}`} rel="noreferrer">{content.info.phone}</a>}
                    </div>

                    {privacyPolicy && <AppPopup trigger={PrivacyPolicyTrigger} copy={privacyPolicy.copy} gaEvent='privacy_policy_clicked' />}
                </div>

                <div className="footer__external">
                    {socialLinks && <div className="footer__socials--container">
                        {/* <p>Follow Us At</p> */}
                        <div className="footer__socials--icon">
                            <TranslucentButton type="facebook" icon={FacebookLogo} label="Facebook" link="https://www.facebook.com/LepineApartmentsOttawa" external />
                            <TranslucentButton type="instagram" icon={InstagramLogo} label="Instagram" link="https://www.instagram.com/lepineapartments" external />
                            <TranslucentButton type="youtube" icon={YouTubeLogo} label="YouTube" link="https://www.youtube.com/@LepineApartments" external />
                            <TranslucentButton type="linkedin" icon={LinkedInLogo} label="LinkedIn" link="https://ca.linkedin.com/company/l%C3%A9pine-corporation" external />
                        </div>
                    </div>}

                    {findMyApartment && <Link href="/#neighbourhoods">
                        <div className="btn themeBtn">Find My Apartment</div>
                    </Link>}
                </div>
            </ContentWrapper>
        </footer>
    )
}

export default Footer;