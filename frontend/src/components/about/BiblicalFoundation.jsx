import {
  FaArrowDown,
  FaBookBible,
  FaUser,
  FaUsers,
  FaArrowRight
} from "react-icons/fa6";

import styles from "../../pages/About.module.css";

function BiblicalFoundation() {
  return (
    <section
      className={styles.biblicalFoundationSection}
      id="biblical-foundation"
      data-aos="fade-up"
    >

      <div className={styles.biblicalFoundationContainer}>

        {/* Header */}
        <div
          className={styles.biblicalFoundationHeader}
          data-aos="fade-up"
        >

          <div className={styles.biblicalFoundationIcon}>
            <FaBookBible />
          </div>

          <p className={styles.biblicalFoundationEyebrow}>
            THE BIBLICAL FOUNDATION
          </p>

          <h2 className={styles.biblicalFoundationTitle}>
            The 2 Timothy 2:2 Model
          </h2>

          <p className={styles.biblicalFoundationSubtitle}>
            Received. Developed. Entrusted. Multiplied.
          </p>

          <p className={styles.biblicalFoundationDescription}>
            The Exponential Conference is anchored in the principle
            found in 2 Timothy 2:2.
          </p>

        </div>

        {/* Scripture */}
        <div
          className={styles.biblicalFoundationScripture}
          data-aos="zoom-in"
          data-aos-delay="200"
        >

          <span className={styles.biblicalFoundationQuoteIcon}>
            <FaBookBible />
          </span>

          <p className={styles.biblicalFoundationReference}>
            2 Timothy 2:2
          </p>

          <blockquote className={styles.biblicalFoundationQuote}>
            "And the things that thou hast heard of me among many
            witnesses, the same commit thou to faithful men, who shall
            be able to teach others also."
          </blockquote>

        </div>

        {/* Multiplication Chain */}
        <div
          className={styles.biblicalFoundationChain}
          data-aos="fade-up"
          data-aos-delay="300"
        >

          {/* Paul */}
          <div className={styles.biblicalFoundationStep}>

            <div className={styles.biblicalFoundationStepIcon}>
              <FaUser />
            </div>

            <span className={styles.biblicalFoundationStepNumber}>
              01
            </span>

            <h3 className={styles.biblicalFoundationStepTitle}>
              PAUL
            </h3>

            <p className={styles.biblicalFoundationStepText}>
              The one who receives and carries revelation, experience,
              wisdom, and responsibility.
            </p>

          </div>

          <div className={styles.biblicalFoundationArrow}>
            <FaArrowRight />
          </div>

          {/* Timothy */}
          <div className={styles.biblicalFoundationStep}>

            <div className={styles.biblicalFoundationStepIcon}>
              <FaUser />
            </div>

            <span className={styles.biblicalFoundationStepNumber}>
              02
            </span>

            <h3 className={styles.biblicalFoundationStepTitle}>
              TIMOTHY
            </h3>

            <p className={styles.biblicalFoundationStepText}>
              The emerging leader intentionally developed through
              relationship, instruction, example, and assignment.
            </p>

          </div>

          <div className={styles.biblicalFoundationArrow}>
            <FaArrowRight />
          </div>

          {/* Faithful Men */}
          <div className={styles.biblicalFoundationStep}>

            <div className={styles.biblicalFoundationStepIcon}>
              <FaUsers />
            </div>

            <span className={styles.biblicalFoundationStepNumber}>
              03
            </span>

            <h3 className={styles.biblicalFoundationStepTitle}>
              FAITHFUL MEN
            </h3>

            <p className={styles.biblicalFoundationStepText}>
              People who have been tested, developed, entrusted, and
              prepared to carry responsibility.
            </p>

          </div>

          <div className={styles.biblicalFoundationArrow}>
            <FaArrowRight />
          </div>

          {/* Others */}
          <div className={styles.biblicalFoundationStep}>

            <div className={styles.biblicalFoundationStepIcon}>
              <FaUsers />
            </div>

            <span className={styles.biblicalFoundationStepNumber}>
              04
            </span>

            <h3 className={styles.biblicalFoundationStepTitle}>
              OTHERS
            </h3>

            <p className={styles.biblicalFoundationStepText}>
              The next generation who will receive what has been
              entrusted and continue the multiplication process.
            </p>

          </div>

        </div>

        {/* Bottom Statement */}
        <div
          className={styles.biblicalFoundationBottom}
          data-aos="fade-up"
          data-aos-delay="500"
        >

          <p className={styles.biblicalFoundationBottomText}>
            This is the power of multiplication:
            <strong>
              What God places in one person can reach generations.
            </strong>
          </p>

        </div>

      </div>

    </section>
  );
}

export default BiblicalFoundation;