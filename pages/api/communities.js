import { apiUrl } from "../../utils/apiUrl";
import { baseUrl } from "../../utils/baseUrl";
import { populate } from "../../utils/populate";

export default async function handler(req, res) {
    const communitiesUrl = `${apiUrl}/cities?${populate}`;
    const communitiesRes = await fetch(communitiesUrl);
    const communitiesData = await communitiesRes.json();
  
    const communities = communitiesData.data.map(community => {
      const { name, description, coords, properties: cities, comingSoon } = community.attributes;
  
      const properties = cities.data.map(property => {
        return {
          name: property.attributes.name,
          pageId: property.attributes.pageId,
          coords: property.attributes.address.coords,
          marker: baseUrl(property.attributes.logos.markers.homePage.data.attributes.url)
        }
      });
  
      return {
        name,
        description,
        coords,
        properties,
        comingSoon
      }
    });

    const currentCommunities = communities.filter(c => !c.comingSoon);
  
    res.status(200).json(currentCommunities);
}
  
