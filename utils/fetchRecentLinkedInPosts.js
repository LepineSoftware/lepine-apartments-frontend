import { appUrl } from "./appUrl";

module.exports = async () => {
    const url = `${appUrl}/api/social/linkedin`;
    const options = {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_LEPINE_MARKETING_DASHBOARD_AUTH,
        }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}