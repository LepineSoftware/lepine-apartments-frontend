export default async function handler(req, res) {
  const url = `https://services.solutioneers.dev/api/jobs`;
  const response = await fetch(url, {
    headers: {
      "X-Solutioneers-Secret-Key": process.env.SOLUTIONEERS_SERVICES_SECRET,
    },
  });
  const data = await response.json();
  return res.status(200).json(data);
}
