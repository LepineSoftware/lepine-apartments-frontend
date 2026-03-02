import { appUrl } from "./appUrl";

module.exports = async (limit, pageId) => {
    const queryLimit = limit ? limit : 50;
    const url = `${appUrl}/api/social/instagram/posts?limit=${queryLimit}`;

    const options = {
        headers: {
            authorization: process.env.NEXT_PUBLIC_INSTAGRAM_APP_TOKEN,
        }
    }

    const response = await fetch(url, options);
    const posts = await response.json();

    if (pageId) {
        const propertyPosts = posts.data.filter(post => post.caption.toLowerCase().includes(pageId));

        return {
            data: propertyPosts
        }
    } else {
        return posts;
    }
}