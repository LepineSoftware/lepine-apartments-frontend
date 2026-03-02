const { apiUrl } = require("./apiUrl");
import qs from "qs";

module.exports = async () => {
    const query = qs.stringify({
        populate: {
            hero: {
                fields: ['header', 'copy', 'link'],
                populate: ['image', 'overlayImage']
            },
            meta: {
                fields: ['description'],
            }
        },
        encodeValuesOnly: true
      });
    
      const url = `${apiUrl}/newsroom?${query}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
}