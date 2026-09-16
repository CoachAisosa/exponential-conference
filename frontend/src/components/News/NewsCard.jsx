import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaArrowRight,
} from "react-icons/fa";

import styles from "../../pages/NewsArticle.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ============================================================
// Visitor ID — stored in localStorage (no login required)
// ============================================================
const getVisitorId = () => {
  let id = localStorage.getItem("newsVisitorId");

  if (!id) {
    id = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("newsVisitorId", id);
  }

  return id;
};

function NewsCard({ news, index }) {
  const newsId = news._id || news.id;

  const [interactions, setInteractions] = useState({
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    comments: [],
  });

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // Fetch interactions on mount
  // ============================================================
  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await fetch(
          `${API_URL}/news-interactions/${newsId}`
        );
        const data = await response.json();

        if (data.success) {
          setInteractions({
            likeCount: data.interaction.likeCount,
            commentCount: data.interaction.commentCount,
            shareCount: data.interaction.shareCount,
            comments: data.interaction.comments || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch interactions:", err);
      }
    };

    if (newsId) {
      fetchInteractions();
    }
  }, [newsId]);

  // ============================================================
  // Handle Like (toggle)
  // ============================================================
  const handleLike = async () => {
    try {
      const response = await fetch(
        `${API_URL}/news-interactions/${newsId}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId: getVisitorId() }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setLiked(data.action === "liked");
        setInteractions((prev) => ({
          ...prev,
          likeCount: data.likeCount,
        }));
      }
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  // ============================================================
  // Handle Comment Submit
  // ============================================================
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!commentForm.name || !commentForm.text) {
      setError("Name and comment are required.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/news-interactions/${newsId}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: commentForm.name,
            email: commentForm.email || "",
            text: commentForm.text,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setInteractions((prev) => ({
          ...prev,
          commentCount: data.commentCount,
          comments: [...prev.comments, data.comment],
        }));
        setCommentForm({ name: "", email: "", text: "" });
        setError("");
      } else {
        setError(data.message || "Failed to post comment.");
      }
    } catch (err) {
      console.error("Comment failed:", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // Handle Share
  // ============================================================
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/news#${newsId}`;
    const shareData = {
      title: news.title,
      text: news.excerpt,
      url: shareUrl,
    };

    try {
      // Try native share API (mobile)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }

      // Track share on backend
      const response = await fetch(
        `${API_URL}/news-interactions/${newsId}/share`,
        { method: "POST" }
      );

      const data = await response.json();

      if (data.success) {
        setInteractions((prev) => ({
          ...prev,
          shareCount: data.shareCount,
        }));
      }
    } catch (err) {
      // User cancelled share — don't track
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  return (
    <article
      className={styles.newsCard}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className={styles.newsCardImageWrapper}>
        <img
          src={
            news.image ||
            "https://via.placeholder.com/400x250/1a2a4a/ffffff?text=News"
          }
          alt={news.title}
          className={styles.newsCardImage}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x250/1a2a4a/ffffff?text=News";
          }}
        />

        <span className={styles.newsCardCategory}>{news.category}</span>
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

        <h3 className={styles.newsCardTitle}>{news.title}</h3>

        <p className={styles.newsCardExcerpt}>{news.excerpt}</p>

        <div className={styles.newsCardFooter}>
          <a href="#" className={styles.newsReadMore}>
            Read Story
            <FaArrowRight className={styles.newsReadMoreIcon} />
          </a>

          <div className={styles.newsInteractions}>
            {/* LIKE BUTTON */}
            <button
              type="button"
              className={`${styles.interactionButton} ${
                liked ? styles.interactionButtonActive : ""
              }`}
              onClick={handleLike}
              aria-label="Like"
            >
              <FaHeart className={styles.interactionIcon} />
              {interactions.likeCount}
            </button>

            {/* COMMENT BUTTON */}
            <button
              type="button"
              className={`${styles.interactionButton} ${
                showComments ? styles.interactionButtonActive : ""
              }`}
              onClick={() => setShowComments(!showComments)}
              aria-label="Comments"
            >
              <FaComment className={styles.interactionIcon} />
              {interactions.commentCount}
            </button>

            {/* SHARE BUTTON */}
            <button
              type="button"
              className={styles.interactionButton}
              onClick={handleShare}
              aria-label="Share"
            >
              <FaShareAlt className={styles.interactionIcon} />
            </button>
          </div>
        </div>

        {/* ============================================================
            INLINE COMMENT SECTION
        ============================================================ */}
        {showComments && (
          <div className={styles.commentSection}>
            {/* Existing Comments */}
            {interactions.comments.length > 0 && (
              <div className={styles.commentList}>
                {interactions.comments.map((comment, idx) => (
                  <div key={comment._id || idx} className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentName}>
                        {comment.name}
                      </span>
                      <span className={styles.commentDate}>
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-NG",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            {interactions.comments.length === 0 && (
              <p className={styles.commentEmpty}>
                No comments yet. Be the first to comment!
              </p>
            )}

            {/* Comment Form */}
            <form
              className={styles.commentForm}
              onSubmit={handleCommentSubmit}
            >
              <input
                type="text"
                placeholder="Your name *"
                value={commentForm.name}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, name: e.target.value })
                }
                className={styles.commentInput}
                required
              />

              <input
                type="email"
                placeholder="Email (optional)"
                value={commentForm.email}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, email: e.target.value })
                }
                className={styles.commentInput}
              />

              <textarea
                placeholder="Write your comment... *"
                value={commentForm.text}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, text: e.target.value })
                }
                className={styles.commentTextarea}
                rows="3"
                required
              />

              {error && (
                <p className={styles.commentError}>{error}</p>
              )}

              <button
                type="submit"
                className={styles.commentSubmit}
                disabled={submitting}
              >
                {submitting ? "POSTING..." : "POST COMMENT"}
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}

export default NewsCard;