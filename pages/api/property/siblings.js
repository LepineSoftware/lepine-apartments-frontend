import qs from "qs";
import { apiUrl } from "../../../utils/apiUrl";
import { baseUrl } from "../../../utils/baseUrl";

export default async function handler(req, res) {
    const { property } = req.query;

    let query;

    if (property) {
        query = qs.stringify({
            publicationState: 'live',
            populate: ['properties.address.coords', 'properties.hero.content.image'],
            filters: {
                properties: {
                    pageId: {
                        $eq: property
                    }
                }
            },    
            encodeValuesOnly: true
        });
    } else {
        query = qs.stringify({
            publicationState: 'live',
            populate: ['properties.address.coords', 'properties.hero.content.image'],
            encodeValuesOnly: true
        });
    }
    
    const url = `${apiUrl}/cities?${query}`;
    const response = await fetch(url);
    const data = await response.json();

    const t = data.data.map(c => {
        const { name, properties } = c.attributes;
        const p = properties.data.map(p => {

        const { name, address, pageId, hero } = p.attributes;
        const image = hero?.content?.image?.data?.attributes?.url ? baseUrl(hero.content.image.data.attributes.url) : null;

        return { 
            name,
            pageId,
            address,
            image
        }
        });

        return {
            name,
            properties: p
        }
    });

    if (property) {
        const siblingProperties = t.map(c => {
            const filteredProperties = c.properties.filter(p => p.pageId !== property);

            return {
                name: c.name,
                properties: filteredProperties
            }
        });

        return res.status(200).json(siblingProperties)
    } else {
        return res.status(200).json(t);
    }
}
