import {
  FaArrowRight,
  FaBullseye,
  FaChurch,
  FaUsers
} from "react-icons/fa";

import styles from "../../pages/About.module.css";

function AboutIntroduction() {
  return (
    <section
      className={styles.aboutIntroductionSection}
      id="conference-purpose"
      data-aos="fade-up"
    >

      <div className={styles.aboutIntroductionContainer}>

        {/* Section Header */}
        <div
          className={styles.aboutIntroductionHeader}
          data-aos="fade-up"
        >

          <span className={styles.aboutIntroductionIcon}>
            <FaUsers />
          </span>

          <p className={styles.aboutIntroductionEyebrow}>
            ABOUT THE CONFERENCE
          </p>

          <h2 className={styles.aboutIntroductionTitle}>
            Kingdom Impact Should Not Stop With One Person
          </h2>

        </div>

        {/* Main Content */}
        <div className={styles.aboutIntroductionContent}>

          <div
            className={styles.aboutIntroductionText}
            data-aos="fade-right"
          >

            <p className={styles.aboutIntroductionParagraph}>
              The Exponential Conference therefore focuses on the
              development of leaders, ministers, pastors, educators,
              mentors, church workers, and emerging leaders who understand
              that effective leadership is not merely about achieving
              results personally, but about raising others who can carry
              the vision, reproduce the values, and extend the assignment.
            </p>

            <p className={styles.aboutIntroductionParagraph}>
              We are committed to developing people who can influence,
              serve, reproduce what God has entrusted to them, and create
              lasting Kingdom impact across generations.
            </p>

          </div>

          {/* Vision Card */}
          <div
            className={styles.aboutIntroductionCard}
            data-aos="fade-left"
            data-aos-delay="200"
          >

            <div className={styles.aboutIntroductionCardIcon}>
              <FaBullseye />
            </div>

            {/* <span className={styles.aboutIntroductionCardLabel}>
              OUR VISION
            </span> */}

            <h3 className={styles.aboutIntroductionCardTitle}>
             Our Vision
            </h3>

            <p className={styles.aboutIntroductionCardText}>
              To raise and equip leaders who multiply themselves, develop
              others, strengthen the Church, and create lasting Kingdom
              impact across generations.
            </p>

            <div className={styles.aboutIntroductionCardArrow}>
              <FaArrowRight />
            </div>

          </div>

        </div>

        {/* Supporting Statements */}
        <div
          className={styles.aboutIntroductionHighlights}
          data-aos="fade-up"
          data-aos-delay="400"
        >

          <div className={styles.aboutIntroductionHighlight}>
            <span className={styles.aboutIntroductionHighlightIcon}>
              <FaUsers />
            </span>

            <div className={styles.aboutIntroductionHighlightContent}>
              <h3>Develop People</h3>

              <p>
                Develop people rather than simply gather followers.
              </p>
            </div>
          </div>

          <div className={styles.aboutIntroductionHighlight}>
            <span className={styles.aboutIntroductionHighlightIcon}>
              <FaChurch />
            </span>

            <div className={styles.aboutIntroductionHighlightContent}>
              <h3>Strengthen the Church</h3>

              <p>
                Strengthen churches and ministries through leadership
                development.
              </p>
            </div>
          </div>

          <div className={styles.aboutIntroductionHighlight}>
            <span className={styles.aboutIntroductionHighlightIcon}>
              <FaUsers />
            </span>

            <div className={styles.aboutIntroductionHighlightContent}>
              <h3>Multiply Leaders</h3>

              <p>
                Raise leaders who can develop and empower others.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutIntroduction;