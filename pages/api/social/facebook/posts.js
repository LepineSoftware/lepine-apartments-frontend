import qs from 'qs';

export default async function handler(req, res) {
    if (req.headers.authorization) {
        const query = qs.stringify({
            access_token: req.headers.authorization,
            fields: 'id,created_time,message,is_popular,permalink_url,attachments{media},shares',
            limit: req.query.limit
        });

        try {
            const url = `https://graph.facebook.com/v20.0/101886242834304/posts?${query}`;
            const response = await fetch(url);
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json(error)
        }
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
}