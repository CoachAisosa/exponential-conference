import styles from '../../pages/Home.module.css';

function ConferenceExperience() {
  return (
    <section className={styles.conferenceExperienceSection}>
      <div className={styles.conferenceExperienceContainer}>

        <div className="section-heading">
          <p className="section-eyebrow">
            THE CONFERENCE EXPERIENCE
          </p>

          <h2 className="section-title">
            RECEIVE. GROW. DEVELOP. MULTIPLY.
          </h2>
        </div>

        <div className={styles.experienceGrid}>

          <article className={styles.experienceCard}>
            <span className={styles.experienceNumber}>01</span>

            <h3>Receive</h3>

            <p>
              Gain fresh biblical insight and leadership principles.
            </p>
          </article>

          <article className={styles.experienceCard}>
            <span className={styles.experienceNumber}>02</span>

            <h3>Grow</h3>

            <p>
              Strengthen your character, competence, and leadership
              capacity.
            </p>
          </article>

          <article className={styles.experienceCard}>
            <span className={styles.experienceNumber}>03</span>

            <h3>Develop</h3>

            <p>
              Learn how to intentionally develop the people God has
              entrusted to you.
            </p>
          </article>

          <article className={styles.experienceCard}>
            <span className={styles.experienceNumber}>04</span>

            <h3>Multiply</h3>

            <p>
              Build a leadership culture that reproduces leaders and
              extends Kingdom influence.
            </p>
          </article>

        </div>

      </div>
    </section>
  );
}

export default ConferenceExperience;