import {
  FaBullseye,
  FaCompass,
  FaUsers
} from "react-icons/fa";

import styles from "../../pages/About.module.css";

function AboutVisionMission() {
  return (
    <section
      className={styles.visionMissionSection}
      data-aos="fade-up"
    >

      <div className={styles.visionMissionContainer}>

        {/* Header */}
        <div
          className={styles.visionMissionHeader}
          data-aos="fade-up"
        >

          <p className={styles.visionMissionEyebrow}>
            OUR DIRECTION
          </p>

          <h2 className={styles.visionMissionTitle}>
            Building Leaders Who Create Generational Impact
          </h2>

        </div>

        {/* Cards */}
        <div className={styles.visionMissionGrid}>

          {/* Vision */}
          <article
            className={styles.visionMissionCard}
            data-aos="fade-up"
            data-aos-delay="100"
          >

            <div className={styles.visionMissionIcon}>
              <FaBullseye />
            </div>

            <span className={styles.visionMissionLabel}>
              OUR VISION
            </span>

            <h3 className={styles.visionMissionCardTitle}>
              Leaders Who Multiply
            </h3>

            <p className={styles.visionMissionCardText}>
              To raise and equip leaders who multiply themselves, develop
              others, strengthen the Church, and create lasting Kingdom
              impact across generations.
            </p>

          </article>

          {/* Mission */}
          <article
            className={styles.visionMissionCard}
            data-aos="fade-up"
            data-aos-delay="200"
          >

            <div className={styles.visionMissionIcon}>
              <FaCompass />
            </div>

            <span className={styles.visionMissionLabel}>
              OUR MISSION
            </span>

            <h3 className={styles.visionMissionCardTitle}>
              Equip. Develop. Multiply.
            </h3>

            <p className={styles.visionMissionCardText}>
              The Exponential Conference exists to equip Christian leaders
              with biblical and practical leadership principles, develop a
              culture of intentional mentorship and discipleship, encourage
              leaders to identify and develop emerging leaders, and promote
              generational leadership and sustainable ministry development.
            </p>

          </article>

          {/* Leadership */}
          <article
            className={styles.visionMissionCard}
            data-aos="fade-up"
            data-aos-delay="300"
          >

            <div className={styles.visionMissionIcon}>
              <FaUsers />
            </div>

            <span className={styles.visionMissionLabel}>
              OUR FOCUS
            </span>

            <h3 className={styles.visionMissionCardTitle}>
              Generational Leadership
            </h3>

            <p className={styles.visionMissionCardText}>
              We believe that one transformed and properly equipped leader
              can influence many people, but a leader who intentionally
              raises other leaders can influence generations.
            </p>

          </article>

        </div>

      </div>

    </section>
  );
}

export default AboutVisionMission;