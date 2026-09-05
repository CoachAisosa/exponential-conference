import styles from '../../pages/Home.module.css';

function WhatToExpect() {
  return (
    <section className={styles.whatToExpectSection}>
      <div className={styles.whatToExpectContainer}>

        <div className="section-heading">
          <p className="section-eyebrow">
            WHAT TO EXPECT
          </p>

          <h2 className="section-title">
            Three Days of Leadership, Training, Inspiration and
            Transformation
          </h2>

          <p className="section-description">
            During the Exponential Conference 2026, participants will
            encounter powerful teaching, leadership development,
            ministry training, strategic conversations, worship,
            networking, and opportunities for meaningful relationships.
          </p>
        </div>

        <div className={styles.expectGrid}>

          <article className={styles.expectCard}>
            <h3>Inspiring Sessions</h3>
            <p>
              Biblical and practical teaching designed to strengthen
              your leadership capacity.
            </p>
          </article>

          <article className={styles.expectCard}>
            <h3>Leadership Development</h3>
            <p>
              Principles for identifying, training, mentoring, and
              releasing emerging leaders.
            </p>
          </article>

          <article className={styles.expectCard}>
            <h3>Ministry Growth</h3>
            <p>
              Practical insights for building ministries and
              organisations capable of sustainable growth and
              multiplication.
            </p>
          </article>

          <article className={styles.expectCard}>
            <h3>Mentorship & Discipleship</h3>
            <p>
              Understanding how intentional relationships produce
              strong and faithful leaders.
            </p>
          </article>

          <article className={styles.expectCard}>
            <h3>Strategic Conversations</h3>
            <p>
              Engaging with experienced leaders and learning from real
              ministry experiences.
            </p>
          </article>

          <article className={styles.expectCard}>
            <h3>Kingdom Networking</h3>
            <p>
              Connecting with pastors, ministers, educators, leaders,
              and emerging voices from different backgrounds.
            </p>
          </article>

        </div>

      </div>
    </section>
  );
}

export default WhatToExpect;