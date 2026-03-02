import { apiUrl } from "../../utils/apiUrl";
import { populate } from "../../utils/populate";
import { pageIdEquals } from "../../utils/strapiFilters";
import { parseStrapiSingleImage } from '../../utils/parseStrapiImages'
import { parseStrapiImageArray } from '../../utils/parseStrapiImages'

export default async function handler(req, res) {
    const id = req.query.id;

    const propertyUrl = `${apiUrl}/properties?${pageIdEquals}${id}&${populate}`;

    const propertyRes = await fetch(propertyUrl);
    let propertyData = await propertyRes.json();

    const data = propertyData.data[0].attributes;

    const { name, pageId, displayMap, hero, logos, address, propertySuite, listings, features, gallery, map, orbit, faq, leasingTeam, contact, guides, popup, meta } = data;

    const heroResponse = {
        header: hero.header,
        description: hero.description,
        content: {
            type: hero.content.type,
            video: hero.content.video,
            image: parseStrapiSingleImage(hero.content.image),
        }
    };

    const logosResponse = {
        light: parseStrapiSingleImage(logos.light),
        dark: parseStrapiSingleImage(logos.dark),
        markers: {
            propertyPage: parseStrapiSingleImage(logos.markers.propertyPage),
            homePage: parseStrapiSingleImage(logos.markers.homePage)
        }
    };

    const addressResponse = {
        postalCode: address.postalCode,
        streetAddress: address.streetAddress,
        coords: address.coords,
        city: {
            name: address.city.data.attributes.name,
            description: address.city.data.attributes.description,
        }
    };

    const propertySuiteResponse = {
        copy: propertySuite.copy,
        pdf: parseStrapiSingleImage(propertySuite.pdf),
        image: parseStrapiSingleImage(propertySuite.image),
    };

    const listingsContentResponse = listings.content.map(item => {
        return {
            code: item.code,
            description: item.description,
            title: item.title,
            sqft: item.sqft,
            balcony: item.balcony,
            tub: item.tub,
            pantry: item.pantry,
            terrace: item.terrace,
            walkInCloset: item.walkInCloset,
            barrierFree: item.barrierFree,
            officeDen: item.officeDen,
            numOfBeds: item.numOfBeds,
            numOfBaths: item.numOfBaths,
            unitId: item.unitId,
            price: item.price,
            pdf: parseStrapiSingleImage(item.pdf),
            image: parseStrapiSingleImage(item.image)
        }
    });

    const listingsResponse = {
        header: listings.header,
        moveInDate: listings.moveInDate,
        copy: listings.copy,
        registrationPortalId: listings.registrationPortalId,
        registrationFormId: listings.registrationFormId,
        goalName: listings.goalName,
        bookAppointmentUrl: listings.bookAppointmentUrl,
        priceRange: listings.priceRange,
        contactCopy: listings.contactCopy,
        noListingsCTA: listings.noListingsCTA,
        disableListingsPricing: listings.disableListingsPricing,
        popupImage: parseStrapiSingleImage(propertySuite.popupImage),
        content: listingsContentResponse
    };

    const featuresAmenitiesResponse = features.amenities.map(item => {
        return {
            card: {
                copy: item.card.data.attributes.copy,
                icon: parseStrapiSingleImage(item.card.data.attributes.icon),    
            },
            image: parseStrapiSingleImage(item.card.data.attributes.image),    
        }
    });

    const featuresResponse = {
        copy: features.copy,
        amenities: featuresAmenitiesResponse,
        gallery: parseStrapiImageArray(features.gallery),
        desktopImage: parseStrapiSingleImage(features.desktopImage),
        mobileImage: parseStrapiSingleImage(features.mobileImage),
        pdf: parseStrapiSingleImage(features.pdf)
    };

    const orbitResponse = {
        video: orbit.video,
        displayMap: orbit.displayMap,
        images: parseStrapiImageArray(orbit.images)
    };

    const leasingTeamResponse = {
        header: leasingTeam.header,
        copy: leasingTeam.copy,
        image: parseStrapiSingleImage(leasingTeam.image),
        subtitleIcon: parseStrapiSingleImage(leasingTeam.subtitleIcon)
    };

    const contactResponse = {
        portalId: contact.portalId,
        formId: contact.formId,
        goalName: contact.goalName
    };

    const guidesResponse = {
        downsizing: { image: parseStrapiSingleImage(guides.downsizing.image) },
        downPayment: { image: parseStrapiSingleImage(guides.downPayment.image) },
    };

    const returnPopup = () => {
        popup ? ({
            isActive: popup.isActive,
            time: popup.time,
            content: {
                header: popup.content.data.attributes.header,
                copy: popup.content.data.attributes.copy,
                theme: popup.content.data.attributes.theme,
                type: popup.content.data.attributes.type,
                popupId: popup.content.data.attributes.popupId,
                button: popup.content.data.attributes.button,
                image: parseStrapiSingleImage(popup.content.data.attributes.image),
                logo: parseStrapiSingleImage(popup.content.data.attributes.logo),
                thirdRow: {
                    header: popup.content.data.attributes.thirdRow.header,
                    copy: popup.content.data.attributes.thirdRow.copy,
                    icon: parseStrapiSingleImage(popup.content.data.attributes.thirdRow.icon),
                    button: {
                        copy: popup.content.data.attributes.thirdRow.button.copy,
                        link: popup.content.data.attributes.thirdRow.button.link,
                        linkDestination: popup.content.data.attributes.thirdRow.button.linkDestination
                    }
                }
            }
        }) : null
    }

    const popupResponse = returnPopup();

    const response = {
        name,
        pageId,
        displayMap,
        hero: heroResponse,
        logos: logosResponse,
        address: addressResponse,
        propertySuite: propertySuiteResponse,
        listings: listingsResponse,
        features: featuresResponse,
        gallery: parseStrapiImageArray(gallery),
        map,
        orbit: orbitResponse,
        faq,
        leasingTeam: leasingTeamResponse,
        contact: contactResponse,
        guides: guidesResponse,
        popup: popupResponse,
        meta
    };


    res.status(200).json(response);
}
  
