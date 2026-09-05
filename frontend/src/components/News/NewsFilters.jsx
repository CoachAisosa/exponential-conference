import {
  FaGlobeAfrica,
  FaFilter,
} from "react-icons/fa";

import styles from "../../pages/NewsArticle.module.css";

function NewsFilters() {
  return (
    <section className={styles.newsFilters}>

      <div className={styles.sectionContainer}>

        <div
          className={styles.filtersHeader}
          data-aos="fade-up"
        >
          <div>

            <span className={styles.sectionEyebrow}>
              EXPLORE STORIES
            </span>

            <h2 className={styles.filtersTitle}>
              Latest News & Updates
            </h2>

          </div>

          <div className={styles.filterLabel}>
            <FaFilter className={styles.filterIcon} />
            Filter Stories
          </div>

        </div>

        <div
          className={styles.filterButtons}
          data-aos="fade-up"
          data-aos-delay="100"
        >

          <button
            type="button"
            className={`${styles.filterButton} ${styles.activeFilter}`}
          >
            All Stories
          </button>

          <button
            type="button"
            className={styles.filterButton}
          >
            Nigeria
          </button>

          <button
            type="button"
            className={styles.filterButton}
          >
            Ghana
          </button>

          <button
            type="button"
            className={styles.filterButton}
          >
            Kenya
          </button>

          <button
            type="button"
            className={styles.filterButton}
          >
            International
          </button>

        </div>

        <div className={styles.countryNote}>

          <FaGlobeAfrica className={styles.countryNoteIcon} />

          <p>
            Discover stories and updates from Exponential Conference
            events and the wider Apostolos Bible University International
            community.
          </p>

        </div>

      </div>

    </section>
  );
}

export default NewsFilters;