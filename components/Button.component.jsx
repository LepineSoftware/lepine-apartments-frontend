import { baseUrl } from "../utils/baseUrl";
import AppContext from "../components/AppContext.component";
import { useContext } from "react";


const Button = ({ phase, pdf, copy, propertyPage }) => {
    const url = baseUrl(pdf);
    const context = useContext(AppContext);
    const theme = context.theme;


    if (propertyPage) {
        return (<a className="btn themeBtn" href="#listings">{phase}</a>)
    }

    if (phase) {
        if (phase === 'Find an Apartment') {
            return (
                <a href="#listings" className="btn themeBtn">
                    Register Now
                </a>
            )
        } else if (phase === 'Register Now') {
            return (
                <a href="#listings" className="btn themeBtn">
                    Register Now
                </a>
            )
        }
    } else if (url) {
       return (
        <a href={url} rel="noreferrer" target="_blank" className="btn themeBtn">
            {copy}
        </a>
       )
    }

}
export default Button;