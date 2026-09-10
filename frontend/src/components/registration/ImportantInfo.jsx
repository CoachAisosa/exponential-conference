import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import styles from "../../pages/Registration.module.css";

function ImportantInfo() {
  const importantPoints = [
    "Please ensure that the information provided during registration is accurate.",
    "Registration should be completed only through the official Exponential Conference registration platform or authorised channels of Apostolos Bible University International.",
    "Participants should retain their payment confirmation and registration details for reference.",
    "Registration fees, payment information, deadlines, accommodation options, and other applicable requirements will be displayed on the official registration form.",
  ];

  return (
    <section className={styles.importantInfoSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.importantInfoWrapper}>
          <div className={styles.importantInfoHeader} data-aos="fade-up">
            <div className={styles.importantInfoIconWrapper}>
              <FaExclamationTriangle className={styles.importantInfoIcon} />
            </div>
            <h2 className={styles.importantInfoTitle}>Important Information</h2>
            <p className={styles.importantInfoSubtitle}>
              Please read carefully before completing your registration.
            </p>
          </div>

          <div className={styles.importantInfoList}>
            {importantPoints.map((point, index) => (
              <div
                key={index}
                className={styles.importantInfoItem}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <FaCheckCircle className={styles.importantInfoItemIcon} />
                <p className={styles.importantInfoItemText}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImportantInfo;