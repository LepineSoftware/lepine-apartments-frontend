import { apiUrl } from "../../utils/apiUrl";
import { populate } from "../../utils/populate";

export default async function handler(req, res) {
    const suitesUrl = `${apiUrl}/property-suite?${populate}`;
    const suitesRes = await fetch(suitesUrl);
    let suitesData = await suitesRes.json();

    const finishesGallery = suitesData.data.attributes.finishesGallery.data.map(item => {
        if (item.attributes.url) return item.attributes.url;
    });

    suitesData.data.attributes.finishesGallery = finishesGallery;

    const cards = suitesData.data.attributes.cards.map(card => {
        return {
            id: card.id,
            title: card.title,
            copy: card.copy,
            link: card.link,
            image: card.image.data.attributes.url,
        }
    });

    suitesData.data.attributes.cards = cards;
  
    res.status(200).json(suitesData.data.attributes);
}
  
