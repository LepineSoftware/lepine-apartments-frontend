const { appUrl } = require("./appUrl");

module.exports = async () => {
    // const neighbourhoodsRes = await fetch( `${appUrl}/api/neighbourhoods`);
    const neighbourhoodsRes = await fetch( `https://www.lepineapartments.com/api/neighbourhoods`);
    const neighbourhoodsData = await neighbourhoodsRes.json();
    return neighbourhoodsData;
}