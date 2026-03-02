import { apiUrl } from "../../utils/apiUrl";
import { populate } from "../../utils/populate";

export default async function handler(req, res) {
    const faqUrl = `${apiUrl}/faq?${populate}`;
    const faqRes = await fetch(faqUrl);
    const faqData = await faqRes.json();

    const faqs = [
        {
            category: 'suites',
            items: faqData.data.attributes.suites,
        },
        {
            category: 'building',
            items: faqData.data.attributes.building,
        },
        {
            category: 'application',
            items: faqData.data.attributes.application,
        }
    ]
  
    res.status(200).json(faqs);
}
  
