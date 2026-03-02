import { apiUrl } from "../../utils/apiUrl";
import qs from "qs";

export default async function handler(req, res) {
    const query = qs.stringify({
        publicationState: 'live',
        fields: ['slug'],
    });

    const url = `${apiUrl}/blogs?${query}`;
    const response = await fetch(url);
    const data = await response.json();

    const slugs = data.data.map(post => {
        const { slug } = post.attributes;
        return {
            params: { slug, id: post.id }
        };
    });
  
    return res.status(200).json(slugs);
}