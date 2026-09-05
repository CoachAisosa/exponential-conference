import { Link } from "react-router-dom";
import {
  FaMicrophone,
  FaUsers,
  FaArrowRight,
  FaUserTie,
  FaChalkboardTeacher,
  FaHeart,
  FaStar
} from "react-icons/fa";
import styles from "../../pages/Speakers.module.css";

function SpeakersCTA() {
  return (
    <section
      className={styles.speakersCtaSection}
      data-aos="fade-up"
    >

      <div className={styles.speakersCtaOverlay}></div>

      <div className={styles.speakersCtaContainer}>

        {/* Header */}
        <div
          className={styles.speakersCtaHeader}
          data-aos="fade-up"
        >

          <div className={styles.speakersCtaIcon}>
            <FaMicrophone />
          </div>

          <p className={styles.speakersCtaEyebrow}>
            MEET OUR SPEAKERS
          </p>

          <h2 className={styles.speakersCtaTitle}>
            Hear from Kingdom Leaders Who Multiply
          </h2>

          <p className={styles.speakersCtaDescription}>
            Our speakers are seasoned ministers, pastors, educators, and
            leaders who have demonstrated a commitment to raising others
            and multiplying Kingdom impact. They bring a wealth of
            experience, biblical insight, and practical wisdom to equip
            you for greater effectiveness.
          </p>

        </div>

        {/* Speaker Highlights */}
        <div className={styles.speakersCtaGrid}>

          <div
            className={styles.speakersCtaCard}
            data-aos="fade-up"
            data-aos-delay="100"
          >

            <div className={styles.speakersCtaCardIcon}>
              <FaUserTie />
            </div>

            <h3 className={styles.speakersCtaCardTitle}>
              Seasoned Leaders
            </h3>

            <p className={styles.speakersCtaCardText}>
              Learn from leaders who have years of experience in ministry,
              church planting, and leadership development.
            </p>

          </div>

          <div
            className={styles.speakersCtaCard}
            data-aos="fade-up"
            data-aos-delay="200"
          >

            <div className={styles.speakersCtaCardIcon}>
              <FaChalkboardTeacher />
            </div>

            <h3 className={styles.speakersCtaCardTitle}>
              Practical Teaching
            </h3>

            <p className={styles.speakersCtaCardText}>
              Receive biblical and practical teaching that you can
              immediately apply to your ministry and leadership context.
            </p>

          </div>

          <div
            className={styles.speakersCtaCard}
            data-aos="fade-up"
            data-aos-delay="300"
          >

            <div className={styles.speakersCtaCardIcon}>
              <FaHeart />
            </div>

            <h3 className={styles.speakersCtaCardTitle}>
              Passionate About Multiplication
            </h3>

            <p className={styles.speakersCtaCardText}>
              Our speakers are not just leaders — they are multipliers
              who are committed to developing the next generation.
            </p>

          </div>

          <div
            className={styles.speakersCtaCard}
            data-aos="fade-up"
            data-aos-delay="400"
          >

            <div className={styles.speakersCtaCardIcon}>
              <FaStar />
            </div>

            <h3 className={styles.speakersCtaCardTitle}>
              Anointed & Equipped
            </h3>

            <p className={styles.speakersCtaCardText}>
              Each speaker brings a unique anointing and perspective,
              ensuring a rich and diverse learning experience.
            </p>

          </div>

        </div>

        {/* CTA Actions */}
        <div
          className={styles.speakersCtaActions}
          data-aos="fade-up"
          data-aos-delay="500"
        >

          <Link
            to="/register"
            className={styles.speakersCtaPrimaryButton}
          >
            REGISTER NOW

            <FaArrowRight
              className={styles.speakersCtaButtonIcon}
            />
          </Link>

        </div>

        {/* Bottom Text */}
        <p
          className={styles.speakersCtaBottom}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <FaMicrophone className={styles.speakersCtaBottomIcon} />
          Don't miss this opportunity to learn from leaders who are
          shaping the next generation of Kingdom leaders.
        </p>

      </div>

    </section>
  );
}

export default SpeakersCTA;