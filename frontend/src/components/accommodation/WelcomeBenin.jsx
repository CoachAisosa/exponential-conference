import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkedAlt } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function WelcomeBenin() {
  return (
    <section className={styles.welcomeBeninSection} data-aos="fade-up">
      <div className={styles.welcomeBeninOverlay}></div>

      <div className={styles.sectionContainer}>
        <div className={styles.welcomeBeninContent} data-aos="fade-up">
          <div className={styles.welcomeBeninIcon}>
            <FaMapMarkedAlt />
          </div>

          <span className={styles.welcomeBeninEyebrow}>WELCOME TO BENIN CITY</span>

          <h2 className={styles.welcomeBeninTitle}>
            We Look Forward to Welcoming You
          </h2>

          <p className={styles.welcomeBeninText}>
            We look forward to welcoming you to Benin City for three significant
            days of leadership development, spiritual enrichment, strategic
            learning, fellowship, and Kingdom multiplication.
          </p>

          <p className={styles.welcomeBeninHighlight}>Come prepared.</p>

          <div className={styles.welcomeBeninAddress}>
            <p>Dream City Christian Centre</p>
            <span>Benin City, Edo State, Nigeria.</span>
          </div>

          <div className={styles.welcomeBeninActions}>
            <Link to="/register" className={styles.welcomeBeninButton}>
              REGISTER NOW <FaArrowRight />
            </Link>
            <Link to="/contact" className={styles.welcomeBeninSecondaryButton}>
              CONTACT US
            </Link>
          </div>

          <p className={styles.welcomeBeninNote}>WE LOOK FORWARD TO WELCOME YOU</p>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBenin;