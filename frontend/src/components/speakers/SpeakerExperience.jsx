import {
  FaChalkboardTeacher,
  FaQuestionCircle,
  FaUsers,
  FaBookReader,
  FaArrowRight,
} from "react-icons/fa";

import styles from "../../pages/Speakers.module.css";

function SpeakerExperience() {
  return (
    <section
      className={styles.speakerExperienceSection}
      data-aos="fade-up"
    >
      <div className={styles.speakerExperienceContainer}>

        {/* MORE THAN SPEAKERS */}

        <div
          className={styles.speakerExperienceIntro}
          data-aos="fade-up"
        >
          <span className={styles.speakerExperienceLabel}>
            MORE THAN SPEAKERS
          </span>

          <h2 className={styles.speakerExperienceTitle}>
            These Are Voices Committed to Equipping Leaders
          </h2>

          <p className={styles.speakerExperienceDescription}>
            These are not simply people coming to deliver lectures.
            They are voices committed to equipping leaders for
            multiplication.
          </p>

          <p className={styles.speakerExperienceDescription}>
            Every session is designed to answer an important question:
          </p>

          <div
            className={styles.speakerExperienceQuestion}
            data-aos="zoom-in"
          >
            <FaQuestionCircle
              className={styles.speakerExperienceQuestionIcon}
            />

            <blockquote className={styles.speakerExperienceQuote}>
              "How do I become a leader who raises other leaders?"
            </blockquote>
          </div>

          <p className={styles.speakerExperienceDescription}>
            Through biblical teaching, practical instruction, conversations,
            and shared experiences, participants will be challenged to think
            beyond personal achievement and embrace the responsibility of
            generational leadership.
          </p>
        </div>

        {/* EXPERIENCE HIGHLIGHTS */}

        <div
          className={styles.speakerExperienceHighlights}
          data-aos="fade-up"
        >

          <div
            className={styles.speakerExperienceHighlight}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className={styles.speakerExperienceHighlightIcon}>
              <FaChalkboardTeacher />
            </div>

            <h3 className={styles.speakerExperienceHighlightTitle}>
              BIBLICAL TEACHING
            </h3>

            <p className={styles.speakerExperienceHighlightText}>
              Receive sound biblical teaching that strengthens your
              understanding of Christian leadership and multiplication.
            </p>
          </div>

          <div
            className={styles.speakerExperienceHighlight}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className={styles.speakerExperienceHighlightIcon}>
              <FaBookReader />
            </div>

            <h3 className={styles.speakerExperienceHighlightTitle}>
              PRACTICAL INSTRUCTION
            </h3>

            <p className={styles.speakerExperienceHighlightText}>
              Learn practical principles and approaches that can be
              applied within your church, ministry, organisation, or team.
            </p>
          </div>

          <div
            className={styles.speakerExperienceHighlight}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className={styles.speakerExperienceHighlightIcon}>
              <FaUsers />
            </div>

            <h3 className={styles.speakerExperienceHighlightTitle}>
              SHARED EXPERIENCES
            </h3>

            <p className={styles.speakerExperienceHighlightText}>
              Learn from the experiences of leaders who are committed to
              developing people and creating generational impact.
            </p>
          </div>

        </div>

        {/* COME READY TO LEARN */}

        <div
          className={styles.speakerReadySection}
          data-aos="fade-up"
        >

          <div className={styles.speakerReadyContent}>

            <span className={styles.speakerReadyLabel}>
              COME READY TO LEARN
            </span>

            <h2 className={styles.speakerReadyTitle}>
              Come Ready to Receive What You Can Transfer to Others.
            </h2>

            <p className={styles.speakerReadyDescription}>
              Bring your questions.
            </p>

            <p className={styles.speakerReadyDescription}>
              Bring your leadership challenges.
            </p>

            <p className={styles.speakerReadyDescription}>
              Bring your team.
            </p>

            <p className={styles.speakerReadyDescription}>
              Bring the people you are developing.
            </p>

            <p className={styles.speakerReadyDescription}>
              And most importantly, come ready to receive what you can
              transfer to others.
            </p>

            <div className={styles.speakerReadyAction}>
              <a
                href="#speakers"
                className={styles.speakerReadyButton}
              >
                EXPLORE THE SPEAKERS
                <FaArrowRight />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SpeakerExperience;