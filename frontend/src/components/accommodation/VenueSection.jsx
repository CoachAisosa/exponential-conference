import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function VenueSection() {
  return (
    <section className={styles.venueSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>CONFERENCE VENUE</span>
          <h2 className={styles.sectionTitle}>Dream City Christian Centre</h2>
        </div>

        <div className={styles.venueContent}>
          <div className={styles.venueInfo} data-aos="fade-right">
            <div className={styles.venueIcon}>
              <FaMapMarkerAlt />
            </div>
            <p className={styles.venueAddress}>
              2, Ogiemwanye Avenue, Off Nomayo, Upper Sakponba Road,
              <br />
              Benin City, Edo State, Nigeria.
            </p>
            <p className={styles.venueDescription}>
              The conference will take place at Dream City Christian Centre,
              a suitable gathering point for delegates attending the three-day
              leadership conference.
            </p>
            <a
              href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.4257764943095!2d5.670375769567257!3d6.30268529960541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d43cb4ffe6a1%3A0x1c0296230193fef2!2s145%20Nomayo%20St%2C%20Avbiama%2C%20Benin%20City%20300105%2C%20Edo!5e0!3m2!1sen!2sng!4v1788816292794!5m2!1sen!2sng"
              target="_blank"
              rel="noreferrer"
              className={styles.venueButton}
            >
              VIEW LOCATION ON MAP <FaExternalLinkAlt />
            </a>
          </div>

          <div className={styles.venueMapWrapper} data-aos="fade-left">
           <iframe
             className={styles.contactMap}
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.4257764943095!2d5.670375769567257!3d6.30268529960541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d43cb4ffe6a1%3A0x1c0296230193fef2!2s145%20Nomayo%20St%2C%20Avbiama%2C%20Benin%20City%20300105%2C%20Edo!5e0!3m2!1sen!2sng!4v1788816292794!5m2!1sen!2sng"
             title="Dream City Christian Centre Map"
             loading="lazy"
             allowFullScreen=""
             referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenueSection;