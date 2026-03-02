import Image from "next/image";
import { submitGAEvent } from "../../../utils/submitGAEvent";

import CareerGrowth from "./assets/careergrowth.svg";
import CompetitiveWages from "./assets/competitivewages.svg";
import Flexible from "./assets/flexiblehealthcarespendingaccount.svg";
import PaidSickLeave from "./assets/paidsickleave.svg";
import ReferralBonusProgram from "./assets/referralbonusprogram.svg";
import RRSPDPSP from "./assets/rrspdpspcontributionplan.svg";
import VacationPackages from "./assets/vacationpackages.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const perks = [
  {
    icon: CompetitiveWages.src,
    header: "Competitive Wages",
    copy: "Earn more than just a salary – join a team where your hard work is recognized and rewarded.",
  },
  {
    icon: Flexible.src,
    header: "Flexible Health Care Spending Account",
    copy: "Take control of your well-being with a flexible health care spending account.",
  },
  {
    icon: RRSPDPSP.src,
    header: "RRSP/DPSP Contribution Plan",
    copy: "Secure your financial future with our retirement savings plans, including RRSP and DPSP.",
  },
  {
    icon: ReferralBonusProgram.src,
    header: "Referral Bonus Program",
    copy: "Share in our success by referring top talent to our team.",
  },
  {
    icon: VacationPackages.src,
    header: "Vacation Packages",
    copy: "Enjoy ample time off to rest, recharge, and explore.",
  },
  {
    icon: PaidSickLeave.src,
    header: "Paid Sick Leave",
    copy: "Prioritize your health and well-being without sacrificing income.",
  },
  {
    icon: CareerGrowth.src,
    header: "Career Growth",
    copy: "Forge your path to success with opportunities for professional development, mentorship & advacement.",
  },
];

const CareerPerks = () => {
  const PerksItem = ({ item, i }) => {
    const { icon, header, copy } = item;

    return (
      <div
        className="careers__perks--item"
        data-aos="fade"
        data-aos-delay={(i + 1) * 50}
      >
        <Image src={icon} alt="" height={75} width={75} />
        <h3>{header}</h3>
        <p>{copy}</p>
      </div>
    );
  };

  return (
    <div className="careers__perks sp">
      <h2 data-aos="fade" data-aos-delay="">
        Our Perks
      </h2>

      <div
        className="contentWrapper careers__perks--content"
        data-size="xl"
        data-screen="desktop"
      >
        {perks.map((item, i) => (
          <PerksItem key={i} item={item} i={i} />
        ))}
      </div>

      <div className="careers__perks--content" data-screen="mobile">
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={25}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="paginationMargin"
        >
          {perks.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <PerksItem item={item} i={i} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <a
        onClick={() => submitGAEvent("moved_to_dayforce")}
        data-aos="fade"
        data-aos-delay="500"
        href="https://jobs.dayforcehcm.com/en-CA/lepine/CANDIDATEPORTAL"
        rel="noreferrer"
        target="_blank"
        className="btn"
      >
        Find Your Role
      </a>
    </div>
  );
};

export default CareerPerks;
