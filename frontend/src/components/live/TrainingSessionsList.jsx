import { useState, useEffect } from "react";
import { FaCalendarAlt, FaPlay, FaCheckCircle, FaClock } from "react-icons/fa";
import styles from "../../pages/LiveEvent.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function TrainingSessionsList() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch(`${API_URL}/trainings`);
        const data = await res.json();
        if (res.ok) {
          setTrainings(data.trainings || []);
        }
      } catch (err) {
        console.error("Fetch trainings error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date to be announced";
    return new Date(date).toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status) => {
    if (status === "live") return <FaPlay />;
    if (status === "completed") return <FaCheckCircle />;
    return <FaClock />;
  };

  const getStatusClass = (status) => {
    if (status === "live") return styles.sessionStatusLive;
    if (status === "completed") return styles.sessionStatusCompleted;
    return styles.sessionStatusUpcoming;
  };

  // Don't render anything if no trainings or all empty
  if (loading || trainings.length === 0) return null;

  return (
    <section className={styles.sessionsSection}>
      <div className={styles.sessionsContainer}>
        <div className={styles.sessionsHeader} data-aos="fade-up">
          <p className={styles.sessionsEyebrow}>LIVE TRAINING SESSIONS</p>
          <h2 className={styles.sessionsTitle}>Conference Programme</h2>
          <p className={styles.sessionsSubtitle}>
            All live training sessions for Exponential Conference 2026
          </p>
        </div>

        <div className={styles.sessionsGrid}>
          {trainings.map((training, index) => (
            <div
              key={training._id}
              className={`${styles.sessionCard} ${
                training.status === "live" ? styles.sessionCardLive : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className={styles.sessionCardHeader}>
                <span
                  className={`${styles.sessionStatus} ${getStatusClass(
                    training.status
                  )}`}
                >
                  {getStatusIcon(training.status)}
                  {training.status.toUpperCase()}
                </span>

                <span className={styles.sessionOrder}>
                  #{training.order || index + 1}
                </span>
              </div>

              <h3 className={styles.sessionTitle}>{training.title}</h3>

              {training.description && (
                <p className={styles.sessionDescription}>
                  {training.description}
                </p>
              )}

              <div className={styles.sessionMeta}>
                <FaCalendarAlt className={styles.sessionMetaIcon} />
                <span>{formatDate(training.scheduledAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrainingSessionsList;