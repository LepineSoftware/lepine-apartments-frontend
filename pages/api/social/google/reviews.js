import qs from 'qs';

export default async function handler(req, res) {
    const places = [
        { label: 'Head Office', id: 'ChIJVVUlJ_j_0UwRmVhl3repoc8' },
        { label: 'Howard Grant', id: 'ChIJ7YlKJFT9zUwRRdxtluzpUTk' },
        { label: 'Johannes Court', id: 'ChIJy8O_aZsO0kwRIeBp9g6QL9w' },
        { label: '40 McGill', id: 'ChIJDyyMi-mJzUwRqCIqgzfv36o' },
        { label: 'Saint Emilion', id: 'ChIJA-Dun-r_zUwRk3xUv1j8RLg' }
    ];

    let reviewsarr = [];

    const fetchData = async (p) => {
        const query = qs.stringify({
            key: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_API_KEY,
            placeid: p.id,
        });
        const url = `https://maps.googleapis.com/maps/api/place/details/json?${query}`;
        const response = await fetch(url, {
            method: "POST",
            cors: 'no-cors'
        });
        const data = await response.json();
        return data;
        
    }

    try {
        await Promise.all(places.map((place, i) => fetchData(place))).then((resolvedValues) => {
            resolvedValues.forEach((place) => {
              if (place?.result?.reviews) {
                const result = place?.result;
    
                result.reviews.forEach(r => {
                    reviewsarr.push({
                        name: result.name,
                        ...r
                    });
                })
              }
            });

            reviewsarr.sort((a, b) => b.time - a.time);

            return res.status(200).json(reviewsarr);
          });
    } catch (error) {
        return res.status(400).json(reviewsarr);
    }
}