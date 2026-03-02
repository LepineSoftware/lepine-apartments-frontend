import { apiUrl } from "../../utils/apiUrl";
import { parseStrapiSingleImage } from "../../utils/parseStrapiImages";


export default async function handler(req, res) {
    const herosRidgeUrl = `${apiUrl}/heros-ridge?populate=deep`;

    const herosRidgeRes = await fetch(herosRidgeUrl);
    const herosRidgeData = await herosRidgeRes.json();

    const { hero, youtube, about, nominate, communities, initiatives, meta } = herosRidgeData.data.attributes;

    const heroRes = {
        logo: parseStrapiSingleImage(hero.logo),
        header: hero.header,
        copy: hero.copy,
        video: hero.video,
        btnHref: hero.btnHref,
        btnCopy: hero.btnCopy,
        youtubePopup: hero.youtubePopup
    };

    const youtubeRes = {
        copy: youtube.copy,
        ctaHref: youtube.ctaHref,
        ctaCopy: youtube.ctaCopy,
        items: youtube.items.map(item => ({
            href: item.href,
            image: parseStrapiSingleImage(item.image)
        }))
    };

    const aboutRes = {
        image: parseStrapiSingleImage(about.image),
        header: about.header,
        subtitle: about.subtitle,
        copy: about.copy,
        logo: parseStrapiSingleImage(about.logo)
    };

    const nominateRes = {
        imageLeft: parseStrapiSingleImage(nominate.imageLeft),
        imageRight: parseStrapiSingleImage(nominate.imageRight),
        header: nominate.header,
        copy: nominate.copy,
        btnCopy: nominate.btnCopy,
        file: parseStrapiSingleImage(nominate.file),
        disclaimer: nominate.disclaimer
    };

    const communitiesRes = {
        header: communities.header,
        copy: communities.copy
    };

    const initiativesRes = {
        header: initiatives.header,
        copy: initiatives.copy
    };

    res.status(200).json({
        hero: heroRes,
        youtube: youtubeRes,
        about: aboutRes,
        nominate: nominateRes,
        communities: communitiesRes,
        initiatives: initiativesRes,
        meta
    });
}
  
