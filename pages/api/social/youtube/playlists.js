import qs from 'qs';

export default async function handler(req, res) {
    if (req.headers.authorization) {
        if (req.query.id) {
            const query = qs.stringify({
                key: req.headers.authorization,
                playlistId: req.query.id,
                part: 'contentDetails,snippet,status,id',
                maxResults: 50,
            });

            try {
                const url = `https://www.googleapis.com/youtube/v3/playlistItems?${query}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.error) {
                    return res.status(data.error.code).json({ message: data.error.message });
                } else {
                    return res.status(200).json(data);
                }
            } catch (error) {
                return res.status(400).json(error)
            }
        } else {
            const query = qs.stringify({
                key: req.headers.authorization,
                playlistId: req.query.id,
                part: 'contentDetails,snippet,status,id',
                maxResults: 50,
                channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
            });

            const url = `https://www.googleapis.com/youtube/v3/playlists?${query}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                return res.status(data.error.code).json({ message: data.error.message });
            } else {
                return res.status(200).json(data);
            }

        }
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
}