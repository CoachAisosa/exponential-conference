import { FaHotel, FaPlane, FaMapMarkedAlt } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function AccommodationHero() {
  return (
    <section className={styles.accommodationHeroSection} data-aos="fade-up">
      <div className={styles.accommodationHeroOverlay}></div>

      <div className={styles.accommodationHeroContainer}>
        <div className={styles.accommodationHeroBadge} data-aos="fade-down">
          <FaHotel className={styles.accommodationHeroBadgeIcon} />
          <span>ACCOMMODATION & RESERVATION</span>
        </div>

        <h1 className={styles.accommodationHeroTitle} data-aos="fade-up">
          VENUE, ACCOMMODATION & <span>TRAVEL</span>
        </h1>

        <p className={styles.accommodationHeroSubtitle} data-aos="fade-up" data-aos-delay="100">
          Plan Your Journey to Exponential Conference 2026
        </p>

        <p className={styles.accommodationHeroDescription} data-aos="fade-up" data-aos-delay="200">
          We look forward to welcoming pastors, ministers, church leaders,
          Christian educators, emerging leaders, and delegates from Nigeria
          and beyond to Benin City, Edo State, Nigeria for the Exponential
          Conference 2026.
        </p>

        <div className={styles.accommodationHeroStats} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.accommodationHeroStat}>
            <FaMapMarkedAlt className={styles.accommodationHeroStatIcon} />
            <span>Benin City, Edo State</span>
          </div>
          <div className={styles.accommodationHeroStat}>
            <FaHotel className={styles.accommodationHeroStatIcon} />
            <span>Multiple Accommodation Options</span>
          </div>
          <div className={styles.accommodationHeroStat}>
            <FaPlane className={styles.accommodationHeroStatIcon} />
            <span>Airport Access Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccommodationHero;