import nodemailer from "nodemailer";
import qs from "qs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const message = req.body.message;

    const html = `
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
            <p>Email: ${email}</p>
            <p>Phone Number: ${phoneNumber}</p>
            <p>Message: ${message}</p>
        `;

    const recipient = "leasing@lepineapartments.com";

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
        from: '"Lépine Mailer", <nodemailer@lepinecorp.com>',
        to: recipient,
        bcc: "ryan.peterson@lepinecorp.com",
        html,
        subject: "General Website Inquiry",
      };

      transporter.sendMail(message);

      return res
        .status(200)
        .json({ message: "Thank you! Your inquiry has been received." });
    } catch (error) {
      return res
        .status(400)
        .json({ error: `Something went wrong! Please email ${recipient}` });
    }
  } else {
    return res.status(400).json({ message: "Forbidden" });
  }
}
