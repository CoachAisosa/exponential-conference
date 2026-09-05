import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaGraduationCap,
  FaUsers,
  FaShareAlt,
} from "react-icons/fa";

import styles from "../../pages/LiveEvent.module.css";

function LiveCTA() {
  return (
    <section className={styles.liveCTASection}>

      <div className={styles.liveCTAContainer}>

        <div
          className={styles.liveCTAHeader}
          data-aos="fade-up"
        >

          <p className={styles.liveCTAEyebrow}>
            DON'T JUST WATCH
          </p>

          <h2 className={styles.liveCTATitle}>
            BECOME A MULTIPLIER
          </h2>

          <p className={styles.liveCTADescription}>
            What God has placed in you should not end with you.
            Receive. Develop. Empower. Multiply.
          </p>

        </div>


        {/* CTA CARDS */}

        <div className={styles.liveCTAContent}>

          {/* REGISTER */}

          <div
            className={styles.liveCTACard}
            data-aos="fade-up"
          >

            <div className={styles.liveCTACardIcon}>
              <FaUsers />
            </div>

            <h3 className={styles.liveCTACardTitle}>
              JOIN THE CONFERENCE
            </h3>

            <p className={styles.liveCTACardText}>
              Be part of the Exponential Conference and connect
              with leaders committed to developing people and
              multiplying Kingdom impact.
            </p>

            <Link
              to="/register"
              className={styles.liveCTACardButton}
            >
              REGISTER NOW
              <FaArrowRight />
            </Link>

          </div>


          {/* ABU */}

          <div
            className={styles.liveCTACard}
            data-aos="fade-up"
          >

            <div className={styles.liveCTACardIcon}>
              <FaGraduationCap />
            </div>

            <h3 className={styles.liveCTACardTitle}>
              STUDY WITH ABU
            </h3>

            <p className={styles.liveCTACardText}>
              Explore biblical education, ministerial training,
              leadership development, and other opportunities
              available through Apostolos Bible University International.
            </p>

            <a
              href="#"
              className={styles.liveCTACardButton}
            >
              EXPLORE ABU
              <FaArrowRight />
            </a>

          </div>


          {/* SHARE */}

          <div
            className={styles.liveCTACard}
            data-aos="fade-up"
          >

            <div className={styles.liveCTACardIcon}>
              <FaShareAlt />
            </div>

            <h3 className={styles.liveCTACardTitle}>
              SHARE THE EXPERIENCE
            </h3>

            <p className={styles.liveCTACardText}>
              Help someone else discover the message of
              leadership multiplication. Share the live event
              with your church, team, friends, and community.
            </p>

            <button
              type="button"
              className={styles.liveCTACardButton}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Exponential Conference 2026",
                    text: "Watch the Exponential Conference 2026 Live Event — THE MULTIPLIER.",
                    url: window.location.href,
                  });
                }
              }}
            >
              SHARE EVENT
              <FaShareAlt />
            </button>

          </div>

        </div>


        {/* FINAL CTA */}

        <div
          className={styles.liveFinalCTA}
          data-aos="fade-up"
        >

          <p className={styles.liveFinalCTAText}>
            THE MULTIPLIER
          </p>

          <h3 className={styles.liveFinalCTATitle}>
            Raising Leaders Who Multiply
          </h3>

          <p className={styles.liveFinalCTADescription}>
            9th–11th December 2026
          </p>

          <Link
            to="/register"
            className={styles.liveFinalCTAButton}
          >
            REGISTER FOR EXPONENTIAL CONFERENCE
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
}

export default LiveCTA;