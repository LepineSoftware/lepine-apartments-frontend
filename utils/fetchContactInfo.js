const { apiUrl } = require("./apiUrl");
import qs from "qs";

module.exports = async () => {
    const query = qs.stringify({
        populate: {
            info: {
                fields: ['address', 'city', 'postalCode', 'phone', 'email', 'corporatePhone'],
                populate: ['hours']
            }
        },
        encodeValuesOnly: true
      });
    
      const url = `${apiUrl}/contact?${query}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.data.attributes.info;
}