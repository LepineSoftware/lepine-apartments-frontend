import nodemailer from 'nodemailer';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2mb',
        },
    },
};

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default async function handler(req, res) {
    if (req.method === "POST") {
        const vetName = req.body.vetName;
        const vetMailingAddress = req.body.vetMailingAddress;
        const vetEmail = req.body.vetEmail;
        const vetPhoneNumber = req.body.vetPhoneNumber;
        const vetBio = req.body.vetBio;
        const element = req.body.element;
        const trade = req.body.trade;
        const rank = req.body.rank;
        const yearsOfService = req.body.yearsOfService;
        const deployments = req.body.deployments;
        const careerHighlights = req.body.careerHighlights;
        const jerseySize = req.body.jerseySize;
        const photoName = req.body.photoName;
        const photoType = req.body.photoType;
        const photoData = req.body.photoData;

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
            <p>Element: ${element}</p>
            <p>Trade: ${trade}</p>
            <p>Rank: ${rank}</p>
            <p>Years of Service: ${yearsOfService}</p>
            <p>Deployments: ${deployments}</p>
            <p>Career Highlights: ${careerHighlights}</p>
            <p>Jersey Size: ${jerseySize}</p>
            <p>Photo: ${photoData ? photoName : 'None provided'}</p>

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

        const attachments = [];
        if (photoData && ALLOWED_PHOTO_TYPES.includes(photoType)) {
            const base64Content = photoData.split('base64,')[1];
            if (base64Content) {
                attachments.push({
                    filename: photoName || 'veteran-photo',
                    content: base64Content,
                    encoding: 'base64',
                    contentType: photoType,
                });
            }
        }

        try {
            let message = {
                from: '"Lépine Mailer", <nodemailer@lepinecorp.com>',
                to: 'kate@lepineapartments.com,events@lepineapartments.com',
                bcc: 'ryan.peterson@lepinecorp.com',
                html,
                subject: "Hero's Ridge Form Submission",
                attachments
            }

            await transporter.sendMail(message);

            return res.status(200).json({ message: 'Thank you! Your submission has been received.' });
        } catch (error) {
            console.error("Hero's Ridge sendMail error:", error);
            return res.status(400).json({ error: 'Something went wrong! Please email herosridge@lepinecorp.com' });
        }
    } else {
        return res.status(400).json({ message: "Forbidden" });
    }
}
