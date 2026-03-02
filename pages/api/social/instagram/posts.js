import qs from 'qs';

export default async function handler(req, res) {
    if (req.headers.authorization) {
        const query = qs.stringify({
            access_token: req.headers.authorization,
            fields: 'id,media_type,media_url,username,timestamp,caption,permalink,thumbnail_url',
            limit: req.query.limit
        });

        try {
            const url = `https://graph.facebook.com/v21.0/17841459889872075/media?${query}`;
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