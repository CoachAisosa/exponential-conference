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
         {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" ></iframe> */}
          <iframe
            className={styles.contactMap}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.4257764943095!2d5.670375769567257!3d6.30268529960541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d43cb4ffe6a1%3A0x1c0296230193fef2!2s145%20Nomayo%20St%2C%20Avbiama%2C%20Benin%20City%20300105%2C%20Edo!5e0!3m2!1sen!2sng!4v1788816292794!5m2!1sen!2sng"
            title="Dream City Christian Centre Map"
            loading="lazy"
            allowFullScreen=""
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>

          {/* <div className={styles.contactMapPlaceholder}>
            <FaMapMarkerAlt />

            <p>
              Dream City Christian Centre
            </p>

            <span>
              Benin City, Edo State, Nigeria
            </span>
          </div> */}
        </div>

      </div>
    </section>
  );
}

export default ContactMap;