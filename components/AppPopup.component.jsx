import Image from 'next/image';

import menuCloseIcon from '../assets/svg/menuClose.svg';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { renderRichText } from '../utils/renderRichText';
import { submitGAEvent } from '../utils/submitGAEvent';


const AppPopup = ({ trigger, header, copy, video, gaEvent }) => {
    const PopupContent = ({ close }) => {
        return (
            <div className="footer__popup bgPrimary">
                <div className="footer__popup--close" onClick={close}>
                    <Image src={menuCloseIcon} alt="" width={25} height={25} />
                </div>
                    {copy && <div dangerouslySetInnerHTML={{ __html: renderRichText(copy) }} />}
            </div>
        )
    }

    const VideoContent = ({ close }) => {
        return (
            <div className="footer__popup footer__popup--video">

                <iframe
                    id="player"
                    type="text/html"
                    src={video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
                />
            </div>
        )
    }
    
    

    if (video) {
        return (<Popup trigger={trigger} modal nested onOpen={() => gaEvent && submitGAEvent(gaEvent)}>
            {close => (<VideoContent close={close} />)}
        </Popup>)
    } else {
        return (<Popup trigger={trigger} modal nested onOpen={() => gaEvent && submitGAEvent(gaEvent)}>
            {close => (<PopupContent close={close} />)}
        </Popup>)
    }
}

export default AppPopup;