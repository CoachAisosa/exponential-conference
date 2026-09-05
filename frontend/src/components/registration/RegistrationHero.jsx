import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaClipboardCheck,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import styles from "../../pages/Registration.module.css";

function RegistrationHero() {
  return (
    <section
      className={styles.registrationHeroSection}
      data-aos="fade-up"
    >
      <div className={styles.registrationHeroOverlay}></div>

      <div className={styles.registrationHeroContainer}>

        <div
          className={styles.registrationHeroIcon}
          data-aos="zoom-in"
        >
          <FaClipboardCheck />
        </div>

        <div
          className={styles.registrationHeroContent}
          data-aos="fade-up"
        >

          <p className={styles.registrationHeroEyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h1 className={styles.registrationHeroTitle}>
            SECURE YOUR PLACE
          </h1>

          <h2 className={styles.registrationHeroTheme}>
            THE MULTIPLIER
          </h2>

          <p className={styles.registrationHeroSubtitle}>
            Raising Leaders Who Multiply
          </p>

          <p className={styles.registrationHeroDescription}>
            The Exponential Conference 2026 is a strategic gathering for
            pastors, ministers, church leaders, Christian educators,
            mentors, emerging leaders, church workers, and everyone
            committed to developing people and multiplying Kingdom impact.
          </p>

          <div className={styles.registrationHeroDetails}>

            <div className={styles.registrationHeroDetailItem}>
              <FaCalendarAlt
                className={styles.registrationHeroDetailIcon}
              />

              <div className={styles.registrationHeroDetailContent}>
                <span className={styles.registrationHeroDetailLabel}>
                  DATE
                </span>

                <p>9th–11th December 2026</p>
              </div>
            </div>

            <div className={styles.registrationHeroDetailItem}>
              <FaMapMarkerAlt
                className={styles.registrationHeroDetailIcon}
              />

              <div className={styles.registrationHeroDetailContent}>
                <span className={styles.registrationHeroDetailLabel}>
                  VENUE
                </span>

                <p>Dream City Christian Centre</p>
              </div>
            </div>

          </div>

          <div className={styles.registrationHeroActions}>

            <a
              href="#registration-form"
              className={styles.registrationHeroRegisterButton}
            >
              REGISTER NOW
              <FaArrowRight />
            </a>

            <Link
              to="/about"
              className={styles.registrationHeroExploreButton}
            >
              LEARN ABOUT THE CONFERENCE
            </Link>

          </div>

          <div
            className={styles.registrationHeroScripture}
            data-aos="fade-up"
          >
            <span className={styles.registrationHeroScriptureReference}>
              KEY SCRIPTURE — 2 TIMOTHY 2:2
            </span>

            <p className={styles.registrationHeroScriptureText}>
              “And the things that thou hast heard of me among many
              witnesses, the same commit thou to faithful men, who shall
              be able to teach others also.”
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default RegistrationHero;