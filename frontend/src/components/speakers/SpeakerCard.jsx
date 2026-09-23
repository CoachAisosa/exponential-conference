import {
  FaUserTie,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";

import styles from "../../pages/Speakers.module.css";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x400/1a2a4a/ffffff?text=Speaker";

const positionMap = {
  top: "center 0%",
  upper: "center 20%",
  center: "center 50%",
  lower: "center 75%",
  bottom: "center 100%",
};

function SpeakerCard({ speaker }) {
  return (
    <article
      className={styles.speakerCard}
      data-aos="fade-up"
    >

      <div className={styles.speakerCardImageWrapper}>

      <img
         src={speaker.image || FALLBACK_IMAGE}
         alt={speaker.name}
        className={styles.speakerCardImage}
          style={{
            objectPosition: positionMap[speaker.imagePosition] || "center 20%",
          }}
                 onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                }}
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