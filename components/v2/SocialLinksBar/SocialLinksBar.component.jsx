import FacebookLogo from '../../../assets/svg/facebook.svg';
import InstagramLogo from '../../../assets/svg/instagram.svg';
import YouTubeLogo from '../../../assets/svg/youtube.svg';
import LinkedInLogo from '../../../assets/svg/linkedin.svg';
import TranslucentButton from "../TranslucentButton/TranslucentButton.component";

const SocialLinksBar = () => {
    return (
        <div className="socialLinksBar" data-aos="fade">
            <TranslucentButton type="facebook" icon={FacebookLogo} label="Facebook" link="https://www.facebook.com/LepineApartmentsOttawa" external />
            <TranslucentButton type="instagram" icon={InstagramLogo} label="Instagram" link="https://www.instagram.com/lepineapartments" external />
            <TranslucentButton type="youtube" icon={YouTubeLogo} label="YouTube" link="https://www.youtube.com/@LepineApartments" external />
            <TranslucentButton type="linkedin" icon={LinkedInLogo} label="LinkedIn" link="https://ca.linkedin.com/company/l%C3%A9pine-corporation" external />
            {/* <p>Follow Us At</p> */}
        </div>
    )
}

export default SocialLinksBar;