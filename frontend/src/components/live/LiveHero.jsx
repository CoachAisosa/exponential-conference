import { Link } from "react-router-dom";
import { FaCircle, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

import styles from "../../pages/LiveEvent.module.css";

function LiveHero() {
  return (
    <section className={styles.liveHeroSection}>

      <div
        className={styles.liveHeroOverlay}
        data-aos="fade-in"
      ></div>

      <div className={styles.liveHeroContainer}>

        <div
          className={styles.liveHeroContent}
          data-aos="fade-up"
        >

          <div className={styles.liveStatus}>

            <FaCircle className={styles.liveStatusIcon} />

            <span>
              LIVE EVENT
            </span>

          </div>

          <p className={styles.liveHeroEyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h1 className={styles.liveHeroTitle}>
            THE MULTIPLIER
          </h1>

          <p className={styles.liveHeroSubtitle}>
            Raising Leaders Who Multiply
          </p>

          <p className={styles.liveHeroDescription}>
            Welcome to the Exponential Conference 2026 Live Event.
            Join us online as leaders, ministers, pastors, educators,
            mentors, and emerging leaders gather for three days of
            leadership development, inspiration, and transformation.
          </p>

          <div className={styles.liveHeroDetails}>

            <div className={styles.liveHeroDetailItem}>

              <FaCalendarAlt
                className={styles.liveHeroDetailIcon}
              />

              <div>
                <span className={styles.liveHeroDetailLabel}>
                  DATE
                </span>

                <p>
                  9th–11th December 2026
                </p>
              </div>

            </div>

            <div className={styles.liveHeroDetailItem}>

              <FaMapMarkerAlt
                className={styles.liveHeroDetailIcon}
              />

              <div>
                <span className={styles.liveHeroDetailLabel}>
                  VENUE
                </span>

                <p>
                  Dream City Christian Centre,
                  Benin City, Edo State, Nigeria
                </p>
              </div>

            </div>

          </div>

          <div className={styles.liveHeroActions}>

            <Link
              to="/register"
              className={styles.liveHeroRegisterButton}
            >
              REGISTER NOW
            </Link>

            <a
              href="#live-stream"
              className={styles.liveHeroWatchButton}
            >
              WATCH LIVE
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default LiveHero;