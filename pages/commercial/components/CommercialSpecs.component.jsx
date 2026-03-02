import ContentWrapper from "../../../sections/ContentWrapper.component";
import {  Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CommercialSpecs = () => {
    const content = [
        {
          header: 'Structure',
          items: [
            `Ceiling height from top of slab to underside of ceiling will be 5150mm (16'-11”) excluding any required drops, mechanical, plumbing, sprinkler, electrical or general common building requirements (as per plan)`,
            `Unfinished floor and ceiling concrete slab throughout`
          ]
        },
        {
          header: 'Walls and Ceilings',
          items: [
            `Interior surface on exterior walls to be insulated, drywalled, smooth finished and primed as per plan`,
            `Interior steel-framed partition walls to be fire rated, insulated, smooth finish and primed as per plan`,
          ]
        },
        {
          header: 'Plumbing',
          items: [
            `Sanitary sewer pipe available for connection from each unit`,
            `Cold water supply provided to each unit`
          ]
        },
        {
          header: 'Sprinkler & Fire Alarm',
          items: [
            `Modifications by tenant`
          ]
        },
        {
          header: 'Electrical',
          items: [
            `All units contain step-down transformers for 120V/208V 3Ø, 4-wire between 225A to 600-amp electrical panel depending of square footage`,
            `Rough-in including emergency lights and pull stations at exit doors`,
            `Rough-in to include wiring future handicap power door operator`,
            `Electrical outlets provided to minimum requirements of one(1) per wall`
          ]
        },
        {
          header: 'Heating, Ventilation and Air-Conditioning',
          items: [
            `Hydronic water pipe connection c/w energy metering for installation of hybrid heat pump (equal to CGC Bulldog heat pump) excluding restaurant unit C001`,
            `Wall opening provided for future tenant provision of high efficiency ERV mounted to ceiling`
          ]
        },
        {
          header: 'Separately Metered',
          items: [
            `Sub-meters will be installed by the Landlord or a third-party metering company in a location selected by the Landlord for the following services:`,
            `Domestic water and sewer`,
            `Electrical (Hydro)`,
            `Natural Gas in Unit C001 (roughed in for Restaurant space)`,
            `Energy (hydronic system)`,
          ]
        },
      ];

    const CommercialSpecItem = ({ header, items }) => {
        return (
            <div className="commercial__specs--item" data-aos="fade">
                <h3>{header}</h3>
                <ul className="commercial__specs--list">
                    {items.map((item, i) => (
                        <li key={i} className="commercial__specs--listItem">{item}</li>
                    ))}
                </ul>
            </div>
        )
    }

    const bgOverlay = {
        backgroundImage: `url('https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/commercial/concrete-1646788_1920.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    return (
        <section className="commercial__specs--container sp">
            <div className="commercial__specs--overlay" style={bgOverlay}></div>
            <ContentWrapper size="lg">
                <h2>Unit Specifications</h2>

                <div className="commercial__specs" data-screen="desktop">
                    {content.map((spec, i) => {
                        const { header, items } = spec;
                        return <CommercialSpecItem header={header} items={items} key={i} />
                    })}
                </div>

                <div className="commercial__specs" data-screen="mobile">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{
                            clickable: true
                        }}
                        slidesPerView="auto"
                        spaceBetween={25}
                        className="commercial__specs--swiper paginationMargin"
                    >
                        {content.map((spec, i) => {
                        const { header, items } = spec;
                        return <SwiperSlide key={i}>
                            <CommercialSpecItem header={header} items={items} key={i} />
                        </SwiperSlide>
                    })}
                    </Swiper>
                </div>
            </ContentWrapper>
        </section>
    )
}

export default CommercialSpecs;