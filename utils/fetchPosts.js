const { appUrl } = require("./appUrl");

module.exports = async () => {
    const postsUrl = await fetch(`${appUrl}/api/posts`);
    const postsData = await postsUrl.json();
    return postsData;
}