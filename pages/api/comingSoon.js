import { apiUrl } from "../../utils/apiUrl";
import { pageIdEquals } from "../../utils/strapiFilters";

export default async function handler(req, res) {
    const id = req.query.id;

    const comingSoonUrl = `
        ${apiUrl}/coming-soons?
        ${pageIdEquals}${id}
        &populate[1]=hero
        &populate[2]=hero.content
        &populate[3]=hero.content.image
        &populate[4]=address.city
        &populate[5]=address.city.coords
        &populate[6]=registration
        &populate[7]=registration.backgroundImage
        &populate[8]=design
        &populate[9]=design.image.subtitleIcon
        &populate[10]=design.image.image
        &populate[11]=gallery
        &populate[12]=stylishAndModern.desktopImage
        &populate[13]=stylishAndModern.mobileImage
        &populate[14]=meta
    `;

    const comingSoonRes = await fetch(comingSoonUrl);
    const comingSoonData = await comingSoonRes.json();
  
    const comingSoon = comingSoonData.data.map(comingSoon => {
      const { name, pageId, hero, address, registration, design, gallery, stylishAndModern, meta } = comingSoon.attributes;

      const addressContent = {
        id: address.id,
        postalCode: address.postalCode,
        streetAddress: address.streetAddress,
        city: {
            name: address.city.data.attributes.name,
            description: address.city.data.attributes.description,
            comingSoon: address.city.data.attributes.comingSoon,
            coords: address.city.data.attributes.coords
        }
      }

      const galleryImages = gallery.data.map(img => {
        return img.attributes.url;
    });
  
      return {
        name, pageId, hero, address: addressContent, registration, design, gallery: galleryImages, stylishAndModern, meta
      }
    });
  
    res.status(200).json(comingSoon);
}
  
