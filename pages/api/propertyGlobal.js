import { apiUrl } from "../../utils/apiUrl";
import { populate } from "../../utils/populate";
import { pageIdEquals } from "../../utils/strapiFilters";
import { parseStrapiSingleImage } from '../../utils/parseStrapiImages'
import { parseStrapiImageArray } from '../../utils/parseStrapiImages'

export default async function handler(req, res) {
    const globalPropertyUrl = `${apiUrl}/property-global?${populate}`;
    const globalPropertyRes = await fetch(globalPropertyUrl);
    let globalPropertyData = await globalPropertyRes.json();

    const personaImages = parseStrapiImageArray(globalPropertyData.data.attributes.listings.personas);

    const response = {
        listings: {
            personas: {
                images: personaImages
            }
        }
    }

    return res.status(200).json(response);
}
  
