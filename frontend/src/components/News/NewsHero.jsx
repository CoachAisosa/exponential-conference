import {
  FaNewspaper,
  FaGlobeAfrica,
  FaArrowDown,
} from "react-icons/fa";

import styles from "../../pages/NewsArticle.module.css";

function NewsHero() {
  return (
    <section className={styles.newsHero}>

      <div className={styles.newsHeroOverlay}></div>

      <div className={styles.newsHeroContent}>

        <span
          className={styles.newsHeroBadge}
          data-aos="fade-down"
        >
          <FaNewspaper className={styles.newsHeroBadgeIcon} />
          EXPONENTIAL NEWS & STORIES
        </span>

        <h1
          className={styles.newsHeroTitle}
          data-aos="fade-up"
        >
          Stories, Updates &{" "}
          <span>What’s Happening</span>
        </h1>

        <p
          className={styles.newsHeroText}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Stay connected with Exponential Conference and Apostolos
          Bible University International as we share conference
          updates, country events, speakers, travel information,
          graduation stories and leadership stories from around the world.
        </p>

        <div
          className={styles.newsHeroMeta}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className={styles.newsHeroMetaItem}>
            <FaGlobeAfrica className={styles.newsHeroMetaIcon} />
            <span>Global Updates</span>
          </div>

          <div className={styles.newsHeroMetaItem}>
            <FaNewspaper className={styles.newsHeroMetaIcon} />
            <span>Latest Stories</span>
          </div>
        </div>

        <a
          href="#latest-news"
          className={styles.newsHeroButton}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Explore Latest News

          <FaArrowDown className={styles.newsHeroButtonIcon} />
        </a>

      </div>

    </section>
  );
}

export default NewsHero;