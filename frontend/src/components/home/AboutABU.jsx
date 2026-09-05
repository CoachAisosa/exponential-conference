import { Link } from "react-router-dom";
import styles from '../../pages/Home.module.css';
import abuLogo from "../../assets/logos/abuLogo.png"

function AboutABU() {
  return (
    <section className={styles.aboutAbuSection}>
      <div className={styles.aboutAbuContainer}>

        <div className={styles.abuLogo}>
          <img 
            src={abuLogo} 
            alt="ABU Logo" 
          />
        </div>

        <div className={styles.aboutAbuContent}>

          <p className="section-eyebrow">
            ABOUT APOSTOLOS BIBLE UNIVERSITY
          </p>

          <h2 className="section-title">
            Training for Effective Ministry Work
          </h2>

          <p>
            Apostolos Bible University International (ABU) is committed
            to Christian education, leadership development, ministerial
            training, and equipping men and women for effective service
            in the Kingdom of God.
          </p>

          <p>
            Through academic programmes, ministerial training,
            leadership development, conferences, and strategic
            partnerships, ABU seeks to contribute to the development of
            competent, principled, spiritually grounded, and
            transformational Christian leaders.
          </p>

          <p>
            The Exponential Conference is an expression of this
            mandate: to equip leaders who will equip others.
          </p>

          <Link
            to="/about"
            className={styles.aboutAbuButton}
          >
            LEARN MORE ABOUT ABU
          </Link>

        </div>

      </div>
    </section>
  );
}

export default AboutABU;