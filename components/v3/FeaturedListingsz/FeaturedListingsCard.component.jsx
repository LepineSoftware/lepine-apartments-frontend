import { useState, useEffect } from 'react';

import FloorplanIcon from '../../../assets/svg/floorplanIcon.svg';
import Image from 'next/image';

// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// import PropertyListingsPopup from '../../PropertyListingsPopup.component';

import { submitGAEvent } from '../../../utils/submitGAEvent';

const ListingCardV2 = ({ type, content, city, property, popupImage, pageId, registrationPortalId, registrationFormId, goalName, disableListingsPricing, leasingPhoneNumber, initListings, setInitListings, favouriteListings, setFavouriteListings }) => {
    const { id, unitId, title, sqft, price, image, pdf, numOfBeds, numOfBaths, model, officeDen } = content;

    const floorplanWidth = 163;
    const floorplanHeight = 217;

    const floorplan = image ? `https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/${pageId}/floorplans/${image}` : null;
    const floorplanPdf = pdf ? `https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/${pageId}/floorplans/${pdf}` : null;

    const FloorplanLoader = () => `${floorplan}?w=${floorplanWidth}&h=${floorplanHeight}&q=${10}`;

    let listingCardClassesInit = ['featuredListingsCardV3', 'fadeIn'];
    let listingCardClassesAfterLoad = ['featuredListingsCardV3'];

    const [listingCardClasses, setListingCardClasses] = useState(listingCardClassesInit);

    useEffect(() => {
        setTimeout(() => {
            setListingCardClasses(listingCardClassesAfterLoad)
        }, 1000);
    }, [title]);
    
    const CardHeader = ({ title, numOfBeds, officeDen }) => {
        return (
        <div className="featuredListingsCardV3__header">
            <div className='featuredListingsCardV3__title themeHeader'>
                {title ? <h4>{title}</h4> : <h4>{numOfBeds ? `${numOfBeds} Bed` : ''}{officeDen ? ' + Office' : ''}</h4>}
            </div>

            <div className="featuredListingsCardV3__sqft themeSVGDark">
                <p>{sqft} sqft</p>
            </div>
        </div>
        );
    };

    // const ListingCard = () => (
    //     <div className={listingCardClasses.join(' ')}>
    //         <CardHeader numOfBeds={numOfBeds} type={type} unitId={unitId} title={title} officeDen={officeDen} />
            
    //         <div className="featuredListingsCardV3__image">
    //             {floorplan && <Image loader={FloorplanLoader} key={Math.random()} src={floorplan} alt="" height={floorplanHeight} width={floorplanWidth} />}
    //         </div>

    //         <div className="featuredListingsCardV3__utility">
    //             {/* {type !== 'leasing' ? <p>Available NOW!</p> : (price && price !== 0 ? <h4>${price}</h4> : '')} */}
    //         </div>

    //         <div className="featuredListingsCardV3__footer themeBGLight">
    //             <Image src={FloorplanIcon} alt="" height={24} width={24} />
    //             <span>View Floorplan</span>
    //         </div>
    //     </div>
    // );

    // return (
    //     <Popup 
    //         trigger={ListingCard}
    //         modal
    //         nested
    //         onOpen={() => submitGAEvent('property_listing_clicked')}
    //     >
    //         {close => (
    //             <PropertyListingsPopup
    //                 id={id}
    //                 unitId={unitId}
    //                 type={type}
    //                 close={close} 
    //                 pageId={type === 'commercial' ? null : pageId}
    //                 title={title}
    //                 property={property}
    //                 city={city}
    //                 model={model}
    //                 sqft={sqft}
    //                 price={price}
    //                 numOfBeds={numOfBeds}
    //                 numOfBaths={numOfBaths}
    //                 pdf={floorplanPdf}
    //                 popupImage={popupImage}
    //                 floorplan={floorplan}
    //                 registrationPortalId={registrationPortalId}
    //                 registrationFormId={registrationFormId}
    //                 goalName={goalName}
    //                 disableListingsPricing={disableListingsPricing}
    //                 leasingPhoneNumber={leasingPhoneNumber}
    //                 initListings={initListings}
    //                 listing={content}
    //                 setInitListings={setInitListings}
    //         />)}
    //     </Popup>
    // )

    return (
        <a className={listingCardClasses.join(' ')} href={floorplanPdf} rel="noreferrer" target="_blank" onClick={() => submitGAEvent('property_listing_clicked')}>
            <CardHeader numOfBeds={numOfBeds} type={type} unitId={unitId} title={title} officeDen={officeDen} />
            
            <div className="featuredListingsCardV3__image">
                {floorplan && <Image loader={FloorplanLoader} key={Math.random()} src={floorplan} alt="" height={floorplanHeight} width={floorplanWidth} />}
            </div>

            <div className="featuredListingsCardV3__utility">
                {/* {type !== 'leasing' ? <p>Available NOW!</p> : (price && price !== 0 ? <h4>${price}</h4> : '')} */}
            </div>

            {pageId !== '40mcgill' && <div className="featuredListingsCardV3__footer themeBGLight">
                <Image src={FloorplanIcon} alt="" height={24} width={24} />
                <span>View Floorplan</span>
            </div>}
        </a>
    )
}

export default ListingCardV2;