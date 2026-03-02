import { apiUrl } from "../../utils/apiUrl";
import { parseStrapiSingleImage } from "../../utils/parseStrapiImages";
import { populate } from "../../utils/populate";

export default async function handler(req, res) {
  const homeUrl = `${apiUrl}/home-page?${populate}`;
  const homeRes = await fetch(homeUrl);
  const homeData = await homeRes.json();
  const homeJSON = homeData.data.attributes;

  const hero = {
    header: homeJSON.hero.header,
    video: homeJSON.hero.video,
  };

  const lifestyle = {
    header: homeJSON.lifestyle.header,
    subtitle: homeJSON.lifestyle.subtitle,
    copy: homeJSON.lifestyle.copy,
    image: parseStrapiSingleImage(homeJSON.lifestyle.image),
  };

  const overviewItems = homeJSON.overview.items.map((item) => {
    return {
      header: item.header,
      copy: item.copy,
      icon: parseStrapiSingleImage(item.icon),
    };
  });

  const overview = {
    header: homeJSON.overview.header,
    copy: homeJSON.overview.copy,
    image: parseStrapiSingleImage(homeJSON.overview.image),
    items: overviewItems,
  };

  const neighbourhoods = {
    header: homeJSON.neighbourhoods.header,
    copy: homeJSON.neighbourhoods.copy,
  };

  const renaissance = {
    header: homeJSON.renaissance.header,
    subtitle: homeJSON.renaissance.subtitle,
    copy: homeJSON.renaissance.copy,
    backgroundImage: parseStrapiSingleImage(
      homeJSON.renaissance.backgroundImage,
    ),
    image: parseStrapiSingleImage(homeJSON.renaissance.image),
    copyIcon: parseStrapiSingleImage(homeJSON.renaissance.copyIcon),
  };

  const herosRidge = {
    header: homeJSON.herosRidge.header,
    subtitle: homeJSON.herosRidge.subtitle,
    copy: homeJSON.herosRidge.copy,
    image: parseStrapiSingleImage(homeJSON.herosRidge.image),
    copyIcon: parseStrapiSingleImage(homeJSON.herosRidge.copyIcon),
  };

  const response = {
    hero,
    lifestyle,
    overview,
    neighbourhoods,
    renaissance,
    herosRidge,
    meta: homeJSON.meta,
  };

  return res.status(200).json(response);
}
