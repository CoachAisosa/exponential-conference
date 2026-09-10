import { FaGlobeAfrica, FaPassport } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function InternationalDelegates() {
  const requirements = [
    "A valid passport",
    "The appropriate Nigerian entry permission or visa, where applicable",
    "Confirmed travel arrangements",
    "Accommodation arrangements",
    "Relevant travel documents",
    "Adequate local transportation arrangements",
  ];

  return (
    <section className={styles.internationalSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.internationalWrapper}>
          <div className={styles.internationalHeader} data-aos="fade-up">
            <div className={styles.internationalIconWrapper}>
              <FaGlobeAfrica className={styles.internationalIcon} />
            </div>
            <h2 className={styles.internationalTitle}>International Delegates</h2>
            <p className={styles.internationalSubtitle}>
              We warmly welcome delegates travelling from outside Nigeria.
            </p>
          </div>

          <p className={styles.internationalText} data-aos="fade-up">
            International participants should ensure that they have:
          </p>

          <div className={styles.internationalList}>
            {requirements.map((item, index) => (
              <div
                key={index}
                className={styles.internationalItem}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <FaPassport className={styles.internationalItemIcon} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className={styles.internationalNote} data-aos="fade-up">
            Visa and entry requirements can vary according to nationality and
            may change. International delegates should verify current
            requirements with the appropriate Nigerian authorities or official
            Nigerian diplomatic mission before travelling.
          </p>
        </div>
      </div>
    </section>
  );
}

export default InternationalDelegates;