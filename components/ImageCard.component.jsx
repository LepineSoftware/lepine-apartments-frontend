import vrIcon from '../assets/svg/vr.svg';
import Image from 'next/image';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import menuCloseIcon from '../assets/svg/menuCloseLight.svg'
import { ImageLoader } from '../utils/imageLoader';
import { useState } from 'react';


const ImageCard = ({ header, copy, image, link, cardIndex }) => {    
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <>
            <div className="imageCard" onClick={() => setOpen(o => !o)}>
                <div className="imageCard__image">
                    <div className="imageCard__icon">
                    <Image src={vrIcon} alt="" height={30} width={30} />
                    </div>
                    
                    {ImageLoader(image, '', '', 348, 320, 10)}
                </div>

                <div className="imageCard__content">
                    <h3 className="imageCard__header themeHeader">{header}</h3>
                    <p className="imageCard__copy">{copy}</p>
                </div>

                <div className="imageCard__footer themeCardFooter">
                    <Image src={vrIcon} alt="" height={30} width={30} />
                    <span>View Model Suite Tour</span>
                </div>
            </div>
            
            <Popup key={Math.random()} open={open} closeOnDocumentClick onClose={closeModal} modal nested>
                <div className="imageCard__popup bgPrimary">
                    <div className="imageCard__popup--close">
                        <Image src={menuCloseIcon} alt="" height={25} width={25} />
                    </div>

                    <iframe key={link} id={link} src={link} frameBorder="0"></iframe>
                </div>
            </Popup>
        </>
    )
}

export default ImageCard;