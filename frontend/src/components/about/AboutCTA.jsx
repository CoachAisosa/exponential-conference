import {
  FaArrowRight,
  FaUsers,
  FaInfinity
} from "react-icons/fa";

import { Link } from "react-router-dom";
import styles from "../../pages/About.module.css";

function AboutCTA() {
  return (
    <section
      className={styles.aboutCTASection}
      data-aos="fade-up"
    >

      <div className={styles.aboutCTAOverlay}></div>

      <div className={styles.aboutCTAContainer}>

        <div
          className={styles.aboutCTAIcon}
          data-aos="zoom-in"
        >
          <FaInfinity />
        </div>

        <p
          className={styles.aboutCTAEyebrow}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          THE MULTIPLIER
        </p>

        <h2
          className={styles.aboutCTATitle}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Don't Just Become a Leader.
          <br />
          Become a Leader Who Raises Leaders.
        </h2>

        <p
          className={styles.aboutCTADescription}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          What God has placed in you should not end with you.
          Multiply it.
        </p>

        <div
          className={styles.aboutCTAActions}
          data-aos="fade-up"
          data-aos-delay="400"
        >

          <Link
            to="/register"
            className={styles.aboutCTARegisterButton}
          >
            REGISTER NOW

            <FaArrowRight
              className={styles.aboutCTAButtonIcon}
            />
          </Link>

          <Link
            to="/speakers"
            className={styles.aboutCTAExploreButton}
          >
            MEET THE SPEAKERS

            <FaUsers
              className={styles.aboutCTAButtonIcon}
            />
          </Link>

        </div>

        <p
          className={styles.aboutCTADate}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          9th–11th December 2026 • Dream City Christian Centre •
          Benin City, Edo State, Nigeria
        </p>

      </div>

    </section>
  );
}

export default AboutCTA;