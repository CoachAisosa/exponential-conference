import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function VenueAddress() {
  return (
    <section className={styles.venueAddressSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.venueAddressWrapper} data-aos="zoom-in">
          <div className={styles.venueAddressIcon}>
            <FaMapMarkerAlt />
          </div>
          <span className={styles.venueAddressEyebrow}>CONFERENCE VENUE ADDRESS</span>
          <h2 className={styles.venueAddressTitle}>Dream City Christian Centre</h2>
          <p className={styles.venueAddressText}>
            2, Ogiemwanye Avenue, Off Nomayo, Upper Sakponba Road,
            <br />
            Benin City, Edo State, Nigeria.
          </p>
          <a
            href="https://wa.link/q1w9yb"
            target="_blank"
            rel="noreferrer"
            className={styles.venueAddressButton}
          >
            <FaDirections /> GET DIRECTIONS
          </a>
        </div>
      </div>
    </section>
  );
}

export default VenueAddress;