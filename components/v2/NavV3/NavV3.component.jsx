import { useState, useEffect } from 'react';
import LogoDark from '../../../assets/svg/lepine.svg';
import LogoLight from '../../../assets/svg/lepineLight.svg';
import MenuClose from '../../../assets/svg/menuClose.svg';
import MenuOpen from '../../../assets/svg/menuOpen.svg';
import Image from 'next/image';
import Link from 'next/link';

import LepineScript from '../../../assets/svg/lepineScript.svg';

import { pageIsActive } from '../../../utils/pageIsActive'; 
import { navItems } from '../../../utils/navItems';
import ContactInfoBar from '../../ContactInfoBar.component';
import AppPopup from '../../AppPopup.component';
import NavV3ExternalLinks from './NavV3ExternalLinks.component';

import lifesPlay from '../../../assets/svg/lifesPlay.svg';

import { ImageLoader } from '../../../utils/imageLoader'
import { submitGAEvent } from '../../../utils/submitGAEvent';

import ContactFormPopup from '../../v3/ContactFormPopup/ContactFormPopup.component';
import ContactGeneral from '../Contact/ContactGeneral.component';
import tenantServices from '../../../static/global/tenantServices.json';

const NavV3 = ({ v2, navSecondarySticky, property, logoDark, current, phoneNumber, pageId, phoneHref, contact, links, rentCopy }) => {
    const { address, postalCode, phone, email, hours, corporatePhone } = contact.info;

    const [navSecondaryActive, setNavSecondaryActive] = useState(false);
    const [navContactActive, setNavContactActive] = useState(false);
    const [navCommunitiesActive, setNavCommunitiesActive] = useState(false);
    const [navTertiaryActive, setNavTertiaryActive] = useState(false);
    const [noScroll, setNoScroll] = useState(false);
    
    const [activeCommunity, setActiveCommunity] = useState('');

    const navSecondaryClasses = ['navV3__secondary'];
    const navTertiaryClasses = ['navV3__tertiary'];
    const navContactClasses = ['navV3__contact', 'themeBGLight'];

    const [navMobileLocationsActive, setNavMobileLocationsActive] = useState(false);

    const [contactPopupIsActive, setContactPopupIsActive] = useState(false);
    useEffect(() => {
      const body = document.querySelector('body');
      contactPopupIsActive ? body.classList.add('noscroll') : body.classList.remove('noscroll');
    }, [contactPopupIsActive]);

    const navItemsClasses = {
        communities: ['navV3__item'],
        about: ['navV3__item', 'themeNavItem__hover'],
        commercial: ['navV3__item', 'themeNavItem__hover'],
        newsroom: ['navV3__item', 'themeNavItem__hover'],
        careers: ['navV3__item', 'themeNavItem__hover'],
        contact: ['navV3__item', 'themeNavItem__hover'],
        herosRidge: ['navV3__item', 'themeNavItem__hover']
    }

    // navCommunitiesActive && navItemsClasses.communities.push('active');
    current === 'communities' && navItemsClasses.communities.push('themeNavItem__hover');
    current === 'about' && navItemsClasses.about.push('active');
    current === 'newsroom' && navItemsClasses.newsroom.push('active');
    current === 'careers' && navItemsClasses.careers.push('active');
    current === 'commercial' && navItemsClasses.commercial.push('active');

    navSecondaryActive && navSecondaryClasses.push('active');
    navTertiaryActive && navTertiaryClasses.push('active');
    navContactActive && navContactClasses.push('active');

    const toggleSecondaryNav = () => {
        setNavContactActive(false);
        setNavV2Top(!navV2Top);

        if (navTertiaryActive) {
            setNavTertiaryActive(false);
            setActiveCommunity('');

            setTimeout(() => {
                setNavSecondaryActive(!navSecondaryActive);
                setNavCommunitiesActive(!navCommunitiesActive);
                setNavMobileLocationsActive(true);
            }, 100);
        } else {
            setNavCommunitiesActive(!navCommunitiesActive);
            setNavSecondaryActive(!navSecondaryActive);
            setNavMobileLocationsActive(false);
        }
    }

    const toggleTertiaryNav = (location) => {
        if (location === activeCommunity) {
            setActiveCommunity('');
            setTimeout(() => setNavTertiaryActive(false), 100)
        } else {
            setActiveCommunity(location);
            setTimeout(() => setNavTertiaryActive(true), 100)
        }
    };

    const collapseNav = () => {
        setNavSecondaryActive(false);
        setNavCommunitiesActive(false);
        setNavTertiaryActive(false);
        setNavMobileLocationsActive(false);
    }

    const toggleNavV3Top = () => {
        window.addEventListener('scroll', () => {
            if (window.scrollY < 1) {
                setNavV2Top(true);
                collapseNav();
            } else {
                setNavV2Top(false);
                setNavContactActive(false);
            }
        });
    }

    useEffect(() => {
        setNoScroll(false);
        collapseNav();
        toggleNavV3Top();
    }, [pageId]);

    useEffect(() => {
        if (window.scrollY === 0) {
            if (navContactActive) {
                setNavV2Top(false);
            } else {
                setNavV2Top(true);
            }
        }
    }, [navContactActive])

    const renderNavContact = () => <ContactInfoBar address={address} city={contact.city} postalCode={postalCode} hours={hours} phone={phone} email={email} corporatePhone={corporatePhone} />

    const propertyPage = pageId === undefined ? false : true;

    const renderTertiaryNav = () => {
        const item = navItems.filter(item => item.name === activeCommunity)[0];

        return (
                <div className="navV3__locations" data-aos="fade" data-nav="desktop">
                    {item.properties.map((property, i) => {
                        return (
                            <div className="navV3__item" data-item="location" key={i}>
                                <Link href={`/${property.href}`} key={i}>
                                    <span>{property.name}</span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
        )
    }

    useEffect(() => {
        setNoScroll(false);
    }, []);

    useEffect(() => {
        const body = document.querySelector('body');
        noScroll ? body.classList.add('mobileNoScroll') : body.classList.remove('mobileNoScroll');
    }, [noScroll]);


    const toggleMobileNav = () => {
        if (navContactActive) {
            setNavContactActive(false);
            setNavSecondaryActive(false);
            setNoScroll(false);
        } else {
            setNoScroll(!noScroll);
            toggleSecondaryNav();    
        }
    }

    const renderGlobalMobileNav = () => {
        return !navMobileLocationsActive ? (
            <div className="navV3__content" data-aos="fade" data-nav="mobile">
                    <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false);}}>
                        <Link href="/#neighbourhoods">
                            Communities
                        </Link>
                    </div>

                    {pageIsActive.about && <div className={navItemsClasses.about.join(' ')} data-aos="fade" data-nav="mobile">
                        <Link href="/about">
                            About
                        </Link>
                    </div>}

                    {pageIsActive.newsroom && <div className={navItemsClasses.newsroom.join(' ')} data-aos="fade" data-nav="mobile">
                        <Link href="/newsroom">
                            Newsroom
                        </Link>
                    </div>}

                    <div className={navItemsClasses.commercial.join(' ')} data-aos="fade" data-nav="mobile">
                        <Link href="/commercial">
                            Commercial
                        </Link>
                    </div>

                    <div className={navItemsClasses.careers.join(' ')} data-aos="fade" data-nav="mobile">
                        <Link href="/careers">
                            Careers
                        </Link>
                    </div>

                    <div className={navItemsClasses.herosRidge.join(' ')} data-aos="fade" data-nav="mobile">
                        <Link href="/herosridge">
                            Hero&apos;s&nbsp;Ridge
                        </Link>
                    </div>

                    <div
                        className={navItemsClasses.contact.join(' ')}
                        data-aos="fade"
                        data-nav="mobile"
                        onClick={() => {
                            setContactPopupIsActive(true);
                        }}
                        data-level="primary"
                    >
                        <span>Contact</span>
                    </div>

                    <div data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false)}}>
                        {!propertyPage ? (<Link href="/#neighbourhoods">
                            <div className="btn themeBtn">Find My Apartment</div>
                        </Link>) : (<Link href="#listings">
                            <div className="btn themeBtn">Find My Apartment</div>
                        </Link>)}
                    </div>

                    {tenantServices && <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => submitGAEvent('tenant_portal_clicked')}>
                        <AppPopup trigger={TenantServicesTrigger} copy={tenantServices.copy} />
                    </div>}

                    {property && <div className="navV3__item" style={{flex: '0'}}><Link href="/">{ImageLoader(LepineScript.src, '', '', 176, 50, 0.1)}</Link></div>}
                    {property && <div className="navV3__item navV3__item--lifesPlay" style={{flex: '0'}}>{ImageLoader(lifesPlay.src, '', '', 176, 50, 0.1)}</div>}
                </div>
        ) : (               
            <div className="navV3__locations" data-aos="fade" data-nav="mobile">
                {navItems.map((item, i) => {
                    const classes = ['navV3__item'];
                    activeCommunity === item.name && classes.push('active');
                    
                    return (
                        <div className={classes.join(' ')} data-item="location" onClick={() => toggleTertiaryNav(item.name)} key={i}>
                            <span>{item.name}</span>

                            <div className="navV3__item--properties">
                                {item.properties.map((item, i) => {
                                    return (
                                        <div className="navV3__item" key={i} data-item="property" onClick={() => collapseNav()}>
                                            <Link href={`/${item.href}`}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }

    const renderPropertyMobileNav = () => {
        return (
            (
                <div className="navV3__content" data-aos="fade" data-nav="mobile">
                    {links.listings && <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false)}} data-level="primary">
                        <a href="#listings">The Suites</a>
                    </div>}
        
                    {links.propertyFeatures && <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false)}} data-level="primary">
                        <a href="#propertyFeatures">Amenities</a>
                    </div>}
        
                    {links.propertyMap && <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false)}} data-level="primary">
                        <a href="#propertyMap">Neighbourhood</a>
                    </div>}
        
                    {links.faq && <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false)}} data-level="primary">
                        <a href="#faq">FAQs</a>
                    </div>}
        
                    {links.contact && <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false); submitGAEvent('nav_contact_info_expanded')}} data-level="primary">
                        <a href="#contact">Contact</a>
                    </div>}
        
                    <div data-aos="fade" data-nav="mobile" onClick={() => {collapseNav(); setNoScroll(false)}}>
                                {!propertyPage ? (<Link href="/#neighbourhoods" target="_blank" rel="noreferrer">
                                    <div className="btn themeBtn">Find My Apartment</div>
                                </Link>) : (<Link href="#listings">
                                    <div className="btn themeBtn">Find My Apartment</div>
                                </Link>)}
                            </div>
        
                            {tenantServices && <div className="navV3__item" data-aos="fade" data-nav="mobile" onClick={() => submitGAEvent('tenant_portal_clicked')}>
                                <AppPopup trigger={TenantServicesTrigger} copy={tenantServices.copy} />
                            </div>}
        
                            {property && <div className="navV3__item" style={{flex: '0'}}><Link href="/">{ImageLoader(LepineScript.src, '', '', 176, 50, 0.1)}</Link></div>}
                            {property && <div className="navV3__item navV3__item--lifesPlay" style={{flex: '0'}}>{ImageLoader(lifesPlay.src, '', '', 176, 50, 0.1)}</div>}
                </div>
            )
        )
    }

    const renderGlobalDesktopNav = () => (
        <div className="navV3__content" data-aos="fade" data-nav="desktop">
                    <div className={navItemsClasses.communities.join(' ')} data-aos="fade" data-nav="desktop" data-level="primary">
                       <Link href="/#neighbourhoods">
                           Communities
                       </Link>
                    </div>

                    {pageIsActive.about && <div className={navItemsClasses.about.join(' ')} data-aos="fade" data-nav="desktop" data-level="primary">
                        <Link href="/about">
                            About
                        </Link>
                    </div>}

                    {pageIsActive.newsroom && <div className={navItemsClasses.newsroom.join(' ')} data-aos="fade" data-nav="desktop" data-level="primary">
                        <Link href="/newsroom">
                            Newsroom
                        </Link>
                    </div>}

                    <div className={navItemsClasses.commercial.join(' ')} data-aos="fade" data-nav="desktop" data-level="primary">
                        <Link href="/commercial">
                            Commercial
                        </Link>
                    </div>

                    <div
                        className={navItemsClasses.contact.join(' ')}
                        data-aos="fade"
                        data-nav="desktop"
                        onClick={() => {setContactPopupIsActive(true)}}
                        data-level="primary"
                    >
                        <span>Contact</span>
                    </div>

                    <div className={navItemsClasses.careers.join(' ')} data-aos="fade" data-nav="desktop" data-level="primary">
                        <Link href="/careers">
                            Careers
                        </Link>
                    </div>


                    <div className={navItemsClasses.herosRidge.join(' ')} data-aos="fade" data-nav="desktop" data-level="primary">
                        <Link href="/herosridge">
                            Hero&apos;s&nbsp;Ridge
                        </Link>
                    </div>
                </div>
    );

    const TenantServicesTrigger = <span>Tenant Portal</span>;

    const navV3Classes = ['navV3'];
    const [navV2Top, setNavV2Top] = useState(true);
    v2 && navV2Top && navV3Classes.push('top');


    const primaryClasses = ['navV3__primary'];
    navSecondarySticky && primaryClasses.push('none');

    const renderNavLogo = () => {
        if (property) {
            return (
            <Link href="/">
                <Image className="navV3__logo--desktop" src={LogoDark} alt="Lepine" width={288} height={88} />
                <Image className="navV3__logo--mobile" src={property ? logoDark : LogoDark} alt="Lepine" width={288} height={88} />
            </Link>
            )
        } else if (v2) {
            return (
                <Link href="/">
                    <Image className="navV3__logo--desktop" src={navV2Top ? LogoLight : LogoDark} alt="Lepine" width={288} height={88} />
                    <Image className="navV3__logo--mobile" src={LogoDark} alt="Lepine" width={288} height={88} />
                </Link>
            )
        } else {
            return (
                <Link href="/">
                    <Image className="navV3__logo--desktop" src={LogoDark} alt="Lepine" width={288} height={88} />
                    <Image className="navV3__logo--mobile" src={LogoDark} alt="Lepine" width={288} height={88} />
                </Link>
            )  
        }
    }

    return (
        <>
            <ContactFormPopup
                contactPopupIsActive={contactPopupIsActive}
                setContactPopupIsActive={setContactPopupIsActive}
            >
                <ContactGeneral type="form" setContactPopupIsActive={setContactPopupIsActive} />
            </ContactFormPopup>

            <nav className={navV3Classes.join(' ')}>
            {navSecondarySticky && <div className="navV3__externalLinks logo" data-nav="desktop">
                <Link href="/">{ImageLoader(LepineScript.src, '', '', 176, 50, 0.1)}</Link>
                {/* {ImageLoader(lifesPlay.src, '', '', 176, 50, 0.1)} */}
            </div>}


            {/* <div className="navV3__externalLinks" data-nav="mobile">
                {!propertyPage ? 
                    (<NavV3ExternalLinks phone tenantServices tenantPortal phoneHref={phoneHref} phoneNumber={phoneNumber} />)
                    :
                    (<NavV3ExternalLinks phone listings tenantServices tenantPortal phoneHref={phoneHref} phoneNumber={phoneNumber} />)
                }
            </div> */}


            {<div className={primaryClasses.join(' ')}>
                <div className="navV3__primary--wrapper">
                    <div className="navV3__logo" data-aos="fade">
                        {renderNavLogo()}
                    </div>

                    {renderGlobalDesktopNav()}
                    
                    <div className="navV3__externalLinks" data-aos="fade" data-nav="desktop">
                    {<NavV3ExternalLinks copy={rentCopy} phone listings phoneHref={phoneHref} phoneNumber={phoneNumber} tenantServices={tenantServices} />}
                    
                    </div>
                
                    <div className="navV3__toggle" onClick={() => toggleMobileNav()}>
                        <Image 
                            src={navSecondaryActive || navContactActive ? MenuClose : MenuOpen}
                            alt={navSecondaryActive || navContactActive ? 'Close Menu' : 'Open Menu'}
                            width={30}
                            height={30}
                        />
                    </div>
                </div>
            </div>}

            <div className={navSecondaryClasses.join(' ')}>
                {property ? renderPropertyMobileNav() : renderGlobalMobileNav()}
            </div>

            <div className={navContactClasses.join(' ')}>
                <div className="navV3__contact--close" onClick={() => setNavContactActive(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="37.828" height="37.828" viewBox="0 0 37.828 37.828">
                        <g id="Group_13426" data-name="Group 13426" transform="translate(1418.986 -2062.014)">
                            <line id="Line_5" data-name="Line 5" y1="35" x2="35" transform="translate(-1417.571 2063.429)" fill="none" stroke="#5e514d" strokeLinecap="square" strokeWidth="2"/>
                            <line id="Line_6" data-name="Line 6" x2="35" y2="35" transform="translate(-1417.571 2063.429)" fill="none" stroke="#5e514d" strokeLinecap="square" strokeWidth="2"/>
                        </g>
                    </svg>
                </div>
                {renderNavContact()}
            </div>

            <div className={navTertiaryClasses.join(' ')}>
                {activeCommunity !== '' && renderTertiaryNav()}
            </div>
        </nav>
        </>
    )
}

export default NavV3;