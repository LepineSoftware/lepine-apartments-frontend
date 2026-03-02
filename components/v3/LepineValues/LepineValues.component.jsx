import Image from "next/image";
import { useEffect, useState } from "react";
import ContentWrapper from "../../../sections/ContentWrapper.component";

import LetterL from "./assets/LetterL.png";
import LetterE from "./assets/LetterE.png";
import LetterP from "./assets/LetterP.png";
import LetterI from "./assets/LetterI.png";
import LetterN from "./assets/LetterN.png";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const LepineValues = () => {
  const [index, setIndex] = useState(0);
  const [disableAutoplay, setDisableAutoplay] = useState(false);

  const UpdateValue = (i) => {
    setDisableAutoplay(true);
    setIndex(i);
  };

  const Autoplay = () => {
    if (index === 5) {
      setIndex(() => 0);
    } else {
      setIndex(() => index + 1);
    }
  };

  useEffect(() => {
    if (!disableAutoplay) {
      const t = setInterval(() => {
        Autoplay();
      }, 10000);

      return () => clearInterval(t);
    }
  }, [index]);

  return (
    <section className="lepineValues">
      <ContentWrapper size="xl">
        <h2>What makes our team great?</h2>
      </ContentWrapper>

      <ContentWrapper size="xl">
        <div className="lepineValuesButtons">
          <span
            className={
              index === 0
                ? ["lepineValuesButton", "active"].join(" ")
                : "lepineValuesButton"
            }
            onClick={() => UpdateValue(0)}
          >
            <Image src={LetterL.src} height={50} width={50} alt="L" />
          </span>

          <span
            className={
              index === 1
                ? ["lepineValuesButton", "active"].join(" ")
                : "lepineValuesButton"
            }
            onClick={() => UpdateValue(1)}
          >
            <Image src={LetterE.src} height={50} width={50} alt="E" />
          </span>

          <span
            className={
              index === 2
                ? ["lepineValuesButton", "active"].join(" ")
                : "lepineValuesButton"
            }
            onClick={() => UpdateValue(2)}
          >
            <Image src={LetterP.src} height={50} width={50} alt="P" />
          </span>

          <span
            className={
              index === 3
                ? ["lepineValuesButton", "active"].join(" ")
                : "lepineValuesButton"
            }
            onClick={() => UpdateValue(3)}
          >
            <Image src={LetterI.src} height={50} width={50} alt="I" />
          </span>

          <span
            className={
              index === 4
                ? ["lepineValuesButton", "active"].join(" ")
                : "lepineValuesButton"
            }
            onClick={() => UpdateValue(4)}
          >
            <Image src={LetterN.src} height={50} width={50} alt="N" />
          </span>

          <span
            className={
              index === 5
                ? ["lepineValuesButton", "active"].join(" ")
                : "lepineValuesButton"
            }
            onClick={() => UpdateValue(5)}
          >
            <Image src={LetterE.src} height={50} width={50} alt="E" />
          </span>
        </div>

        <div
          className={
            index === 0
              ? ["lepineValuesLetter", "active"].join(" ")
              : "lepineValuesLetter"
          }
        >
          <h2>Leaders</h2>
          <p className="lepineValuesLetterCopy">
            As industry leaders in residential real estate, we set the benchmark
            for innovation and excellence. We believe leadership extends beyond
            senior roles. Our leaders at all levels inspire, empower, and guide
            their colleagues, fostering a culture of collaboration,
            accountability, and shared success.
          </p>
        </div>

        <div
          className={
            index === 1
              ? ["lepineValuesLetter", "active"].join(" ")
              : "lepineValuesLetter"
          }
        >
          <h2>Efficient</h2>
          <p className="lepineValuesLetterCopy">
            We optimize resources and time to achieve the best possible results.
            This emphasizes streamlined processes, smart decision-making, and
            the ability to deliver high-quality outcomes with minimal waste and
            delays.
          </p>
        </div>

        <div
          className={
            index === 2
              ? ["lepineValuesLetter", "active"].join(" ")
              : "lepineValuesLetter"
          }
        >
          <h2>Passionate</h2>
          <p className="lepineValuesLetterCopy">
            We ignite our work with passion, fueling creativity, perseverance,
            and a relentless pursuit of excellence. We believe in the power of
            passion to transform ideas into reality and make a lasting impact.
          </p>
        </div>

        <div
          className={
            index === 3
              ? ["lepineValuesLetter", "active"].join(" ")
              : "lepineValuesLetter"
          }
        >
          <h2>Initiative</h2>
          <p className="lepineValuesLetterCopy">
            We are innovators, driven by a spirit of disciplined exploration. We
            foster a culture of well-structured initiative, encouraging our team
            to identify and pursue relevant opportunities for improvement and
            growth through a defined process. This allows us to push boundaries
            while ensuring our efforts are aligned with our strategic goals and
            deliver real, sustainable value.
          </p>
        </div>

        <div
          className={
            index === 4
              ? ["lepineValuesLetter", "active"].join(" ")
              : "lepineValuesLetter"
          }
        >
          <h2>Noble</h2>
          <p className="lepineValuesLetterCopy">
            We conduct ourselves with the utmost integrity, treating everyone
            with respect and fairness. We strive to make a positive impact on
            the world, building a legacy of trust and admiration through our
            ethical conduct and unwavering commitment to doing the right thing.
          </p>
        </div>

        <div
          className={
            index === 5
              ? ["lepineValuesLetter", "active"].join(" ")
              : "lepineValuesLetter"
          }
        >
          <h2>Excellence</h2>
          <p className="lepineValuesLetterCopy">
            We strive for the highest standards in all we do. Excellence
            reflects a commitment to quality, continuous improvement, and
            delivering superior value in everything we do.
          </p>
        </div>
      </ContentWrapper>

      <a
        onClick={() => submitGAEvent("moved_to_dayforce")}
        data-aos="fade"
        data-aos-delay="500"
        href="https://jobs.dayforcehcm.com/en-CA/lepine/CANDIDATEPORTAL"
        rel="noreferrer"
        target="_blank"
        className="btn btnWhite"
      >
        Join the team
      </a>
    </section>
  );
};

export default LepineValues;
