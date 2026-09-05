import {
  FaArrowRight,
  FaBookOpen,
  FaUsers
} from "react-icons/fa";

import { Link } from "react-router-dom";
import styles from "../../pages/About.module.css";
import aboutHero from "../../assets/images/IMG_0749.jpg"

function AboutHero() {
  return (
    <section
      className={styles.aboutHeroSection}
      data-aos="fade-up"
      data-aos-duration="1000"
    >

      {/* Hero Background */}
      <div className={styles.aboutHeroOverlay}></div>

      <div className={styles.aboutHeroContainer}>

        {/* Hero Content */}
        <div
          className={styles.aboutHeroContent}
          data-aos="fade-right"
          data-aos-delay="200"
        >

          <div className={styles.aboutHeroEyebrowWrapper}>

            <span className={styles.aboutHeroEyebrowIcon}>
              <FaBookOpen/>
            </span>

            <p className={styles.aboutHeroEyebrow}>
              ABOUT EXPONENTIAL CONFERENCE
            </p>

          </div>

          <h1 className={styles.aboutHeroTitle}>
            A Gathering Designed to Multiply Kingdom Impact
          </h1>

          <p className={styles.aboutHeroDescription}>
            The Exponential Conference is an annual leadership and ministry
            development gathering organised by Apostolos Bible University
            International (ABU) to equip, inspire, challenge, and connect
            Christian leaders who are committed to making a lasting impact
            for the Kingdom of God.
          </p>

          <p className={styles.aboutHeroDescription}>
            The conference was born from a simple but powerful conviction:
            Kingdom impact should not stop with one person. It should
            multiply through people.
          </p>

          {/* Hero Actions */}
          <div
            className={styles.aboutHeroActions}
            data-aos="fade-up"
            data-aos-delay="400"
          >

            <Link
              to="/register"
              className={styles.aboutHeroRegisterButton}
            >
              REGISTER NOW

              <FaArrowRight
                className={styles.aboutHeroButtonIcon}
              />
            </Link>

            <a
              href="#conference-purpose"
              className={styles.aboutHeroExploreButton}
            >
              EXPLORE THE CONFERENCE

              <FaArrowRight
                className={styles.aboutHeroButtonIcon}
              />
            </a>

          </div>

        </div>

        {/* Hero Visual */}
        <div
          className={styles.aboutHeroVisual}
          data-aos="fade-left"
          data-aos-delay="300"
        >

          <div className={styles.aboutHeroImageWrapper}>

            <img
              src={aboutHero}
              alt="Exponential Conference"
              className={styles.aboutHeroImage}
            />

            <div className={styles.aboutHeroImageOverlay}></div>

          </div>

          {/* Floating Conference Card */}
          <div
            className={styles.aboutHeroFloatingCard}
            data-aos="zoom-in"
            data-aos-delay="700"
          >

            <div className={styles.aboutHeroFloatingIcon}>
              <FaUsers />
            </div>

            <div className={styles.aboutHeroFloatingContent}>

              <span className={styles.aboutHeroFloatingLabel}>
                THE MULTIPLIER
              </span>

              <p className={styles.aboutHeroFloatingText}>
                Raising Leaders Who Multiply
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutHero;