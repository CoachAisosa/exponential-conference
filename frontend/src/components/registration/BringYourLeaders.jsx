import { FaUsers, FaArrowRight, FaHandsHelping } from "react-icons/fa";
import styles from "../../pages/Registration.module.css";

function BringYourLeaders() {
  const leaders = [
    "Emerging Leaders",
    "Department Leaders",
    "Church Workers",
    "Mentors",
    "Ministry Team",
    "Future Leaders",
  ];

  return (
    <section className={styles.bringLeadersSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.bringLeadersContent}>
          <div className={styles.bringLeadersHeader} data-aos="fade-right">
            <span className={styles.sectionEyebrow}>BRING YOUR LEADERS</span>
            <h2 className={styles.bringLeadersTitle}>Don't Come Alone.</h2>
            <p className={styles.bringLeadersText}>
              If you are a pastor, church leader, ministry leader, or mentor,
              consider bringing the people you are intentionally developing.
            </p>
            <p className={styles.bringLeadersText}>
              Because multiplication becomes powerful when leaders learn,
              grow, and implement together.
            </p>
          </div>

          <div className={styles.bringLeadersList} data-aos="fade-left">
            <h3 className={styles.bringLeadersListTitle}>Bring Your:</h3>
            <div className={styles.bringLeadersTags}>
              {leaders.map((leader, index) => (
                <span
                  key={index}
                  className={styles.bringLeadersTag}
                  data-aos="zoom-in"
                  data-aos-delay={index * 80}
                >
                  {leader}
                </span>
              ))}
            </div>
            <div className={styles.bringLeadersIconRow}>
              <FaUsers className={styles.bringLeadersIcon} />
              <FaHandsHelping className={styles.bringLeadersIcon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BringYourLeaders;