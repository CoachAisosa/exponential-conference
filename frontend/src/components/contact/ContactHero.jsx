import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowDown,
} from "react-icons/fa";

import styles from "../../pages/Contact.module.css";

function ContactHero() {
  return (
    <section
      className={styles.contactHeroSection}
      data-aos="fade-up"
    >
      <div className={styles.contactHeroOverlay}></div>

      <div className={styles.contactHeroContainer}>

        <div
          className={styles.contactHeroIcon}
          data-aos="zoom-in"
        >
          <FaEnvelope />
        </div>

        <div
          className={styles.contactHeroContent}
          data-aos="fade-up"
        >

          <p className={styles.contactHeroEyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h1 className={styles.contactHeroTitle}>
            CONTACT US
          </h1>

          <h2 className={styles.contactHeroTheme}>
            WE WOULD LOVE TO HEAR FROM YOU
          </h2>

          <p className={styles.contactHeroDescription}>
            Do you have a question about the Exponential Conference 2026?
            Whether you need information about registration, the programme,
            speakers, accommodation, travel, partnership, sponsorship, or
            general conference enquiries, the Exponential Conference team
            is available to assist you.
          </p>

          <div className={styles.contactHeroDetails}>

            <div className={styles.contactHeroDetailItem}>

              <FaCalendarAlt
                className={styles.contactHeroDetailIcon}
              />

              <div className={styles.contactHeroDetailContent}>
                <span className={styles.contactHeroDetailLabel}>
                  DATE
                </span>

                <p>9th–11th December 2026</p>
              </div>

            </div>

            <div className={styles.contactHeroDetailItem}>

              <FaMapMarkerAlt
                className={styles.contactHeroDetailIcon}
              />

              <div className={styles.contactHeroDetailContent}>
                <span className={styles.contactHeroDetailLabel}>
                  VENUE
                </span>

                <p>  Dream City Christian Centre
                <br />
                2, Ogiemwanye Avenue,
                <br />
                Off Nomayo, Upper Sakponba Road,
                <br />
                Benin City, Edo State, Nigeria.</p>
              </div>

            </div>

            <div className={styles.contactHeroDetailItem}>

              <FaPhone
                className={styles.contactHeroDetailIcon}
              />

              <div className={styles.contactHeroDetailContent}>
                <span className={styles.contactHeroDetailLabel}>
                  PHONE / WHATSAPP
                </span>

                <p>  +2348119271947 <br /> 
                     +2348062854749
                </p>
                
              </div>

            </div>

          </div>

          <a
            href="#contact-form"
            className={styles.contactHeroButton}
          >
            SEND US A MESSAGE
            <FaArrowDown />
          </a>

        </div>

      </div>
    </section>
  );
}

export default ContactHero;