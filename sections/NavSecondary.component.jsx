import Image from "next/image";
import NavExternalLinks from "../components/NavExternalLinks.component";
import ContentWrapper from "./ContentWrapper.component";
import LepineLogoLight from "../assets/svg/lepineLight.svg";

import Link from "next/link";

const NavSecondary = ({
  sticky,
  logo,
  phoneNumber,
  phoneHref,
  propertyNav,
  links,
  rentCopy,
}) => {
  const classes = ["navSecondary"];
  sticky && classes.push("sticky");

  const renderPropertyPageItems = () => {
    return (
      <div className="navSecondary__links">
        {links.listings && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#listings">The Suites</a>
          </div>
        )}

        {links.propertyFeatures && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#propertyFeatures">Amenities</a>
          </div>
        )}

        {links.propertyMap && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#propertyMap">Neighbourhood</a>
          </div>
        )}

        {links.faq && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#faq">FAQs</a>
          </div>
        )}

        {links.blog && (
          <div className="navSecondary__item" data-aos="fade">
            <Link href="#newsroom">Blog</Link>
          </div>
        )}

        {links.floorplans && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#listings">Floorplans</a>
          </div>
        )}

        {links.keyFeatures && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#propertyFeatures">Key Features</a>
          </div>
        )}

        {links.unitSpecifications && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#unitSpecifications">Specifications</a>
          </div>
        )}

        {links.contact && (
          <div className="navSecondary__item" data-aos="fade">
            <a href="#contactform">Contact</a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="navSecondary__placeholder">
      <div className={classes.join(" ")} data-page="v2">
        <div className="navSecondary__wrapper themeBGLight">
          <ContentWrapper cssClass="navSecondary__content" size="xl">
            {logo ? (
              <a href="#top" className="navSecondary__logo">
                <Image src={logo} alt="" height={65} width={282} />
              </a>
            ) : (
              <a href="#top" className="navSecondary__logo">
                <Image src={LepineLogoLight} alt="" height={65} width={282} />
              </a>
            )}

            {propertyNav && renderPropertyPageItems()}

            <div className="navSecondary__externalLinks">
              {propertyNav ? (
                <NavExternalLinks
                  copy={rentCopy}
                  phone
                  phoneHref={phoneHref}
                  phoneNumber={phoneNumber}
                  whiteIcon
                />
              ) : (
                <NavExternalLinks
                  phone
                  phoneHref={phoneHref}
                  phoneNumber={phoneNumber}
                  whiteIcon
                />
              )}
            </div>
          </ContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default NavSecondary;
