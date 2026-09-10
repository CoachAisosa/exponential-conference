import { FaCheckCircle } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function ChoosingAccommodation() {
  const considerations = [
    "Distance from the conference venue",
    "Transportation availability",
    "Safety and security",
    "Check-in and check-out times",
    "Room availability",
    "Internet access",
    "Meals and other facilities",
    "Cancellation and payment policies",
  ];

  return (
    <section className={styles.choosingAccommodationSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>CHOOSING YOUR ACCOMMODATION</span>
          <h2 className={styles.sectionTitle}>What to Consider</h2>
          <p className={styles.sectionDescription}>
            When selecting accommodation, delegates are encouraged to consider:
          </p>
        </div>

        <div className={styles.considerationsGrid}>
          {considerations.map((item, index) => (
            <div
              key={index}
              className={styles.considerationItem}
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <FaCheckCircle className={styles.considerationIcon} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className={styles.considerationNote} data-aos="fade-up">
          <p>
            Delegates are encouraged to make accommodation reservations as
            early as possible, particularly because the conference takes place
            during a busy period of the year.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChoosingAccommodation;