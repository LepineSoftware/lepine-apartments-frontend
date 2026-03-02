import { apiUrl } from "../../utils/apiUrl";

export default async function handler(req, res) {
    const leasingStepsUrl =`${apiUrl}/leasing-process?populate=deep`;
    const leasingStepsRes = await fetch(leasingStepsUrl);
    const leasingStepsData = await leasingStepsRes.json();

    res.status(200).json(leasingStepsData);
}
  