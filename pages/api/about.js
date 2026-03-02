import qs from "qs";
import { apiUrl } from "../../utils/apiUrl";

export default async function handler(req, res) {
    const query = qs.stringify({
        populate: {
            hero: {
                fields: ['header', 'copy', 'link'],
                populate: ['image', 'overlayImage']
            },
            leasingTeam: {
                fields: ['header', 'copy'],
                populate: ['desktopImage.image', 'mobileImage.image']
            },
            sponsorships: {
                fields: ['header', 'copy'],
                populate: ['image.image', 'image.subtitleIcon', 'posts.images.thumbnail']
            },
            sustainability: {
                fields: ['header', 'copy'],
                populate: ['image.image', 'image.subtitleIcon', 'posts.images.thumbnail']
            },
            mediaKit: {
                fields: ['header', 'copy'],
                populate: ['images']
            },
            meta: {
                fields: ['description', 'title'],
            }
        },
        encodeValuesOnly: true
    });

    const aboutUrl = `${apiUrl}/about?${query}`;
    // const aboutUrl = `${apiUrl}/about?populate[0]=hero&populate[1]=hero.link&populate[2]=hero.image&populate[3]=hero.overlayImage&populate[4]=leasingTeam&populate[5]=leasingTeam.desktopImage&populate[6]=leasingTeam.mobileImage&populate[7]=sponsorships&populate[8]=sponsorships.image.image&populate[9]=sponsorships.image.subtitleIcon&populate[10]=sponsorships.posts&populate[11]=sponsorships.posts.images.thumbnail&populate[12]=sponsorships.posts.images.headerLg&populate[13]=sponsorships.posts.images.headerSm&populate[14]=sustainability&populate[15]=sustainability.image.image&populate[16]=sustainability.image.subtitleIcon&populate[17]=sustainability.posts&populate[18]=sustainability.posts.images.thumbnail&populate[19]=sustainability.posts.images.headerLg&populate[20]=sustainability.posts.images.headerSm&populate[21]=mediaKit`;
    const aboutRes = await fetch(aboutUrl);
    const aboutData = await aboutRes.json();
  
    res.status(200).json(aboutData);
}
  
