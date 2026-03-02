import qs from "qs";
import { apiUrl } from "../../utils/apiUrl";
import { baseUrl } from "../../utils/baseUrl";

export default async function handler(req, res) {
    const propertyOrder = [
        {order: 3,  pageId: 'saintemilion'},
        {order: 4,  pageId: 'thecristina'},
        {order: 1,  pageId: 'carresaintlouis'},
        {order: 2,  pageId: 'johannesgardens'},
        {order: 5,  pageId: 'thenormand'},
        {order: 6,  pageId: 'lepinelodge'},
        {order: 7, pageId: 'johannescourt'},
        {order: 8,  pageId: 'howardgrant'},
        {order: 9, pageId: '40mcgill'},
        {order: 10, pageId: 'johannesgarden'},
        {order: 11,  pageId: 'lesjardinsfrancoise'},
        {order: 12,  pageId: 'renescourt'},
    ];

    let neighbourhoods = [];

    const propertiesQuery = qs.stringify({
        publicationState: 'live',
        populate: ['hero.content.image', 'address.city', 'logos.light'],  
        encodeValuesOnly: true
    });

    const propertiesUrl = `${apiUrl}/properties?${propertiesQuery}`;
    const propertiesRes = await fetch(propertiesUrl);
    const propertiesData = await propertiesRes.json();

    const comingSoonQuery = qs.stringify({
        publicationState: 'live',
        populate: ['hero.content.image', 'address.city'],
        encodeValuesOnly: true
    });

    const comingSoonUrl = `${apiUrl}/coming-soons?${comingSoonQuery}`;
    const comingSoonRes = await fetch(comingSoonUrl);
    const comingSoonData = await comingSoonRes.json();

    propertiesData.data.forEach(property => {
        const { name, pageId, hero, address, logos } = property.attributes;
        const order = propertyOrder.filter((p) => p.pageId === pageId)[0]?.order ? propertyOrder.filter((p) => p.pageId === pageId)[0].order : null;

        const p = { 
            name,
            city: address?.city?.data?.attributes?.name ? address?.city?.data?.attributes?.name : null,
            theme: pageId,
            href: `/property/${pageId}`,
            image: hero?.content?.image?.data?.attributes?.url ? baseUrl(hero.content.image.data.attributes.url) : null,
            svg: logos?.light?.data?.attributes?.url ? baseUrl(logos.light.data.attributes.url) : null,
            order
        }

        order && neighbourhoods.push(p);
    });

    comingSoonData.data.forEach(property => {
        const { name, pageId, hero, address } = property.attributes;
        const order = propertyOrder.filter((p) => p.pageId === pageId)[0]?.order ? propertyOrder.filter((p) => p.pageId === pageId)[0].order : 100;

        const p = { 
            name,
            city: address?.city?.data?.attributes?.name ? address?.city?.data?.attributes?.name : null,
            theme: pageId,
            href: `/comingsoon/${pageId}`,
            image: hero?.content?.image?.data?.attributes?.url ? baseUrl(hero.content.image.data.attributes.url) : null,
            svg: null,
            order
        }

        neighbourhoods.push(p);
    });

    neighbourhoods.sort((a, b) => a.order - b.order);

    return res.status(200).json(neighbourhoods);
}
