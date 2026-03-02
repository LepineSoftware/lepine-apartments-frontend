const { appUrl } = require("./appUrl");

module.exports = async () => {
    const slugsUrl = await fetch(`${appUrl}/api/slugs`);
    const slugsData = await slugsUrl.json();
    return slugsData;
}