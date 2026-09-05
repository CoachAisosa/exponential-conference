import { Link } from "react-router-dom";
import { FaArrowRight, FaMicrophone } from "react-icons/fa";

import styles from "../../pages/Speakers.module.css";

function SpeakersHero() {
  return (
    <section
      className={styles.speakersHeroSection}
      data-aos="fade-up"
    >

      <div className={styles.speakersHeroOverlay}></div>

      <div className={styles.speakersHeroContainer}>

        <div
          className={styles.speakersHeroIcon}
          data-aos="zoom-in"
        >
          <FaMicrophone />
        </div>

        <div
          className={styles.speakersHeroContent}
          data-aos="fade-up"
        >

          <p className={styles.speakersHeroEyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h1 className={styles.speakersHeroTitle}>
            THE SPEAKERS
          </h1>

          <h2 className={styles.speakersHeroTheme}>
            Voices That Equip. Leaders That Inspire.
          </h2>

          <p className={styles.speakersHeroSubtitle}>
            Wisdom That Multiplies.
          </p>

          <p className={styles.speakersHeroDescription}>
            The Exponential Conference 2026 brings together experienced
            Christian leaders, ministers, educators, and leadership
            practitioners who share a passion for raising leaders and
            advancing the Kingdom of God.
          </p>

          <div className={styles.speakersHeroThemeBlock}>

            <span className={styles.speakersHeroThemeLabel}>
              CONFERENCE THEME
            </span>

            <h3 className={styles.speakersHeroThemeTitle}>
              THE MULTIPLIER
            </h3>

            <p className={styles.speakersHeroThemeText}>
              Raising Leaders Who Multiply
            </p>

          </div>

          <div className={styles.speakersHeroActions}>

            <Link
              to="/register"
              className={styles.speakersHeroRegisterButton}
            >
              REGISTER NOW
              <FaArrowRight />
            </Link>

            <a
              href="#speakers"
              className={styles.speakersHeroExploreButton}
            >
              MEET THE SPEAKERS
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default SpeakersHero;