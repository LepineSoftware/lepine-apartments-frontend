import Link from "next/link";
import ContentWrapper from "../sections/ContentWrapper.component";
import {parsePhoneNumber} from '../utils/parsePhoneNumber';

const ContactInfoBar = ({ mobileInfoBG, address, city, postalCode, hours, phone, email, corporatePhone }) => {
    return (
        <div className="contact__row" data-aos="fade">
            <ContentWrapper cssClass="contact__infoBar" size="lg">
                <div className="contact__mobile--bg" style={mobileInfoBG}></div>

                <div className="contact__row" data-row="info">
                    <div className="contact__col" data-col="info">
                        <p className="contact__info--header">Leasing Team</p>
                        {phone && <p>{phone}</p>}
                        {email && <a href={`mailto:${email}`}><span>{email}</span></a>}
                    </div>
                
                    <div className="contact__col" data-col="info">
                        <p className="contact__info--header">Property Tours</p>
                        <Link href="/#neighbourhoods" style={{'cursor': 'pointer'}}>
                            <p>See community pages<br/>for details</p>
                        </Link>
                        {/* <p className="contact__info--header">Hours</p>
                        {hours && <p>Monday - Friday: {hours.weekday}</p>}
                        {hours && <p>Saturday - Sunday: {hours.weekend}</p>} */}
                    </div>

                    <div className="contact__col" data-col="info">
                        <p className="contact__info--header">Corporate Office</p>
                        {address && <p>{address}</p>}
                        <p>{city} {postalCode}</p>
                        {corporatePhone && <a href={`tel:${parsePhoneNumber(corporatePhone)}`}><span>{corporatePhone}</span></a>}
                    </div>
                </div>
        </ContentWrapper>
    </div>
    )
}

export default ContactInfoBar;