import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaUserPlus,
} from "react-icons/fa";

import styles from "../../pages/Contact.module.css";

function ContactCTA() {
  return (
    <section
      className={styles.contactCTASection}
      data-aos="fade-up"
    >
      <div className={styles.contactCTAContainer}>

        <div
          className={styles.contactCTAIcon}
          data-aos="zoom-in"
        >
          <FaUserPlus />
        </div>

        <div className={styles.contactCTAContent}>

          <span className={styles.contactCTALabel}>
            THE MULTIPLIER
          </span>

          <h2 className={styles.contactCTATitle}>
            DON'T JUST ATTEND.
            <br />
            BECOME A MULTIPLIER.
          </h2>

          <p className={styles.contactCTASubtitle}>
            Raising Leaders Who Multiply
          </p>

          <p className={styles.contactCTADescription}>
            The world does not only need more people who can lead.
            It needs leaders who can raise leaders. Come prepared
            to receive, develop, empower, and multiply.
          </p>

          <div className={styles.contactCTADetails}>

            <span>
              9th–11th December 2026
            </span>

            <span>
              Dream City Christian Centre
            </span>

            <span>
              Benin City, Edo State, Nigeria
            </span>

          </div>

          <div className={styles.contactCTAActions}>

            <Link
              to="/register"
              className={styles.contactCTARegisterButton}
            >
              REGISTER NOW
              <FaArrowRight />
            </Link>

            <Link
              to="/about"
              className={styles.contactCTAAboutButton}
            >
              EXPLORE THE CONFERENCE
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactCTA;