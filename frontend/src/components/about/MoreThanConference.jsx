import {
  FaBullseye,
  FaBrain,
  FaBolt,
  FaLink,
  FaFlag
} from "react-icons/fa";

import styles from "../../pages/About.module.css";
import moreConfer from "../../assets/images/IMG_1096.jpg"

function MoreThanConference() {
  return (
    <section
      className={styles.moreThanConferenceSection}
      data-aos="fade-up"
    >

      <div className={styles.moreThanConferenceContainer}>

        {/* Header */}
        <div
          className={styles.moreThanConferenceHeader}
          data-aos="fade-up"
        >

          <p className={styles.moreThanConferenceEyebrow}>
            MORE THAN A CONFERENCE
          </p>

          <h2 className={styles.moreThanConferenceTitle}>
            A Platform for Leadership Formation and Generational Impact
          </h2>

          <p className={styles.moreThanConferenceDescription}>
            The Exponential Conference is more than a three-day event.
            It is a platform for leadership formation, ministry development,
            mentorship, networking, inspiration, and generational impact.
          </p>

        </div>

        {/* Content */}
        <div className={styles.moreThanConferenceContent}>

          <div
            className={styles.moreThanConferenceImageWrapper}
            data-aos="fade-right"
          >

            <img
              src={moreConfer}
              alt="Exponential Conference experience"
              className={styles.moreThanConferenceImage}
            />

            <div className={styles.moreThanConferenceImageOverlay}></div>

          </div>

          <div
            className={styles.moreThanConferenceText}
            data-aos="fade-left"
            data-aos-delay="200"
          >

            <p className={styles.moreThanConferenceParagraph}>
              Through powerful teaching, practical sessions, leadership
              conversations, worship, fellowship, and strategic engagement,
              participants are challenged to examine not only what they are
              doing as leaders, but also who they are developing to continue
              the work.
            </p>

            <p className={styles.moreThanConferenceParagraph}>
              Our goal is that participants leave the conference with more
              than information.
            </p>

          </div>

        </div>

        {/* Outcomes */}
        <div
          className={styles.moreThanConferenceOutcomes}
          data-aos="fade-up"
          data-aos-delay="300"
        >

          <article className={styles.moreThanConferenceOutcome}>

            <div className={styles.moreThanConferenceOutcomeIcon}>
              <FaBullseye />
            </div>

            <h3 className={styles.moreThanConferenceOutcomeTitle}>
              Clarity
            </h3>

            <p className={styles.moreThanConferenceOutcomeText}>
              A clearer understanding of your leadership responsibility.
            </p>

          </article>

          <article className={styles.moreThanConferenceOutcome}>

            <div className={styles.moreThanConferenceOutcomeIcon}>
              <FaBrain />
            </div>

            <h3 className={styles.moreThanConferenceOutcomeTitle}>
              Capacity
            </h3>

            <p className={styles.moreThanConferenceOutcomeText}>
              Greater ability to lead, develop, and influence others.
            </p>

          </article>

          <article className={styles.moreThanConferenceOutcome}>

            <div className={styles.moreThanConferenceOutcomeIcon}>
              <FaBolt />
            </div>

            <h3 className={styles.moreThanConferenceOutcomeTitle}>
              Conviction
            </h3>

            <p className={styles.moreThanConferenceOutcomeText}>
              A renewed commitment to generational leadership.
            </p>

          </article>

          <article className={styles.moreThanConferenceOutcome}>

            <div className={styles.moreThanConferenceOutcomeIcon}>
              <FaLink />
            </div>

            <h3 className={styles.moreThanConferenceOutcomeTitle}>
              Connection
            </h3>

            <p className={styles.moreThanConferenceOutcomeText}>
              Meaningful relationships with other leaders.
            </p>

          </article>

          <article className={styles.moreThanConferenceOutcome}>

            <div className={styles.moreThanConferenceOutcomeIcon}>
              <FaFlag />
            </div>

            <h3 className={styles.moreThanConferenceOutcomeTitle}>
              Commission
            </h3>

            <p className={styles.moreThanConferenceOutcomeText}>
              A determination to return home and begin multiplying what
              you have received.
            </p>

          </article>

        </div>

      </div>

    </section>
  );
}

export default MoreThanConference;