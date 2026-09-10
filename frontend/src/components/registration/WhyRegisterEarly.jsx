import {
  FaCheckCircle,
  FaCalendarAlt,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import styles from "../../pages/Registration.module.css";

function WhyRegisterEarly() {
  const reasons = [
    {
      icon: <FaCheckCircle />,
      title: "Secure Your Place",
      text: "Avoid last-minute registration challenges.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Plan Properly",
      text: "Receive important conference information ahead of time.",
    },
    {
      icon: <FaClock />,
      title: "Prepare for the Experience",
      text: "Know what to expect and plan your participation.",
    },
    {
      icon: <FaUsers />,
      title: "Attend with Your Team",
      text: "Register the people you are developing and experience the conference together.",
    },
  ];

  return (
    <section className={styles.whyRegisterSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>WHY REGISTER EARLY?</span>
          <h2 className={styles.sectionTitle}>Early Registration Helps You</h2>
          <p className={styles.sectionDescription}>
            Registering early is more than just securing a seat — it's about
            preparing properly for the experience God has for you.
          </p>
        </div>

        <div className={styles.whyRegisterGrid}>
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={styles.whyRegisterCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.whyRegisterIcon}>{reason.icon}</div>
              <h3 className={styles.whyRegisterTitle}>{reason.title}</h3>
              <p className={styles.whyRegisterText}>{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyRegisterEarly;