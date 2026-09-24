import { useState, useEffect } from "react";
import { FaBook, FaArrowRight } from "react-icons/fa";
import styles from "../../pages/LiveEvent.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function FreeBookCard() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_URL}/settings/book`);
        const data = await res.json();
        if (res.ok) {
          setBook(data.settings);
        }
      } catch (err) {
        console.error("Fetch book settings error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  // Don't show anything if there is no book URL configured yet
  if (loading || !book?.url) return null;

  return (
    <section className={styles.freeBookSection}>
      <div className={styles.freeBookContainer} data-aos="zoom-in">
        <div className={styles.freeBookCard}>
          <div className={styles.freeBookIconWrapper}>
            <FaBook className={styles.freeBookIcon} />
          </div>

          <p className={styles.freeBookEyebrow}>
            EXCLUSIVE FOR PAID ATTENDEES
          </p>

          <h2 className={styles.freeBookTitle}>
            🎁 {book.title || "Your Free Conference Book"}
          </h2>

          <p className={styles.freeBookDescription}>
            Thank you for registering for Exponential Conference 2026. As an
            approved attendee, your complimentary conference book is available
            below.
          </p>

          <a
            href={book.url}
            target="_blank"
            rel="noreferrer"
            className={styles.freeBookButton}
          >
            GET YOUR FREE BOOK
            <FaArrowRight />
          </a>

          <p className={styles.freeBookNote}>
            You will be redirected to Selar to download your copy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FreeBookCard;