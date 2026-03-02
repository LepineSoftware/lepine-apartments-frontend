import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === "POST") {
        const vetName = req.body.vetName;
        const vetMailingAddress = req.body.vetMailingAddress;
        const vetEmail = req.body.vetEmail;
        const vetPhoneNumber = req.body.vetPhoneNumber;
        const vetBio = req.body.vetBio;
        
        const sponsorName = req.body.sponsorName;
        const sponsorMailingAddress = req.body.sponsorMailingAddress;
        const sponsorEmail = req.body.sponsorEmail;
        const sponsorPhoneNumber = req.body.sponsorPhoneNumber;
        
        const html = `
            <h2>Hero's Ridge Form Submission</h2>
            <p>A new form submission has been received!</p>

            <h3>Veteran Info:</h3>
            <p>Name: ${vetName}</p>
            <p>Mailing Address: ${vetMailingAddress}</p>
            <p>Email: ${vetEmail}</p>
            <p>Phone Number: ${vetPhoneNumber}</p>
            <p>Bio: ${vetBio}</p>

            <br/>

            <h3>Sponsor Info:</h3>
            <p>Name: ${sponsorName}</p>
            <p>Mailing Address: ${sponsorMailingAddress}</p>
            <p>Email: ${sponsorEmail}</p>
            <p>Phone Number: ${sponsorPhoneNumber}</p>
        `;

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
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
                to: 'kate@lepineapartments.com,melissa@lepinecorp.com',
                bcc: 'ryan.peterson@lepinecorp.com',
                html,
                subject: "Hero's Ridge Form Submission"
            }
        
            transporter.sendMail(message);
    
            return res.status(200).json({ message: 'Thank you! Your submission has been received.' });
        } catch (error) {
            return res.status(400).json({ error: 'Something went wrong! Please email herosridge@lepinecorp.com' });
        }
    } else {
        return res.status(400).json({ message: "Forbidden" });
    }
}