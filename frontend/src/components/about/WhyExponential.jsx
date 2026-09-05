import {
  FaArrowRight,
  FaChartLine,
  FaUsers,
  FaLightbulb,
  FaHandshake
} from "react-icons/fa";

import styles from "../../pages/About.module.css";

function WhyExponential() {
  return (
    <section
      className={styles.whyExponentialSection}
      data-aos="fade-up"
    >

      <div className={styles.whyExponentialContainer}>

        {/* Header */}
        <div
          className={styles.whyExponentialHeader}
          data-aos="fade-up"
        >

          <div className={styles.whyExponentialIcon}>
            <FaChartLine />
          </div>

          <p className={styles.whyExponentialEyebrow}>
            WHY "EXPONENTIAL"?
          </p>

          <h2 className={styles.whyExponentialTitle}>
            Because the Future Needs More Than Great Leaders
          </h2>

          <p className={styles.whyExponentialDescription}>
            The greatest evidence of leadership is not simply what you
            accomplish yourself, but what you enable others to accomplish.
          </p>

        </div>

        {/* Main Content */}
        <div className={styles.whyExponentialContent}>

          <div
            className={styles.whyExponentialText}
            data-aos="fade-right"
          >

            <p className={styles.whyExponentialParagraph}>
              A church becomes stronger when leaders are developed.
              A ministry becomes more sustainable when responsibility
              is transferred.
            </p>

            <p className={styles.whyExponentialParagraph}>
              A generation becomes stronger when wisdom is intentionally
              passed on. A movement becomes exponential when leaders
              begin to multiply leaders.
            </p>

            <div className={styles.whyExponentialQuestion}>
              <span className={styles.whyExponentialQuestionIcon}>
                <FaLightbulb />
              </span>

              <p>
                The question is no longer:
                <strong> "How many people can I lead?"</strong>
              </p>

              <p>
                The greater question is:
                <strong> "How many leaders can I raise?"</strong>
              </p>
            </div>

          </div>

          {/* Principle Cards */}
          <div
            className={styles.whyExponentialCards}
            data-aos="fade-left"
            data-aos-delay="200"
          >

            <article className={styles.whyExponentialCard}>

              <div className={styles.whyExponentialCardIcon}>
                <FaUsers />
              </div>

              <h3 className={styles.whyExponentialCardTitle}>
                Develop Leaders
              </h3>

              <p className={styles.whyExponentialCardText}>
                A leader may gather followers, but a multiplier develops
                people who can carry responsibility and reproduce vision.
              </p>

            </article>

            <article className={styles.whyExponentialCard}>

              <div className={styles.whyExponentialCardIcon}>
                <FaHandshake />
              </div>

              <h3 className={styles.whyExponentialCardTitle}>
                Transfer Responsibility
              </h3>

              <p className={styles.whyExponentialCardText}>
                Sustainable ministry grows when responsibility, wisdom,
                and leadership are intentionally entrusted to others.
              </p>

            </article>

          </div>

        </div>

        {/* CTA */}
        <div
          className={styles.whyExponentialAction}
          data-aos="fade-up"
          data-aos-delay="400"
        >

          <a
            href="#biblical-foundation"
            className={styles.whyExponentialButton}
          >
            DISCOVER THE MODEL

            <FaArrowRight
              className={styles.whyExponentialButtonIcon}
            />
          </a>

        </div>

      </div>

    </section>
  );
}

export default WhyExponential;