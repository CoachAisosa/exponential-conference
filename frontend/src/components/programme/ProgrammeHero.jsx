import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight, FaClock } from "react-icons/fa";
import styles from "../../pages/Programme.module.css";

function ProgrammeHero() {
  return (
    <section
      className={styles.programmeHeroSection}
      data-aos="fade-up"
    >
      <div className={styles.programmeHeroOverlay}></div>

      <div className={styles.programmeHeroContainer}>

        <div
          className={styles.programmeHeroIcon}
          data-aos="zoom-in"
        >
          <FaCalendarAlt />
        </div>

        <div
          className={styles.programmeHeroContent}
          data-aos="fade-up"
        >
          <p className={styles.programmeHeroEyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h1 className={styles.programmeHeroTitle}>
            THE PROGRAMME
          </h1>

          <h2 className={styles.programmeHeroTheme}>
            THE MULTIPLIER
          </h2>

          <p className={styles.programmeHeroSubtitle}>
            Raising Leaders Who Multiply
          </p>

          <p className={styles.programmeHeroDescription}>
            The Exponential Conference 2026 is designed to take participants
            through a journey of discovery, development, and commissioning.
            Each session is intentionally structured to equip leaders with
            biblical principles, practical strategies, and spiritual
            formation for multiplication.
          </p>

          <div className={styles.programmeHeroInfo}>
            <div className={styles.programmeHeroInfoItem}>
              <FaClock />
              <div>
                <span>DURATION</span>
                <p>3 Days</p>
              </div>
            </div>

            <div className={styles.programmeHeroInfoItem}>
              <FaCalendarAlt />
              <div>
                <span>DATES</span>
                <p>9th–11th December 2026</p>
              </div>
            </div>
          </div>

          <div className={styles.programmeHeroActions}>
            <Link
              to="/register"
              className={styles.programmeHeroRegisterButton}
            >
              REGISTER NOW
              <FaArrowRight />
            </Link>

            <a
              href="#schedule"
              className={styles.programmeHeroExploreButton}
            >
              VIEW SCHEDULE
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ProgrammeHero;