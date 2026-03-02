import ContentWrapper from "../../../../sections/ContentWrapper.component";
import { ImageLoader } from "../../../../utils/imageLoader";

const UnitSpecifications = ({ id }) => {
    return (
        <section className="commercial__unitSpecifications sp" id={id}>
            <ContentWrapper cssClass="commercial__unitSpecifications--container">
                <div className="commercial__unitSpecifications--content">
                    <div className="commercial__unitSpecifications--image">
                        {ImageLoader('https://lepine-storage.nyc3.digitaloceanspaces.com/772116d69a903653ba4e564af189f57c.jpg', '', '', 1000, 1000, 0.1)}
                    </div>

                    <div className="commercial__unitSpecifications--copy">
                        <h2 className="themeHeader">Unit Specifications</h2>

                        <div className="commercial__unitSpecifications--listContainer">
                            <div className="commercial__unitSpecifications--listHeader">
                                <h3 className="themeHeader">Structure</h3>
                            </div>

                            <ul className="commercial__unitSpecifications--list">
                                <li>Ceiling height from top of slab to underside of ceiling will be 5150mm (16&apos;-11&quot;) excluding any required drops, mechanical, plumbing, sprinkler, electrical or general common building requirements (as per plan)</li>
                                <li>Unfinished floor and ceiling concrete slab throughout</li>
                            </ul>
                        </div>

                        <div className="commercial__unitSpecifications--listContainer">
                            <div className="commercial__unitSpecifications--listHeader">
                                <h3 className="themeHeader">Interior Finishes</h3>
                            </div>

                            <ul className="commercial__unitSpecifications--list">
                                <li>Interior surface on exterior walls to be insulated, drywalled, smooth finished and primed as per plan</li>
                                <li>Interior steel-framed partition walls to be fire rated, insulated, smooth finish and primed as per plan</li>
                            </ul>
                        </div>

                        <div className="commercial__unitSpecifications--listContainer">
                            <div className="commercial__unitSpecifications--listHeader">
                                <h3 className="themeHeader">Plumbing</h3>
                            </div>

                            <ul className="commercial__unitSpecifications--list">
                                <li>Sanitary sewer pipe available for connection from each unit</li>
                                <li>Cold water supply provided to each unit</li>
                            </ul>
                        </div>

                        <div className="commercial__unitSpecifications--listContainer">
                            <div className="commercial__unitSpecifications--listHeader">
                                <h3 className="themeHeader">Sprinkler & Fire Alarm</h3>
                            </div>

                            <ul className="commercial__unitSpecifications--list">
                                <li>Modifications by tenant</li>
                            </ul>
                        </div>

                        <div className="commercial__unitSpecifications--listContainer">
                            <div className="commercial__unitSpecifications--listHeader">
                                <h3 className="themeHeader">Electrical</h3>
                            </div>

                            <ul className="commercial__unitSpecifications--list">
                                <li>All units contain step-down transformers for 120V/208V 3Ø, 4-wire between 225A to 600-amp electrical panel depending of square footage</li>
                                <li>Rough-in including emergency lights and pull stations at exit doors</li>
                                <li>Rough-in to include wiring future handicap power door operator</li>
                                <li>Electrical outlets provided to minimum requirements of one (1) per wall</li>
                              </ul>
                        </div>

                        <div className="commercial__unitSpecifications--listContainer">
                            <div className="commercial__unitSpecifications--listHeader">
                                <h3 className="themeHeader">Heating, Ventilation and Air-Conditioning</h3>
                            </div>

                            <ul className="commercial__unitSpecifications--list">
                                <li>Hydronic water pipe connection c/w energy metering for installation of hybrid heat pump (equal to CGC Bulldog heat pump) excluding restaurant unit C001</li>
                                <li>Wall opening provided for future tenant provision of high efficiency ERV mounted to ceiling</li>
                            </ul>
                        </div>

                        <div className="commercial__unitSpecifications--listContainer">
                            <div className="commercial__unitSpecifications--listHeader">
                                <h3 className="themeHeader">Separately Metered</h3>
                            </div>

                            <ul className="commercial__unitSpecifications--list">
                                <li>Sub-meters will be installed by the Landlord or a third-party metering company in a location selected by the Landlord for the following services:</li>
                                <li style={{ marginLeft: '50px' }}>Domestic water and sewer</li>
                                <li style={{ marginLeft: '50px' }}>Electrical (Hydro)</li>
                                <li style={{ marginLeft: '50px' }}>Natural Gas in Unit C001 (roughed in for Restaurant space)</li>
                                <li style={{ marginLeft: '50px' }}>Energy (hydronic system)</li>
                            </ul>
                        </div>

                        <div className="commercial__unitSpecifications--listContainer">
                            <p style={{ fontSize: '12px' }}><span style={{ fontWeight: 'bold', fontSize: '12px' }}>Errors and Omissions:</span> Specifications are subject to change based on site conditions, regulations, and final plans. Tenants must verify the suitability of specifications for their intended us.</p>
                        </div>
                    </div>
                </div>

                <div className="commercial__unitSpecifications--footer">
                    <div className="commercial__unitSpecifications--footerContainer">
                        <h2 className="themeHeader">Inquire Now</h2>

                        <p>We have partnered with the experienced team at <span className="bold">Campanale</span> to handle the leasing of Les Boutiques at Carré Saint Louis. For leasing inquiries and to learn more about how you can become a part of this exciting development, contact us today!</p>

                        <div className="commercial__unitSpecifications--footerContact">
                            <span className="bold">Santana Campanale, Sales Representative</span>
                            <a href="tel:6132902262">613-290-2262</a>
                            <a href="mailto:santana@campanale.com">santana@campanale.com</a>
                        </div>

                        <a
                            href="https://www.campanale.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="commercial__unitSpecifications--footerLogo"
                        >
                            {ImageLoader('https://lepine-storage.nyc3.digitaloceanspaces.com/e99af3b9a65d3786307a18820cf503b1.svg', '', '', 324, 180, 0.1)}
                        </a>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );
}

export default UnitSpecifications;