import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa";
import styles from "../../pages/Programme.module.css";

function ProgrammeCTA() {
  return (
    <section
      className={styles.programmeCTASection}
      data-aos="fade-up"
    >
      <div className={styles.programmeCTAOverlay}></div>

      <div className={styles.programmeCTAContainer}>

        <div
          className={styles.programmeCTAIcon}
          data-aos="zoom-in"
        >
          <FaCalendarCheck />
        </div>

        <p
          className={styles.programmeCTAEyebrow}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          DON'T MISS THIS JOURNEY
        </p>

        <h2
          className={styles.programmeCTATitle}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Three Days That Will Change How You Lead
        </h2>

        <p
          className={styles.programmeCTADescription}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          This is not just a conference. It is a commissioning for leaders
          who are ready to multiply themselves, develop others, and create
          lasting Kingdom impact.
        </p>

        <div
          className={styles.programmeCTAActions}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Link
            to="/register"
            className={styles.programmeCTARegisterButton}
          >
            REGISTER NOW
            <FaArrowRight />
          </Link>

          <Link
            to="/contact"
            className={styles.programmeCTAExploreButton}
          >
            CONTACT US
          </Link>
        </div>

        <p
          className={styles.programmeCTADate}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          9th–11th December 2026 • Dream City Christian Centre •
          Benin City, Edo State, Nigeria
        </p>

      </div>
    </section>
  );
}

export default ProgrammeCTA;