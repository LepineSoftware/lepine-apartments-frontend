import { ImageLoader } from "../../utils/imageLoader";
import EventIcon from "../../assets/svg/icon-event.svg";
import CloseIcon from "../../assets/svg/openHouseClose.png";
import GoogleIcon from "../../assets/svg/icon-google-cal.svg";
import OutlookIcon from "../../assets/svg/icon-outlook-cal.svg";
import { useState, useEffect } from "react";

const getETNow = () => {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
  );
};

const formatGCalDate = (dateString) =>
  new Date(dateString).toISOString().replace(/-|:|\.\d\d\d/g, "");
const formatOutlookDate = (dateString) => new Date(dateString).toISOString();

const POPUPS = [
  {
    id: "february7",
    name: "Open House at Lépine Lodge Renfrew",
    streetAddress: "459 Barnet Blvd",
    city: "Renfrew, ON",
    location: "Lépine Lodge Renfrew",
    body: `You are warmly invited to an Open House at Lépine Lodge Apartments in Renfrew on Saturday, February 7th, from 10:00 a.m. to 4:00 p.m. Visit us at 459 Barnet Blvd., Renfrew to tour model suites, explore spacious floor plans, and experience the comfort and convenience of Lépine Lodge living. Our friendly leasing team will be on-site to answer your questions, review current availability, and help you find a home that fits your lifestyle. We look forward to welcoming you this weekend.`,
    theme: "lepinelodge",
    date: "February 7th",
    time: "10am - 4pm",
    googleMaps:
      "https://www.google.com/maps/place/459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9/@45.4679649,-76.6627255,15z/data=!4m16!1m9!3m8!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!2s459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9!3b1!8m2!3d45.4677927!4d-76.6624736!10e5!16s%2Fg%2F11vrdg3x9v!3m5!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!8m2!3d45.4677927!4d-76.6624736!16s%2Fg%2F11vrdg3x9v?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D",
    startDate: "2026-02-01T16:01:00-05:00",
    endDate: "2026-02-07T16:00:00-05:00",
    eventStart: "2026-02-07T10:00:00-05:00",
    eventEnd: "2026-02-07T16:00:00-05:00",
  },
  {
    id: "february14",
    name: "Open House at Lépine Lodge Renfrew",
    streetAddress: "459 Barnet Blvd",
    location: "Lépine Lodge Renfrew",
    body: `You are warmly invited to an Open House at Lépine Lodge Apartments in Renfrew on Saturday, February 14th, from 10:00 a.m. to 4:00 p.m. Visit us at 459 Barnet Blvd., Renfrew to tour model suites, explore spacious floor plans, and experience the comfort and convenience of Lépine Lodge living. Our friendly leasing team will be on-site to answer your questions, review current availability, and help you find a home that fits your lifestyle. We look forward to welcoming you this weekend.`,
    city: "Renfrew, ON",
    theme: "lepinelodge",
    date: "February 14th",
    time: "10am - 4pm",
    googleMaps:
      "https://www.google.com/maps/place/459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9/@45.4679649,-76.6627255,15z/data=!4m16!1m9!3m8!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!2s459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9!3b1!8m2!3d45.4677927!4d-76.6624736!10e5!16s%2Fg%2F11vrdg3x9v!3m5!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!8m2!3d45.4677927!4d-76.6624736!16s%2Fg%2F11vrdg3x9v?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D",
    startDate: "2026-02-07T16:01:00-05:00",
    endDate: "2026-02-14T16:00:00-05:00",
    eventStart: "2026-02-14T10:00:00-05:00",
    eventEnd: "2026-02-14T16:00:00-05:00",
  },
  {
    id: "february21",
    name: "Open House at Lépine Lodge Renfrew",
    streetAddress: "459 Barnet Blvd",
    location: "Lépine Lodge Renfrew",
    body: `You are warmly invited to an Open House at Lépine Lodge Apartments in Renfrew on Saturday, February 21st, from 10:00 a.m. to 4:00 p.m. Visit us at 459 Barnet Blvd., Renfrew to tour model suites, explore spacious floor plans, and experience the comfort and convenience of Lépine Lodge living. Our friendly leasing team will be on-site to answer your questions, review current availability, and help you find a home that fits your lifestyle. We look forward to welcoming you this weekend.`,
    city: "Renfrew, ON",
    theme: "lepinelodge",
    date: "February 21st",
    time: "10am - 4pm",
    googleMaps:
      "https://www.google.com/maps/place/459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9/@45.4679649,-76.6627255,15z/data=!4m16!1m9!3m8!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!2s459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9!3b1!8m2!3d45.4677927!4d-76.6624736!10e5!16s%2Fg%2F11vrdg3x9v!3m5!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!8m2!3d45.4677927!4d-76.6624736!16s%2Fg%2F11vrdg3x9v?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D",
    startDate: "2026-02-14T16:01:00-05:00",
    endDate: "2026-02-21T16:00:00-05:00",
    eventStart: "2026-02-21T10:00:00-05:00",
    eventEnd: "2026-02-21T16:00:00-05:00",
  },
  {
    id: "february28",
    name: "Open House at Lépine Lodge Renfrew",
    streetAddress: "459 Barnet Blvd",
    city: "Renfrew, ON",
    location: "Lépine Lodge Renfrew",
    body: `You are warmly invited to an Open House at Lépine Lodge Apartments in Renfrew on Saturday, February 28th, from 10:00 a.m. to 4:00 p.m. Visit us at 459 Barnet Blvd., Renfrew to tour model suites, explore spacious floor plans, and experience the comfort and convenience of Lépine Lodge living. Our friendly leasing team will be on-site to answer your questions, review current availability, and help you find a home that fits your lifestyle. We look forward to welcoming you this weekend.`,
    theme: "lepinelodge",
    date: "February 28th",
    time: "10am - 4pm",
    googleMaps:
      "https://www.google.com/maps/place/459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9/@45.4679649,-76.6627255,15z/data=!4m16!1m9!3m8!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!2s459+Barnet+Blvd,+Renfrew,+ON+K7V+0C9!3b1!8m2!3d45.4677927!4d-76.6624736!10e5!16s%2Fg%2F11vrdg3x9v!3m5!1s0x4cd17f746fa03dd5:0x22bd312ad8346793!8m2!3d45.4677927!4d-76.6624736!16s%2Fg%2F11vrdg3x9v?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D",
    startDate: "2026-02-21T16:01:00-05:00",
    endDate: "2026-02-28T16:00:00-05:00",
    eventStart: "2026-02-28T10:00:00-05:00",
    eventEnd: "2026-02-28T16:00:00-05:00",
  },
];

const MicroPopup = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const now = getETNow();
    const current = POPUPS.find((p) => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      return now >= start && now <= end;
    });

    if (current) {
      if (!sessionStorage.getItem("userClosedMicroPopup")) {
        setActivePopup(current);
        setIsVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!activePopup || !isVisible) return;
    const timer = setInterval(() => {
      const now = getETNow();
      const target = new Date(activePopup.eventStart);
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activePopup, isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      sessionStorage.setItem("userClosedMicroPopup", "true");
      setIsVisible(false);
    }, 150);
  };

  const getGoogleUrl = () => {
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(activePopup.name)}&dates=${formatGCalDate(activePopup.eventStart)}/${formatGCalDate(activePopup.eventEnd)}&details=${encodeURIComponent(activePopup.body ? activePopup.body : "")}&location=${encodeURIComponent(activePopup.streetAddress + ", " + activePopup.city)}&sf=true&output=xml`;
  };

  const getOutlookUrl = () => {
    return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(activePopup.name)}&startdt=${formatOutlookDate(activePopup.eventStart)}&enddt=${formatOutlookDate(activePopup.eventEnd)}&body=${encodeURIComponent(activePopup.body ? activePopup.body : "")}&location=${encodeURIComponent(activePopup.streetAddress + ", " + activePopup.city)}`;
  };

  if (!isVisible || !activePopup) return null;

  return (
    <div
      className="microPopup__wrapper"
      data-close={isClosing}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="microPopup"
        data-close={isClosing}
        data-theme={activePopup.theme}
      >
        <div className="microPopup__row" data-row="header">
          <div className="microPopup__close" onClick={handleClose}>
            {ImageLoader(CloseIcon.src, "", "Close", 25, 25)}
          </div>
          <div className="microPopup__header">
            <h3>
              OPEN
              <br />
              HOUSE
            </h3>
            {ImageLoader(EventIcon.src, "", "", 70, 70)}
          </div>
          <hr />
          <div className="microPopup__subtitle">
            <h4>At {activePopup.location}</h4>
          </div>
        </div>

        <div className="microPopup__row" data-row="copy">
          {/* 1. Date and Time (Themed Colour) */}
          <div className="microPopup__eventDate">
            <h3>
              {activePopup.date}
              <br />
              {activePopup.time}
            </h3>
          </div>

          {/* 2. Address (Black) */}
          <div className="microPopup__address">
            <a
              href={activePopup.googleMaps}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleClose()}
            >
              <p>{activePopup.streetAddress}</p>
              <p>{activePopup.city}</p>
            </a>
          </div>

          {/* 3. Calendar Links (Black) */}
          <div className="microPopup__calendar">
            <p>Add to your calendar:</p>
            <div className="microPopup__calendarIcons">
              <a
                href={getGoogleUrl()}
                target="_blank"
                rel="noreferrer"
                title="Add to Google Calendar"
                onClick={() =>
                  gtag("event", "open_house_calendar") && handleClose()
                }
              >
                {ImageLoader(GoogleIcon?.src || "", "", "Google", 30, 30)}
              </a>
              <a
                href={getOutlookUrl()}
                target="_blank"
                rel="noreferrer"
                title="Add to Outlook"
                onClick={() =>
                  gtag("event", "open_house_calendar") && handleClose()
                }
              >
                {ImageLoader(OutlookIcon?.src || "", "", "Outlook", 30, 30)}
              </a>
            </div>
          </div>

          {/* 4. Countdown (Light Grey Box) */}
          {timeLeft && (
            <div className="microPopup__countdown">
              <h4>Starts In:</h4>
              <span>
                {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MicroPopup;
