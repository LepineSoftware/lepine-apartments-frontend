import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Lightbox from "../components/Lightbox.component";
import { useState, useEffect } from 'react';

import { ImageLoader } from '../utils/imageLoader'
import { submitGAEvent } from '../utils/submitGAEvent';
import Image from 'next/image';

const PropertyGallery = ({ id, images, lightbox, v2 }) => {    
    const [galleryActive, setGalleryActive] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(1);
    const [showGallery, setShowGallery] = useState(false);

    const openGalleryAtIndex = (i) => {
        setGalleryIndex(i);
        setGalleryActive(!galleryActive);
    }

    useEffect(() => {
        if (id) {
            const el = document.getElementById(id);

            if (el) {
                const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setShowGallery(true)));
                observer.observe(el);
            }
        }
    }, []);

    if (v2) {
        return (
            <div className="propertyGallery" data-gallery="v2">
                <div className="propertyGallery__current">
                    <Image src={images[galleryIndex]} height={500} width={500} />
                </div>

                <div className="propertyGallery__content">
                    {images.map((img, i) => <div className="propertyGallery__item" onClick={() => setGalleryIndex(i)}><Image src={img} height={500} width={500} /></div>)}
                    {images.map((img, i) => <div className="propertyGallery__item" onClick={() => setGalleryIndex(i)}><Image src={img} height={500} width={500} /></div>)}
                    {images.map((img, i) => <div className="propertyGallery__item" onClick={() => setGalleryIndex(i)}><Image src={img} height={500} width={500} /></div>)}
                    {images.map((img, i) => <div className="propertyGallery__item" onClick={() => setGalleryIndex(i)}><Image src={img} height={500} width={500} /></div>)}
                </div>
            </div>
        )
    } else {
        return (
          <>
             <div data-aos="fade-right" id={id}>
                {showGallery && <Swiper
                    spaceBetween={10}
                    slidesPerView="auto"
                    className="propertyGallery"
                    data-items={images.length}
                >
                        {images.map((image, i) => {                        
                            return (
                                <SwiperSlide key={i}>
                                    <div className="propertyGallery__image" data-image={i + 1} onClick={() => { openGalleryAtIndex(i + 1); submitGAEvent('property_gallery_opened')}}>
                                        {ImageLoader(image, '', 'Gallery', 497, 326, 0.1)}
                                    </div>
                                </SwiperSlide>
                            )
                    })}
                </Swiper>}
           </div>

            {showGallery && lightbox && <Lightbox isActive={galleryActive} items={images} slide={galleryIndex} />}
          </>
        )
    }
}

export default PropertyGallery;

