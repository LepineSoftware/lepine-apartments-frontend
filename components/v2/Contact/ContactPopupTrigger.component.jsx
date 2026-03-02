import Image from 'next/image';
import ChatIcon from '../../../assets/svg/chatIcon.svg';

const ContactPopupTrigger = ({ setContactOpen }) => {
    return (
        <div className="themeBtn contactPopupTrigger" onClick={() => setContactOpen(true)}>
            <Image src={ChatIcon} alt="Contact" width={35} height={35} />
        </div>
    )
}

export default ContactPopupTrigger;