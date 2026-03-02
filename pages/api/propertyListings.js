import { apiUrl } from "../../utils/apiUrl";
import calculateSqftRange from '../../utils/calculateSqftRange';
import calculateUnitType from '../../utils/calculateUnitType';

export default async function handler(req, res) {
    const { property, isFeatured, stats } = req.query;

    let baseUrl = `${apiUrl}/property-listings?[filters][property][$eq]=${property}`;

    if (isFeatured) baseUrl += `&[filters][isFeatured][$eq]=true`;
    if (stats) baseUrl += `&[filters][isFeatured][$eq]=true`;

    const options = {
        headers: {
            "Authorization": req.headers.authorization
        }
    }

    try {
        const propertyListingsRes = await fetch(baseUrl, options);
        const propertyListingsData = await propertyListingsRes.json();
    
        const response = propertyListingsData.data.map(listing => {
            const { numOfBeds, officeDen, sqft, balcony, terrace, juliet, model } = listing.attributes;
    
            let outdoorSpace = 'None';
    
            if (balcony) outdoorSpace = 'Balcony';
            if (terrace) outdoorSpace = 'Terrace';
            if (juliet) outdoorSpace = 'Juliet';
    
            const parsedModel = model ? model : '';
    
            const item = {
                id: listing.id,
                unitType: calculateUnitType(numOfBeds, officeDen),
                sqftRange: calculateSqftRange(sqft),
                outdoorSpace,
                ...listing.attributes,
                model: parsedModel,
            }
    
            return item;
        });
    
        return res.status(200).json(response);
    } catch (error) {
        return res.status(403).json([])
    }
}
  