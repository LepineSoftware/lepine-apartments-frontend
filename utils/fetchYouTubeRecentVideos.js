import { appUrl } from "./appUrl";

module.exports = async () => {
    const url = `${appUrl}/api/social/youtube/videos`;
    const options = {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}