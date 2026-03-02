const { appUrl } = require("./appUrl");

module.exports = async () => {
    const res = await fetch(`${appUrl}/api/leasingSteps`);
    const data = await res.json();
    return data.data.attributes;
}