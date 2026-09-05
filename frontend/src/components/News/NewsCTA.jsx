import {
  FaArrowRight,
  FaUserPlus,
  FaNewspaper,
} from "react-icons/fa";

import styles from "../../pages/NewsArticle.module.css";

function NewsCTA() {
  return (
    <section className={styles.newsCTA}>

      <div className={styles.newsCTAContainer}>

        <div
          className={styles.newsCTAContent}
          data-aos="fade-up"
        >

          <span className={styles.newsCTAEyebrow}>
            DON'T MISS THE NEXT STORY
          </span>

          <h2 className={styles.newsCTATitle}>
            Be Part of What Happens Next.
          </h2>

          <p className={styles.newsCTAText}>
            Exponential is more than an event. It is a movement of
            leaders, builders and people committed to creating impact
            that reaches beyond their generation.
          </p>

          <div className={styles.newsCTAButtons}>

            <a
              href="/register"
              className={styles.newsPrimaryButton}
            >
              <FaUserPlus className={styles.newsButtonIcon} />
              Register for Exponential 2026
              <FaArrowRight className={styles.newsButtonArrow} />
            </a>

            <a
              href="#latest-news"
              className={styles.newsSecondaryButton}
            >
              <FaNewspaper className={styles.newsButtonIcon} />
              Explore More Stories
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default NewsCTA;