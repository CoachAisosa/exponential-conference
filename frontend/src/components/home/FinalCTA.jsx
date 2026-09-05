import { Link } from "react-router-dom";
import styles from '../../pages/Home.module.css';

function FinalCTA() {
  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.finalCtaContainer}>

        <div className={styles.finalCtaContent}>

          <p className="section-eyebrow">
            DON'T JUST ATTEND. BECOME A MULTIPLIER.
          </p>

          <h2 className={styles.finalCtaTitle}>
            Your leadership should not end with you.
          </h2>

          <p className={styles.finalCtaDescription}>
            The world does not only need more people who can lead.
            It needs leaders who can raise leaders.
          </p>

          <p className={styles.finalCtaDescription}>
            It needs men and women who will intentionally transfer
            wisdom, develop character, release responsibility, and
            prepare others for Kingdom assignment.
          </p>

          <p className={styles.finalCtaDescription}>
            What God has placed in you can become a legacy in others.
          </p>

          <div className={styles.finalCtaTheme}>
            <h3>THE MULTIPLIER</h3>

            <p>
              Raising Leaders Who Multiply
            </p>

            <p>
              9th–11th December 2026
            </p>
          </div>

          <Link
            to="/register"
            className={styles.finalCtaButton}
          >
            REGISTER NOW
          </Link>

        </div>

      </div>
    </section>
  );
}

export default FinalCTA;