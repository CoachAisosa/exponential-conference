import { FaHeadset, FaCheckCircle } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function TravelHelp() {
  const helpItems = [
    "Venue directions",
    "Local transportation",
    "Recommended accommodation",
    "Airport transfers",
    "Conference schedules",
    "Delegate information",
    "Other logistical arrangements",
  ];

  return (
    <section className={styles.travelHelpSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>NEED HELP WITH YOUR TRAVEL?</span>
          <h2 className={styles.sectionTitle}>We Are Here to Help</h2>
          <p className={styles.sectionDescription}>
            The Exponential Conference team will provide additional information
            to registered delegates as necessary regarding:
          </p>
        </div>

        <div className={styles.travelHelpGrid}>
          {helpItems.map((item, index) => (
            <div
              key={index}
              className={styles.travelHelpItem}
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <FaCheckCircle className={styles.travelHelpIcon} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className={styles.travelHelpNote} data-aos="fade-up">
          <FaHeadset className={styles.travelHelpNoteIcon} />
          <p>
            For enquiries, please contact the Exponential Conference Secretariat
            through the official contact channels provided on this website.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TravelHelp;