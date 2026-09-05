import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaArrowRight,
} from "react-icons/fa";

import styles from "../../pages/NewsArticle.module.css";

function NewsCard({ news, index }) {

  return (
    <article
      className={styles.newsCard}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >

      <div className={styles.newsCardImageWrapper}>

        <img
          src={news.image}
          alt={news.title}
          className={styles.newsCardImage}
        />

        <span className={styles.newsCardCategory}>
          {news.category}
        </span>

      </div>

      <div className={styles.newsCardContent}>

        <div className={styles.newsCardMeta}>

          <span>
            <FaMapMarkerAlt className={styles.newsCardMetaIcon} />
            {news.country}
          </span>

          <span>
            <FaCalendarAlt className={styles.newsCardMetaIcon} />
            {news.date}
          </span>

        </div>

        <h3 className={styles.newsCardTitle}>
          {news.title}
        </h3>

        <p className={styles.newsCardExcerpt}>
          {news.excerpt}
        </p>

        <div className={styles.newsCardFooter}>

          <a
            href="#"
            className={styles.newsReadMore}
          >
            Read Story

            <FaArrowRight
              className={styles.newsReadMoreIcon}
            />
          </a>

          <div className={styles.newsInteractions}>

            <span>
              <FaHeart className={styles.interactionIcon} />
              24
            </span>

            <span>
              <FaComment className={styles.interactionIcon} />
              8
            </span>

            <span>
              <FaShareAlt className={styles.interactionIcon} />
            </span>

          </div>

        </div>

      </div>

    </article>
  );
}

export default NewsCard;