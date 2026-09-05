import {
  FaMapMarkerAlt,
  FaDirections,
} from "react-icons/fa";

import styles from "../../pages/Contact.module.css";

function ContactMap() {
  return (
    <section
      className={styles.contactMapSection}
      data-aos="fade-up"
    >
      <div className={styles.contactMapContainer}>

        <div
          className={styles.contactMapHeader}
          data-aos="fade-up"
        >
          <span className={styles.contactMapLabel}>
            VISIT US
          </span>

          <h2 className={styles.contactMapTitle}>
            CONFERENCE VENUE
          </h2>

          <p className={styles.contactMapDescription}>
            Dream City Christian Centre
          </p>

          <p className={styles.contactMapAddress}>
            2, Ogiemwanye Avenue,
            <br />
            Off Nomayo, Upper Sakponba Road,
            <br />
            Benin City, Edo State, Nigeria.
          </p>

          <a
            href="#"
            className={styles.contactMapDirections}
          >
            <FaDirections />
            GET DIRECTIONS
          </a>
        </div>

        <div
          className={styles.contactMapWrapper}
          data-aos="zoom-in"
        >
          {/* Replace the iframe src with the official Google Maps
              embed link for the conference venue */}

          <iframe
            className={styles.contactMap}
            src=""
            title="Dream City Christian Centre Map"
            loading="lazy"
            allowFullScreen
          ></iframe>

          <div className={styles.contactMapPlaceholder}>
            <FaMapMarkerAlt />

            <p>
              Dream City Christian Centre
            </p>

            <span>
              Benin City, Edo State, Nigeria
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactMap;