import {
  FaUserTie,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";


import styles from "../../pages/Speakers.module.css";

function SpeakerCard({ speaker }) {
  return (
    <article
      className={styles.speakerCard}
      data-aos="fade-up"
    >

      <div className={styles.speakerCardImageWrapper}>

        <img
          src={speaker.image}
          alt={speaker.name}
          className={styles.speakerCardImage}
        />

        <div className={styles.speakerCardImageOverlay}></div>

        <div className={styles.speakerCardIcon}>
          <FaUserTie />
        </div>

      </div>

      <div className={styles.speakerCardContent}>

        <div className={styles.speakerCardHeader}>

          <span className={styles.speakerCardRole}>
            {speaker.role}
          </span>

          <h3 className={styles.speakerCardName}>
            {speaker.name}
          </h3>

          <p className={styles.speakerCardTitle}>
            {speaker.title}
          </p>

        </div>

        <div className={styles.speakerCardQuoteIcon}>
          <FaQuoteLeft />
        </div>

        <p className={styles.speakerCardBio}>
          {speaker.bio}
        </p>

        <div className={styles.speakerCardFocus}>

          <span className={styles.speakerCardFocusLabel}>
            CONFERENCE FOCUS
          </span>

          <p className={styles.speakerCardFocusText}>
            {speaker.focus}
          </p>

        </div>

        <button
          type="button"
          className={styles.speakerCardButton}
        >
          VIEW SPEAKER
          <FaArrowRight />
        </button>

      </div>

    </article>
  );
}

export default SpeakerCard;