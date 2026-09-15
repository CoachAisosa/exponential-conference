import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import styles from "../../pages/NewsArticle.module.css";
import newsImage from '../../assets/images/news 4.jpg';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function FeaturedNews() {
  const [featuredNews, setFeaturedNews] = useState({
    category: "Conference",
    country: "Nigeria",
    date: "December 2026",
    title: "Exponential Conference 2026 — THE MULTIPLIER",
    excerpt:
      "A new generation of leaders is rising. Exponential Conference 2026 is coming to Benin City, Nigeria, bringing together leaders, ministers, professionals and emerging voices for a powerful experience focused on leadership multiplication and generational impact.",
    image: newsImage,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_URL}/news/featured`);
        const data = await response.json();

        console.log("Featured response:", data);

        if (data.success && data.news) {
          setFeaturedNews({
            category: data.news.category,
            country: data.news.country,
            date: data.news.date,
            title: data.news.title,
            excerpt: data.news.excerpt,
            image: data.news.image || newsImage,
          });
        } else {
          // Fallback to first news
          const fallbackRes = await fetch(`${API_URL}/news`);
          const fallbackData = await fallbackRes.json();

          if (fallbackData.success && fallbackData.news.length > 0) {
            const first = fallbackData.news[0];
            setFeaturedNews({
              category: first.category,
              country: first.country,
              date: first.date,
              title: first.title,
              excerpt: first.excerpt,
              image: first.image || newsImage,
            });
          }
          // Otherwise keep the default hardcoded news
        }
      } catch (err) {
        console.error("Featured fetch error:", err);
        // Keep default hardcoded news on error
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className={styles.featuredNews}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeading} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>FEATURED STORY</span>

          <h2 className={styles.sectionTitle}>
            The Story Making Headlines
          </h2>

          <p className={styles.sectionDescription}>
            Catch up on the latest major developments surrounding
            Exponential Conference and the ABU family.
          </p>
        </div>

        <article className={styles.featuredCard} data-aos="fade-up">
          <div className={styles.featuredImageWrapper}>
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
              className={styles.featuredImage}
              onError={(e) => {
                e.target.src = newsImage;
              }}
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

            <a href="#" className={styles.readStoryButton}>
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