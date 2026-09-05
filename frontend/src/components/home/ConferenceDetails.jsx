import { Link } from "react-router-dom";
import styles from '../../pages/Home.module.css';

function ConferenceDetails() {
  return (
    <section className={styles.conferenceDetailsSection}>
      <div className={styles.conferenceDetailsContainer}>

        <div className="section-heading">
          <p className="section-eyebrow">
            2026 CONFERENCE DETAILS
          </p>

          <h2 className="section-title">
            THE MULTIPLIER
          </h2>

          <p className="section-subtitle">
            Raising Leaders Who Multiply
          </p>
        </div>

        <div className={styles.conferenceDetailsGrid}>

          <div className={styles.conferenceDetail}>
            <span className={styles.conferenceDetailLabel}>
              DATE
            </span>

            <h3>
              9th–11th December 2026
            </h3>
          </div>

          <div className={styles.conferenceDetail}>
            <span className={styles.conferenceDetailLabel}>
              VENUE
            </span>

            <h3>
              Dream City Christian Centre
            </h3>
          </div>

          <div className={styles.conferenceDetail}>
            <span className={styles.conferenceDetailLabel}>
              ADDRESS
            </span>

            <p>
              2, Ogiemwanye Avenue, Off Nomayo, Upper Sakponba Road,
              Benin City, Edo State, Nigeria.
            </p>
          </div>

        </div>

        <div className={styles.conferenceDetailsAction}>
          <Link
            to="/contact"
            className={styles.conferenceDirectionsButton}
          >
            GET DIRECTIONS
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ConferenceDetails;