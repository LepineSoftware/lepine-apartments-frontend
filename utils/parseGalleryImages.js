import { baseUrl } from "./baseUrl";

export const parseGalleryImages = (arr) => {
    const keyUrls = arr.map(item => baseUrl(item));
    return keyUrls;
}