import qs from 'qs';

export default async function handler(req, res) {
    if (req.headers.authorization === process.env.NEXT_PUBLIC_LEPINE_MARKETING_DASHBOARD_AUTH) {
        const query = qs.stringify({
            author: 'urn:li:organization:11056646',
            q: 'author',
            count: 50,
            sortBy: 'LAST_MODIFIED'
        });

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'LinkedIn-Version': '202509',
                'X-Restli-Protocol-Version': '2.0.0',
                'X-RestLi-Method': 'FINDER',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LINKEDIN_MARKETING_API_TOKEN}`
            }
        }

        try {
            const url = `https://api.linkedin.com/rest/posts?${query}`;
            const response = await fetch(url, options)
            const data = await response.json();

            if (data.paging) {
                return res.status(200).json(data);
            } else {
                return res.status(400).json(data);
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
}