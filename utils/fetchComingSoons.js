const { appUrl } = require("./appUrl");

module.exports = async () => {
    const comingSoonsUrl = await fetch(`${appUrl}/api/comingSoon`);
    const comingSoonsData = await comingSoonsUrl.json();
    return comingSoonsData;
}