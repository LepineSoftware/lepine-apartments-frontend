import { useEffect, useState } from "react";

const NominationForm = () => {
    const [form, setForm] = useState({
        vetName: "",
        vetMailingAddress: "",
        vetEmail: "",
        vetPhoneNumber: "",
        vetBio: "",
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
                        const data = await response.json();
                        await setFormResponse(data.message);

                        setTimeout(() => {
                            setForm({
                                vetName: "",
                                vetMailingAddress: "",
                                vetEmail: "",
                                vetPhoneNumber: "",
                                vetBio: "",
                                sponsorName: "",
                                sponsorMailingAddress: "",
                                sponsorEmail: "",
                                sponsorPhoneNumber: ""
                            });

                            setFormResponse('');
                        }, 2500)
                    } else {
                        await setFormResponse(response.error);
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

    return (
        <>
            <div className="herosRidge__nominationForm">
                <p>Veteran Name (required)</p>
                <input required name="vetName" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetName} />

                <p>Veteran Mailing Address (required)</p>
                <input required name="vetMailingAddress" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetMailingAddress} />
                
                <p>Veteran Email</p>
                <input name="vetEmail" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetEmail} />

                <p>Veteran Phone Number (required)</p>
                <input required name="vetPhoneNumber" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetPhoneNumber} />

                <p>Veteran Bio (required, {500 - form.vetBio.length} characters remaining)</p>
                <textarea maxLength={500} required name="vetBio" type="text" className="" onInput={(e) => updateFormValue(e)} value={form.vetBio} placeholder="Tell us about the nominee. You may wish to include details such as your relationship to the nominee, their years of service in the Canadian Armed Forces, retired rank, current service status, or any other relevant information."></textarea>

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