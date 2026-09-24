import { useState, useEffect } from "react";
import {
  FaYoutube,
  FaExternalLinkAlt,
  FaCircle,
} from "react-icons/fa";

import styles from "../../pages/LiveEvent.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function LiveStream() {
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // Fetch the current live training (or the next upcoming one)
  // ============================================================
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await fetch(`${API_URL}/trainings`);
        const data = await response.json();

        if (!response.ok || !data.trainings?.length) {
          setError("No training sessions available yet.");
          return;
        }

        // Priority: live → first upcoming → first in list
        const live = data.trainings.find((t) => t.status === "live");
        const upcoming = data.trainings.find((t) => t.status === "upcoming");
        const current = live || upcoming || data.trainings[0];

        setTraining(current);
      } catch (err) {
        console.error("Fetch training error:", err);
        setError("Unable to load the live stream.");
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, []);

  // ============================================================
  // Loading state
  // ============================================================
  if (loading) {
    return (
      <section id="live-stream" className={styles.liveStreamSection}>
        <div className={styles.liveStreamContainer}>
          <div className={styles.liveStreamHeader}>
            <p className={styles.liveStreamEyebrow}>
              EXPONENTIAL CONFERENCE 2026
            </p>
            <h2 className={styles.liveStreamTitle}>THE MULTIPLIER</h2>
            <p className={styles.liveStreamSubtitle}>
              Loading live session…
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // Error / no training
  // ============================================================
  if (error || !training) {
    return (
      <section id="live-stream" className={styles.liveStreamSection}>
        <div className={styles.liveStreamContainer}>
          <div className={styles.liveStreamHeader}>
            <p className={styles.liveStreamEyebrow}>
              EXPONENTIAL CONFERENCE 2026
            </p>
            <h2 className={styles.liveStreamTitle}>THE MULTIPLIER</h2>
            <p className={styles.liveStreamSubtitle}>
              {error || "No live session scheduled at this time."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const isLive = training.status === "live";

  return (
    <section id="live-stream" className={styles.liveStreamSection}>
      <div className={styles.liveStreamContainer}>
        {/* SECTION HEADER */}
        <div className={styles.liveStreamHeader} data-aos="fade-up">
          <div className={styles.liveStreamStatus}>
            <FaCircle className={styles.liveStreamStatusIcon} />
            <span>{isLive ? "LIVE NOW" : "UPCOMING SESSION"}</span>
          </div>

          <p className={styles.liveStreamEyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h2 className={styles.liveStreamTitle}>
            {training.title || "THE MULTIPLIER"}
          </h2>

          <p className={styles.liveStreamSubtitle}>
            {training.description || "Raising Leaders Who Multiply"}
          </p>
        </div>

        {/* VIDEO PLAYER */}
        <div className={styles.liveVideoWrapper} data-aos="zoom-in">
          <div className={styles.liveVideoContainer}>
            <iframe
              className={styles.liveVideo}
              src={`https://www.youtube.com/embed/${training.youtubeId}?autoplay=0&rel=0`}
              title={training.title || "Exponential Conference 2026"}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* LIVE INFORMATION */}
        <div className={styles.liveStreamInfo} data-aos="fade-up">
          <div className={styles.liveStreamInfoContent}>
            <h3 className={styles.liveStreamInfoTitle}>
              {isLive ? "WE ARE LIVE" : "SESSION DETAILS"}
            </h3>

            <p className={styles.liveStreamInfoText}>
              {training.description ||
                "Join the Exponential Conference 2026 as we explore biblical and practical principles for raising leaders who multiply."}
            </p>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${training.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className={styles.liveYoutubeButton}
          >
            <FaYoutube />
            <span>WATCH CONFERENCE</span>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </section>
  );
}

export default LiveStream;