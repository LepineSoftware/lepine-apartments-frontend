import { appUrl } from "./appUrl";

module.exports = async () => {
    const url = `${appUrl}/api/social/facebook/posts`;
    const options = {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_FACEBOOK_POSTS_LONG_LIVED_PAGE_TOKEN,
        }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}