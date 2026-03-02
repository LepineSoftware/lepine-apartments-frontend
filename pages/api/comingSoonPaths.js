import { apiUrl } from "../../utils/apiUrl";

export default async function handler(req, res) {
  const comingSoonUrl = `${apiUrl}/coming-soons`;
  const comingSoonRes = await fetch(comingSoonUrl);
  const comingSoonData = await comingSoonRes.json();

    const paths = comingSoonData.data.map(item => {
        const { pageId } = item.attributes;
        return {
            params: { id: pageId }
        };
    });
  
    return res.status(200).json(paths);
}