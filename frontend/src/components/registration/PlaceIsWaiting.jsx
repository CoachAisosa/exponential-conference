import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import styles from "../../pages/Registration.module.css";

function PlaceIsWaiting() {
  return (
    <section className={styles.placeWaitingSection} data-aos="fade-up">
      <div className={styles.placeWaitingOverlay}></div>
      <div className={styles.sectionContainer}>
        <div className={styles.placeWaitingContent} data-aos="fade-up">
          <div className={styles.placeWaitingIcon}>
            <FaUsers />
          </div>

          <span className={styles.placeWaitingEyebrow}>YOUR PLACE IS WAITING</span>

          <h2 className={styles.placeWaitingTitle}>
            The Question Is Not Simply "Will I Attend?"
          </h2>

          <div className={styles.placeWaitingQuestions}>
            <div className={styles.placeWaitingQuestion}>
              <p className={styles.placeWaitingQuestionLabel}>The greater question is:</p>
              <p className={styles.placeWaitingQuestionText}>
                "Who will I become, and who will I raise because I attended?"
              </p>
            </div>
          </div>

          <p className={styles.placeWaitingDescription}>
            Join leaders from different backgrounds for three days of
            leadership development, biblical teaching, strategic conversations,
            inspiration, fellowship, and multiplication.
          </p>

          <div className={styles.placeWaitingActions}>
            <Link
              to="/register"
              className={styles.placeWaitingButton}
            >
              REGISTER TODAY
              <FaArrowRight />
            </Link>
          </div>

          <p className={styles.placeWaitingNote}>
            9th–11th December 2026 • Dream City Christian Centre • Benin City, Edo State, Nigeria
          </p>
        </div>
      </div>
    </section>
  );
}

export default PlaceIsWaiting;