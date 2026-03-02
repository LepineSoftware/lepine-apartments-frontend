import { apiUrl } from "../../utils/apiUrl";
import { parseStrapiSingleImage } from "../../utils/parseStrapiImages";

export default async function handler(req, res) {
    const { property } = req.query;

    let testimonialsUrl = `${apiUrl}/testimonials`;

    if (property) {
      testimonialsUrl += `?populate[1]=image&populate[2]=properties&filters[properties][pageId][$eq]=${property}&sort[3]=video:asc`;  
    } else {
      testimonialsUrl += `?populate[1]=image&populate[2]=properties&sort[3]=video:asc`;
    }

    const testimonialsRes = await fetch(testimonialsUrl);
    const testimonialsData = await testimonialsRes.json();
  
    const testimonials = testimonialsData.data.map(testimonial => {
      const { name, description, copy, image, video, properties } = testimonial.attributes
  
      return {
        name,
        description,
        copy,
        image: parseStrapiSingleImage(image),
        video,
      }
    });

    return res.status(200).json(testimonials);
}