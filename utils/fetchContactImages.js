const { apiUrl } = require("./apiUrl");
import qs from "qs";

module.exports = async () => {
    const query = qs.stringify({
        populate: {
            contactUs: {
                fields: ['header', 'subtitle', 'copy'],
                populate: ['images.image']
            }
        },
        encodeValuesOnly: true
      });
    
      const url = `${apiUrl}/home?${query}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.data.attributes.contactUs.images;
}