import { Link } from "react-router-dom";
import styles from '../../pages/Home.module.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaLocationArrow, FaArrowDown } from 'react-icons/fa';
import conferenceFlyer from '../../assets/images/main flyer.png';

function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Image Overlay - CSS handles this */}
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>

          <p className={styles.heroEyebrow} data-aos="fade-up" data-aos-delay="100">
            APOSTOLOS BIBLE UNIVERSITY INTERNATIONAL
          </p>

          <h1 className={styles.heroTitle} data-aos="fade-up" data-aos-delay="200">
            EXPONENTIAL CONFERENCE 2026
          </h1>

          <h2 className={styles.heroTheme} data-aos="fade-up" data-aos-delay="300">
            THE MULTIPLIER
          </h2>

          <p className={styles.heroSubtitle} data-aos="fade-up" data-aos-delay="400">
            Raising Leaders Who Multiply
          </p>

          <p className={styles.heroDescription} data-aos="fade-up" data-aos-delay="500">
            Leadership is not complete when you become a leader. It is
            complete when you raise others who can lead, influence, serve,
            and reproduce what God has entrusted to you.
          </p>

          <div className={styles.heroDetails} data-aos="fade-up" data-aos-delay="600">
            <div className={styles.heroDetailItem}>
              <span className={styles.heroDetailLabel}><FaCalendarAlt className={styles.heroIcon} /> DATE</span>
              <p>9th–11th December 2026</p>
            </div>

            <div className={styles.heroDetailItem}>
              <span className={styles.heroDetailLabel}><FaMapMarkerAlt className={styles.heroIcon} /> VENUE</span>
              <p>Dream City Christian Centre</p>
            </div>

            <div className={styles.heroDetailItem}>
              <span className={styles.heroDetailLabel}><FaLocationArrow className={styles.heroIcon} /> LOCATION</span>
              <p>Benin City, Edo State, Nigeria</p>
            </div>
          </div>

          <div className={styles.heroActions} data-aos="fade-up" data-aos-delay="700">
            <Link to="/register" className={styles.heroRegisterButton}>
              REGISTER NOW
            </Link>

            <a href="#conference" className={styles.heroExploreButton}>
              <FaArrowDown className={styles.heroIcon} /> EXPLORE THE CONFERENCE
            </a>
          </div>

          <div className={styles.heroScripture} data-aos="fade-up" data-aos-delay="800">
            <p className={styles.heroScriptureReference}>
              2 Timothy 2:2
            </p>

            <blockquote className={styles.heroScriptureText}>
              "And the things that thou hast heard of me among many
              witnesses, the same commit thou to faithful men, who shall
              be able to teach others also."
            </blockquote>
          </div>

        </div>

        {/* Flyer Image Section */}
        <div className={styles.heroFlyer} data-aos="fade-left" data-aos-delay="400">
          <div className={styles.heroFlyerWrapper}>
            <img 
              src={conferenceFlyer} 
              alt="Exponential Conference 2026 Flyer - THE MULTIPLIER" 
              className={styles.heroFlyerImage}
            />
            <div className={styles.heroFlyerOverlay}></div>
            <div className={styles.heroFlyerBadge}>
              <span>2026</span>
              <p>THE MULTIPLIER</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;