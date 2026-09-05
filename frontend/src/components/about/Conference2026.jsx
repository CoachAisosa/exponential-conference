import {
  FaCalendarDays,
  FaLocationDot,
  FaMapLocationDot,
  FaArrowRight
} from "react-icons/fa6";

import { Link } from "react-router-dom";
import styles from "../../pages/About.module.css";

function Conference2026() {
  return (
    <section
      className={styles.conference2026Section}
      data-aos="fade-up"
    >

      <div className={styles.conference2026Container}>

        {/* Header */}
        <div
          className={styles.conference2026Header}
          data-aos="fade-up"
        >

          <p className={styles.conference2026Eyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h2 className={styles.conference2026Title}>
            THE MULTIPLIER
          </h2>

          <p className={styles.conference2026Subtitle}>
            Raising Leaders Who Multiply
          </p>

        </div>

        {/* Details */}
        <div className={styles.conference2026Details}>

          {/* Date */}
          <div
            className={styles.conference2026Detail}
            data-aos="fade-up"
            data-aos-delay="100"
          >

            <div className={styles.conference2026DetailIcon}>
              <FaCalendarDays />
            </div>

            <div className={styles.conference2026DetailContent}>

              <span className={styles.conference2026DetailLabel}>
                DATE
              </span>

              <h3 className={styles.conference2026DetailTitle}>
                9th–11th December 2026
              </h3>

            </div>

          </div>

          {/* Venue */}
          <div
            className={styles.conference2026Detail}
            data-aos="fade-up"
            data-aos-delay="200"
          >

            <div className={styles.conference2026DetailIcon}>
              <FaLocationDot />
            </div>

            <div className={styles.conference2026DetailContent}>

              <span className={styles.conference2026DetailLabel}>
                VENUE
              </span>

              <h3 className={styles.conference2026DetailTitle}>
                Dream City Christian Centre
              </h3>

            </div>

          </div>

          {/* Location */}
          <div
            className={styles.conference2026Detail}
            data-aos="fade-up"
            data-aos-delay="300"
          >

            <div className={styles.conference2026DetailIcon}>
              <FaMapLocationDot />
            </div>

            <div className={styles.conference2026DetailContent}>

              <span className={styles.conference2026DetailLabel}>
                LOCATION
              </span>

              <h3 className={styles.conference2026DetailTitle}>
                Benin City, Edo State, Nigeria
              </h3>

              <p className={styles.conference2026Address}>
                2, Ogiemwanye Avenue, Off Nomayo,
                Upper Sakponba Road, Benin City,
                Edo State, Nigeria.
              </p>

            </div>

          </div>

        </div>

        {/* Actions */}
        <div
          className={styles.conference2026Actions}
          data-aos="fade-up"
          data-aos-delay="400"
        >

          <Link
            to="/register"
            className={styles.conference2026RegisterButton}
          >
            REGISTER NOW

            <FaArrowRight
              className={styles.conference2026ButtonIcon}
            />
          </Link>

          <a
            href="#"
            className={styles.conference2026DirectionButton}
          >
            GET DIRECTIONS

            <FaMapLocationDot
              className={styles.conference2026ButtonIcon}
            />
          </a>

        </div>

      </div>

    </section>
  );
}

export default Conference2026;