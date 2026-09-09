import { FaExternalLinkAlt, FaGraduationCap } from "react-icons/fa";
import styles from "../../pages/AboutABU.module.css";

function ABUCTA() {
  return (
    <section className={styles.abuCTASection} data-aos="fade-up">
      <div className={styles.abuCTAContainer}>
        <div className={styles.abuCTAIcon}>
          <FaGraduationCap />
        </div>

        <h2 className={styles.abuCTATitle}>
          Ready to Study With ABU?
        </h2>

        <p className={styles.abuCTADescription}>
          Visit the official Apostolos Bible University International
          website to learn more about our programmes, admissions,
          and how to apply.
        </p>

        <a
          href="https://apostolosbibleuniversity.org"
          target="_blank"
          rel="noreferrer"
          className={styles.abuCTALink}
        >
          Visit ABU Official Website
          <FaExternalLinkAlt className={styles.abuCTALinkIcon} />
        </a>

        <p className={styles.abuCTANote}>
          Apostolos Bible University International — Training for Effective Ministry Work
        </p>
      </div>
    </section>
  );
}

export default ABUCTA;