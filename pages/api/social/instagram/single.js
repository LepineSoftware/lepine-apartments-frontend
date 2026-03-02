import qs from 'qs';

export default async function handler(req, res) {
    const id = req.query.id;

    if (id) {
        if (req.headers.authorization) {
            const query = qs.stringify({
                access_token: req.headers.authorization,
                fields: 'id,media_type,media_url,username,timestamp,caption,permalink,thumbnail_url',
                limit: req.query.limit
            });
    
            try {
                const url = `https://graph.instagram.com/me/media?${query}`;
                const response = await fetch(url);
                const data = await response.json();
                let post = []; 
                data.data.forEach(p => {
                    if (p.permalink.includes(id)) post.push(p);
                });
                return res.status(200).json({ data: post });
            } catch (error) {
                return res.status(400).json(error)
            }
        } else {
            return res.status(403).json({ message: 'Forbidden' })
        }
    } else {
        return res.status(400).json([])
    }
}