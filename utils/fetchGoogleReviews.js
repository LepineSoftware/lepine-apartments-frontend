import { appUrl } from "./appUrl";

module.exports = async () => {
    const url = `${appUrl}/api/social/google/reviews`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}