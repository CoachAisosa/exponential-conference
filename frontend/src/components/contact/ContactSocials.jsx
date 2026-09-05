import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaGlobe,
  FaLinkedinIn,
} from "react-icons/fa";

import styles from "../../pages/Contact.module.css";

function ContactSocials() {
  return (
    <section
      className={styles.contactSocialsSection}
      data-aos="fade-up"
    >
      <div className={styles.contactSocialsContainer}>

        <div
          className={styles.contactSocialsHeader}
          data-aos="fade-up"
        >
          <span className={styles.contactSocialsLabel}>
            CONNECT WITH ABU
          </span>

          <h2 className={styles.contactSocialsTitle}>
            FOLLOW APOSTOLOS BIBLE UNIVERSITY INTERNATIONAL
          </h2>

          <p className={styles.contactSocialsDescription}>
            Stay connected with Apostolos Bible University International
            through our official communication platforms. Follow us for
            announcements, training opportunities, academic programmes,
            leadership development, conferences, and other updates.
          </p>
        </div>

        <div
          className={styles.contactSocialsGrid}
          data-aos="fade-up"
        >

          <a
            href="#"
            className={styles.contactSocialCard}
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF />

            <div className={styles.contactSocialCardContent}>
              <span>FACEBOOK</span>
              <p>Apostolos Bible University International</p>
            </div>
          </a>

          <a
            href="#"
            className={styles.contactSocialCard}
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />

            <div className={styles.contactSocialCardContent}>
              <span>INSTAGRAM</span>
              <p>Apostolos Bible University International</p>
            </div>
          </a>

          <a
            href="#"
            className={styles.contactSocialCard}
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube />

            <div className={styles.contactSocialCardContent}>
              <span>YOUTUBE</span>
              <p>Apostolos Bible University International</p>
            </div>
          </a>

          <a
            href="#"
            className={styles.contactSocialCard}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />

            <div className={styles.contactSocialCardContent}>
              <span>WHATSAPP</span>
              <p>Connect With ABU</p>
            </div>
          </a>

          <a
            href="#"
            className={styles.contactSocialCard}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />

            <div className={styles.contactSocialCardContent}>
              <span>LINKEDIN</span>
              <p>Apostolos Bible University International</p>
            </div>
          </a>

          <a
            href="#"
            className={styles.contactSocialCard}
            target="_blank"
            rel="noreferrer"
          >
            <FaGlobe />

            <div className={styles.contactSocialCardContent}>
              <span>WEBSITE</span>
              <p>Apostolos Bible University International</p>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}

export default ContactSocials;