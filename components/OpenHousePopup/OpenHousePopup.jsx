import { useState, useEffect } from "react";
import styles from "./OpenHousePopup.module.scss";
import { ImageLoader } from "../../utils/imageLoader";
import EventIcon from "../../assets/svg/icon-event.svg";
import CloseIcon from "../../assets/svg/openHouseClose.png";
import GoogleIcon from "../../assets/svg/icon-google-cal.svg";
import OutlookIcon from "../../assets/svg/icon-outlook-cal.svg";

// Updated paths to static JSON files
import smithsFallsOpenHouses from "../../static/openhouse/smithsFalls.json";
import renfrewOpenHouses from "../../static/openhouse/renfrew.json";
import carletonPlaceOpenHouses from "../../static/openhouse/carletonPlace.json";
import kanataOpenHouses from "../../static/openhouse/kanata.json";
import saintEmilionOpenHouses from "../../static/openhouse/saintEmilion.json";
import theNormandOpenHouses from "../../static/openhouse/theNormand.json";

// Combined data structure
const DATA = {
  SMITHSFALLS: smithsFallsOpenHouses,
  RENFREW: renfrewOpenHouses,
  CARLETONPLACE: carletonPlaceOpenHouses,
  KANATA: kanataOpenHouses,
  SAINTEMILION: saintEmilionOpenHouses,
  THENORMAND: theNormandOpenHouses,
};

// All dates in the JSON files carry their own UTC offset, so comparing them
// against the real current instant is correct in every visitor timezone.
// In development, `?ohNow=<ISO date>` simulates a different moment for testing.
const getNow = () => {
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    const override = new URLSearchParams(window.location.search).get("ohNow");
    if (override && !isNaN(new Date(override))) {
      const offset = new Date(override) - window.__ohPageLoad;
      return new Date(Date.now() + offset);
    }
  }
  return new Date();
};

if (typeof window !== "undefined") window.__ohPageLoad = Date.now();

const formatGCalDate = (dateString) =>
  new Date(dateString).toISOString().replace(/-|:|\.\d\d\d/g, "");
const formatOutlookDate = (dateString) => new Date(dateString).toISOString();

const OpenHouseItem = ({ event, handleClose }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = getNow();
      const diff = new Date(event.eventStart) - now;
      if (diff > 0) {
        setIsLive(false);
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
        setIsLive(now < new Date(event.eventEnd));
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [event]);

  const getGoogleUrl = () =>
    `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${formatGCalDate(event.eventStart)}/${formatGCalDate(event.eventEnd)}&details=${encodeURIComponent(event.body || "")}&location=${encodeURIComponent(event.streetAddress + ", " + event.city)}&sf=true&output=xml`;

  const getOutlookUrl = () =>
    `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.name)}&startdt=${formatOutlookDate(event.eventStart)}&enddt=${formatOutlookDate(event.eventEnd)}&body=${encodeURIComponent(event.body || "")}&location=${encodeURIComponent(event.streetAddress + ", " + event.city)}`;

  return (
    <div className={styles.card} data-theme={event.theme}>
      <div className={styles.imageBackground}>
        {ImageLoader(event.image, "", event.location, 400, 250)}
      </div>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <div className={styles.details}>
            <h3>{event.location}</h3>
            <div className={styles.dateInfo}>
              <p className={styles.dateText}>{event.date}</p>
              <p className={styles.timeText}>{event.time}</p>
            </div>
            <div className={styles.address}>
              <a
                href={event.googleMaps}
                target="_blank"
                rel="noreferrer"
                onClick={handleClose}
              >
                <p>
                  {event.streetAddress}, {event.city}
                </p>
              </a>
            </div>
          </div>

          <div className={styles.calendar}>
            <p>ADD TO CALENDAR:</p>
            <div className={styles.calendarIcons}>
              <a
                href={getGoogleUrl()}
                target="_blank"
                rel="noreferrer"
                title="Google"
                onClick={() =>
                  gtag("event", `${event.theme}_oh_calendar`) && handleClose()
                }
              >
                {ImageLoader(GoogleIcon.src, "", "Google", 32, 32)}
              </a>
              <a
                href={getOutlookUrl()}
                target="_blank"
                rel="noreferrer"
                title="Outlook"
                onClick={() =>
                  gtag("event", `${event.theme}_oh_calendar`) && handleClose()
                }
              >
                {ImageLoader(OutlookIcon.src, "", "Outlook", 32, 32)}
              </a>
            </div>
          </div>
        </div>

        {timeLeft && (
          <div className={styles.countdown}>
            <h4>Starts In:</h4>
            <span>
              {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
            </span>
          </div>
        )}
        {isLive && (
          <div className={styles.countdown}>
            <h4>Happening Now:</h4>
            <span>Until {event.time.split("-").pop().trim()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const OpenHousePopup = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const now = getNow();
    const foundEvents = [];
    // Check each property category for valid upcoming events
    Object.keys(DATA).forEach((locationKey) => {
      const upcoming = DATA[locationKey].find((p) => {
        const start = new Date(p.startDate);
        const end = new Date(p.endDate);
        return now >= start && now <= end;
      });
      if (upcoming) foundEvents.push(upcoming);
    });

    if (
      foundEvents.length > 0 &&
      !sessionStorage.getItem("userClosedOpenHousePopup")
    ) {
      setActiveEvents(foundEvents);
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      sessionStorage.setItem("userClosedOpenHousePopup", "true");
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible || activeEvents.length === 0) return null;

  return (
    <div
      className={styles.overlay}
      data-closing={isClosing}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close"
        >
          {ImageLoader(CloseIcon.src, "", "Close", 15, 15)}
        </button>

        <div className={styles.topHeader}>
          <div className={styles.titleGroup}>
            {ImageLoader(EventIcon.src, "", "", 40, 40)}
            <h3>
              {activeEvents.length > 1
                ? "LÉPINE OPEN HOUSES"
                : "LÉPINE OPEN HOUSE"}
            </h3>
          </div>
        </div>

        <div
          className={`${styles.grid} ${activeEvents.length > 1 ? styles.dual : styles.single}`}
        >
          {activeEvents.map((event) => (
            <OpenHouseItem
              key={event.id}
              event={event}
              handleClose={handleClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenHousePopup;
