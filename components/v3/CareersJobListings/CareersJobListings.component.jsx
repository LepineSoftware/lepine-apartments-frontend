import ContentWrapper from "../../../sections/ContentWrapper.component";
import { submitGAEvent } from "../../../utils/submitGAEvent";

const CareersJobListings = ({ jobs }) => {
  const JobListing = ({ content, i }) => {
    const { title, url, location } = content;

    return (
      <div
        className="careers__jobListings--item"
        data-aos="fade"
        data-aos-delay={(i + 1) * 50}
      >
        <h3>{title}</h3>
        <p>{location}</p>
        <a
          onClick={() => submitGAEvent("moved_to_dayforce")}
          href={url}
          rel="noreferrer"
          target="_blank"
          className="btn"
        >
          Apply
        </a>
      </div>
    );
  };

  return (
    <section className="careers__jobListings sp">
      <ContentWrapper cssClass="careers__perks--wrapper" size="xl">
        <h2 data-aos="fade" data-aos-delay="">
          Our Openings
        </h2>

        <div
          className="contentWrapper careers__jobListings--content"
          data-size="xl"
          data-screen="desktop"
        >
          {jobs.map((job, i) => (
            <JobListing key={i} content={job} i={i} />
          ))}
        </div>

        <h3>Don&apos;t see a position that suits you? Send us your resume!</h3>
        <a
          onClick={() => submitGAEvent("email_resume_clicked")}
          href="mailto:careers@lepinecorp.com?subject=Resume"
          className="btn themeBtn"
        >
          Click Here
        </a>
      </ContentWrapper>
    </section>
  );
};

export default CareersJobListings;
