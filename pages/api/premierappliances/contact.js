import nodemailer from "nodemailer";
import qs from "qs";

export default async function handler(req, res) {
  // --- 1. Define Allowed Origins ---
  const allowedOrigins = [
    "https://premierappliances.ca",
    "https://www.premierappliances.ca",
  ];

  // --- 2. Dynamic CORS Handling ---
  const origin = req.headers.origin;

  // If the request origin is in our allowed list, set it as the allowed origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin"); // Important: tells browser response varies by origin

  // --- 3. Handle Preflight Request (OPTIONS) ---
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // --- 4. Handle the Actual POST Request ---
  if (req.method === "POST") {
    // ... (Your existing code logic) ...
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const rentalStartDate = req.body.rentalStartDate;
    const message = req.body.message;

    const html = `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone Number: ${phoneNumber}</p>
            <p>Rental Start Date: ${rentalStartDate}</p>
            <p>Message: ${message}</p>
        `;

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    try {
      let message = {
        from: '"Premier Appliances Mailer", <nodemailer@lepinecorp.com>',
        to: "dave@premierappliances.ca",
        bcc: "ryan.peterson@lepinecorp.com",
        html,
        subject: "Premier Appliances Inquiry",
      };

      transporter.sendMail(message);

      return res
        .status(200)
        .json({ message: "Thank you! Your inquiry has been received." });
    } catch (error) {
      return res.status(400).json({
        error: "Something went wrong! Please email info@premierappliances.ca",
      });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
