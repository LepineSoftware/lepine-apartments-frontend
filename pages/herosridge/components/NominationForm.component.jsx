import { useState } from "react";
import { redirectToThankYou } from "../../../utils/redirectToThankYou";

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTO_SIZE = 1 * 1024 * 1024; // 1MB

const JERSEY_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const NominationForm = () => {
    const [form, setForm] = useState({
        vetName: "",
        vetMailingAddress: "",
        vetEmail: "",
        vetPhoneNumber: "",
        vetBio: "",
        element: "",
        trade: "",
        rank: "",
        yearsOfService: "",
        deployments: "",
        careerHighlights: "",
        jerseySize: "",
        photoName: "",
        photoType: "",
        photoData: "",
        sponsorName: "",
        sponsorMailingAddress: "",
        sponsorEmail: "",
        sponsorPhoneNumber: ""
    });

    const [formResponse, setFormResponse] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();

        const formIsValid = validateForm(form);


        if (formIsValid) {
            try {
                setFormResponse('Submitting your inquiry...');

                setTimeout(async () => {
                    const fields = {
                        vetName: form.vetName,
                        vetMailingAddress: form.vetMailingAddress,
                        vetEmail: form.vetEmail,
                        vetPhoneNumber: form.vetPhoneNumber,
                        vetBio: form.vetBio,
                        element: form.element,
                        trade: form.trade,
                        rank: form.rank,
                        yearsOfService: form.yearsOfService,
                        deployments: form.deployments,
                        careerHighlights: form.careerHighlights,
                        jerseySize: form.jerseySize,
                        photoName: form.photoName,
                        photoType: form.photoType,
                        photoData: form.photoData,
                        sponsorName: form.sponsorName,
                        sponsorMailingAddress: form.sponsorMailingAddress,
                        sponsorEmail: form.sponsorEmail,
                        sponsorPhoneNumber: form.sponsorPhoneNumber
                    };

                    const response = await fetch('/api/herosridge/contact', {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(fields),
                    });

                    if (response.status !== 400) {
                        const gtag = window.gtag;
                        gtag && gtag('event', 'herosridge_form_submitted');
                        redirectToThankYou({ form: 'herosridge_nomination' });
                    } else {
                        const data = await response.json().catch(() => ({}));
                        setFormResponse(data.error || 'Something went wrong! Please email ryan.peterson@lepinecorp.com');
                    }
                }, 2500);
            } catch (error) {
                await setFormResponse('Something went wrong! Please email ryan.peterson@lepinecorp.com');
            }
        } else {
            setFormResponse('Please provide all required fields');
        }
    }

    const validateForm = (form) => {
        if (
            form.vetName === "" ||
            form.vetMailingAddress === "" ||
            form.vetEmail === "" ||
            form.vetPhoneNumber === "" ||
            form.vetBio === "" ||
            form.sponsorName === "" ||
            form.sponsorMailingAddress === "" ||
            form.sponsorEmail === "" ||
            form.sponsorPhoneNumber === ""
        ) {
            return false;
        } else return true;
    }

    const updateFormValue = (e) => {
        e.preventDefault();
        setFormResponse('');

        setForm(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const updatePhoto = (e) => {
        setFormResponse('');
        const file = e.target.files && e.target.files[0];

        if (!file) {
            setForm(prevState => ({ ...prevState, photoName: "", photoType: "", photoData: "" }));
            return;
        }

        if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
            setFormResponse('Please upload a JPG, PNG, or WEBP image.');
            e.target.value = "";
            setForm(prevState => ({ ...prevState, photoName: "", photoType: "", photoData: "" }));
            return;
        }

        if (file.size > MAX_PHOTO_SIZE) {
            setFormResponse('The photo must be 1MB or smaller.');
            e.target.value = "";
            setForm(prevState => ({ ...prevState, photoName: "", photoType: "", photoData: "" }));
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setForm(prevState => ({
                ...prevState,
                photoName: file.name,
                photoType: file.type,
                photoData: reader.result
            }));
        };
        reader.onerror = () => {
            setFormResponse('Could not read the photo. Please try another file.');
            e.target.value = "";
        };
        reader.readAsDataURL(file);
    }

    return (
        <>
            <div className="herosRidge__nominationForm">
                <p>Veteran Name (required)</p>
                <input required name="vetName" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetName} />

                <p>Veteran Home Address (required)</p>
                <input required name="vetMailingAddress" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetMailingAddress} />

                <p>Veteran Email</p>
                <input name="vetEmail" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetEmail} />

                <p>Veteran Phone Number (required)</p>
                <input required name="vetPhoneNumber" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetPhoneNumber} />

                <p>Veteran Bio (required, {1000 - form.vetBio.length} characters remaining)</p>
                <textarea maxLength={1000} required name="vetBio" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetBio} placeholder="Tell us about the nominee. You may wish to include details such as your relationship to the nominee, their years of service in the Canadian Armed Forces, retired rank, current service status, or any other relevant information."></textarea>

                <p>Element</p>
                <select name="element" onChange={(e) => updateFormValue(e)} value={form.element}>
                    <option value="">Select an element</option>
                    <option value="Airforce">Airforce</option>
                    <option value="Army">Army</option>
                    <option value="Navy">Navy</option>
                    <option value="Other">Other</option>
                </select>

                <p>Trade</p>
                <input name="trade" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.trade} />

                <p>Rank</p>
                <input name="rank" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.rank} />

                <p>Years of Service</p>
                <input name="yearsOfService" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.yearsOfService} />

                <p>Deployments</p>
                <input name="deployments" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.deployments} />

                <p>Any career highlights they&apos;d like to mention</p>
                <textarea name="careerHighlights" className="" onInput={(e) => updateFormValue(e)} value={form.careerHighlights}></textarea>

                <p>Veteran Jersey Size</p>
                <select name="jerseySize" onChange={(e) => updateFormValue(e)} value={form.jerseySize}>
                    <option value="">Select a size</option>
                    {JERSEY_SIZES.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>

                <p>Veteran Photo (JPG, PNG or WEBP — max 1MB)</p>
                <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => updatePhoto(e)} />

                <hr />

                <p>Sponsor Name (required)</p>
                <input required name="sponsorName" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.sponsorName} />

                <p>Sponsor Mailing Address (required)</p>
                <input required name="sponsorMailingAddress" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.sponsorMailingAddress} />

                <p>Sponsor Email</p>
                <input name="sponsorEmail" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.sponsorEmail} />

                <p>Sponsor Phone Number (required)</p>
                <input required name="sponsorPhoneNumber" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.sponsorPhoneNumber} />
            </div>

            <button className="btn jostBold" onClick={(e) => submitForm(e)}>Submit</button>
            {formResponse !== "" ? <p>{formResponse}</p> : <p>&nbsp;</p>}
        </>
    );
}

export default NominationForm;
