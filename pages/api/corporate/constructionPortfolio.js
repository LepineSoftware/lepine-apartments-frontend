import { apiUrl } from "../../../utils/apiUrl";
import { parseStrapiSingleImage, parseStrapiImageArray } from "../../../utils/parseStrapiImages";
import qs from "qs";

export default async function handler(req, res) {
    const query = qs.stringify({
        publicationState: 'live',
        fields: ['year', 'description', 'name', 'slug'],
        sort: ['year'],
        populate: {
            image: {
                fields: ['url', 'height', 'width', 'alt', 'caption']
            },
            gallery: {
                fields: ['url', 'height', 'width', 'alt', 'caption']
            },
            logo: {
                fields: ['url', 'height', 'width', 'alt', 'caption']
            },
            encodeValuesOnly: true
        }
    });

    const url = `${apiUrl}/construction-portfolios?${query}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
        return res.status(200).json([]);
    } else {
        const objs = data.data.map(item => ({
            id: item.id,
            year: item.attributes.year,
            description: item.attributes.description.map(item => item.children[0].text),
            name: item.attributes.name,
            slug: item.attributes.slug,
            image: parseStrapiSingleImage(item.attributes.image),
            logo: parseStrapiSingleImage(item.attributes.logo),
            gallery: parseStrapiImageArray(item.attributes.gallery),
        }));

        return res.status(200).json(objs);

    }
}
  
