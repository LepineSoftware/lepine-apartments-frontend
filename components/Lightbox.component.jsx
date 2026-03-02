import FsLightbox from 'fslightbox-react';

const Lightbox = ({ items, isActive, slide }) => {
    const keyItems = items.map(item => `${item}?key=${Math.random()}`);

    return (<FsLightbox
        toggler={isActive}
        sources={keyItems}
        slide={slide}
    />);
}

export default Lightbox;