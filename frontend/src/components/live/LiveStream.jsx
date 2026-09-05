import {
  FaYoutube,
  FaExternalLinkAlt,
  FaCircle,
} from "react-icons/fa";

import styles from "../../pages/LiveEvent.module.css";

function LiveStream() {

  // Replace this demo ID with the YouTube Live video ID
  // when the conference livestream is created.
  const youtubeLiveId = "YOUR_YOUTUBE_LIVE_ID";

  return (
    <section
      id="live-stream"
      className={styles.liveStreamSection}
    >

      <div className={styles.liveStreamContainer}>

        {/* SECTION HEADER */}

        <div
          className={styles.liveStreamHeader}
          data-aos="fade-up"
        >

          <div className={styles.liveStreamStatus}>

            <FaCircle
              className={styles.liveStreamStatusIcon}
            />

            <span>
              LIVE NOW
            </span>

          </div>

          <p className={styles.liveStreamEyebrow}>
            EXPONENTIAL CONFERENCE 2026
          </p>

          <h2 className={styles.liveStreamTitle}>
            THE MULTIPLIER
          </h2>

          <p className={styles.liveStreamSubtitle}>
            Raising Leaders Who Multiply
          </p>

        </div>


        {/* VIDEO PLAYER */}

        <div
          className={styles.liveVideoWrapper}
          data-aos="zoom-in"
        >

          <div className={styles.liveVideoContainer}>

            <iframe
              className={styles.liveVideo}
              src={`https://www.youtube.com/embed/${youtubeLiveId}?autoplay=0&rel=0`}
              title="Exponential Conference 2026 Live Event"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>

          </div>

        </div>


        {/* LIVE INFORMATION */}

        <div
          className={styles.liveStreamInfo}
          data-aos="fade-up"
        >

          <div className={styles.liveStreamInfoContent}>

            <h3 className={styles.liveStreamInfoTitle}>
              WE ARE LIVE
            </h3>

            <p className={styles.liveStreamInfoText}>
              Join the Exponential Conference 2026 as we explore
              biblical and practical principles for raising leaders
              who multiply.
            </p>

          </div>


          {/* YOUTUBE LINK */}

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className={styles.liveYoutubeButton}
          >

            <FaYoutube />

            <span>
              WATCH ON YOUTUBE
            </span>

            <FaExternalLinkAlt />

          </a>

        </div>

      </div>

    </section>
  );
}

export default LiveStream;