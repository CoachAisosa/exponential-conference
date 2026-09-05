import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import styles from "../../pages/NewsArticle.module.css";
import newsImage from '../../assets/images/news 4.jpg'

function FeaturedNews() {
  const featuredNews = {
    category: "Conference",
    country: "Nigeria",
    date: "December 2026",
    title: "Exponential Conference 2026 — THE MULTIPLIER",
    excerpt:
      "A new generation of leaders is rising. Exponential Conference 2026 is coming to Benin City, Nigeria, bringing together leaders, ministers, professionals and emerging voices for a powerful experience focused on leadership multiplication and generational impact.",
    image: newsImage,
  };

  return (
    <section className={styles.featuredNews}>

      <div className={styles.sectionContainer}>

        <div
          className={styles.sectionHeading}
          data-aos="fade-up"
        >
          <span className={styles.sectionEyebrow}>
            FEATURED STORY
          </span>

          <h2 className={styles.sectionTitle}>
            The Story Making Headlines
          </h2>

          <p className={styles.sectionDescription}>
            Catch up on the latest major developments surrounding
            Exponential Conference and the ABU family.
          </p>
        </div>

        <article
          className={styles.featuredCard}
          data-aos="fade-up"
        >

          <div className={styles.featuredImageWrapper}>
              
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
              className={styles.featuredImage}
            />

            <span className={styles.featuredBadge}>
              {featuredNews.category}
            </span>

          </div>

          <div className={styles.featuredContent}>

            <div className={styles.newsMeta}>

              <span>
                <FaMapMarkerAlt className={styles.newsMetaIcon} />
                {featuredNews.country}
              </span>

              <span>
                <FaCalendarAlt className={styles.newsMetaIcon} />
                {featuredNews.date}
              </span>

            </div>

            <h3 className={styles.featuredTitle}>
              {featuredNews.title}
            </h3>

            <p className={styles.featuredExcerpt}>
              {featuredNews.excerpt}
            </p>

            <a
              href="#"
              className={styles.readStoryButton}
            >
              Read Full Story
              <FaArrowRight className={styles.readStoryIcon} />
            </a>

          </div>

        </article>

      </div>

    </section>
  );
}

export default FeaturedNews;