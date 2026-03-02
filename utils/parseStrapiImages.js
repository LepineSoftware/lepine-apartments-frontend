import { baseUrl } from "./baseUrl";

export const parseStrapiSingleImage = (img) => {
    return img?.data?.attributes?.url ? baseUrl(img.data.attributes.url) : null;
} 

export const parseStrapiImageArray = (arr) => {
    return arr.data ? arr.data.map(img => baseUrl(img.attributes.url)) : [];
} 