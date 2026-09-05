import styles from '../../pages/Home.module.css';

function WhoShouldAttend() {
  return (
    <section className={styles.whoShouldAttendSection}>
      <div className={styles.whoShouldAttendContainer}>

        <div className="section-heading">
          <p className="section-eyebrow">
            WHO SHOULD ATTEND?
          </p>

          <h2 className="section-title">
            The Exponential Conference is designed for:
          </h2>
        </div>

        <div className={styles.attendeeGrid}>

          <article className={styles.attendeeCard}>
            <h3>Pastors and Ministers</h3>
            <p>
              Those who desire to develop leaders within their churches
              and ministries.
            </p>
          </article>

          <article className={styles.attendeeCard}>
            <h3>Church Leaders</h3>
            <p>
              Those responsible for teams, departments, ministries, and
              organisational development.
            </p>
          </article>

          <article className={styles.attendeeCard}>
            <h3>Christian Educators</h3>
            <p>
              Those involved in teaching, training, mentoring, and
              developing people.
            </p>
          </article>

          <article className={styles.attendeeCard}>
            <h3>Emerging Leaders</h3>
            <p>
              Those preparing for greater Kingdom responsibility.
            </p>
          </article>

          <article className={styles.attendeeCard}>
            <h3>Mentors and Discipleship Leaders</h3>
            <p>
              Those committed to raising and developing others.
            </p>
          </article>

          <article className={styles.attendeeCard}>
            <h3>Church Workers and Volunteers</h3>
            <p>
              Those who desire to grow in leadership capacity and
              effectiveness.
            </p>
          </article>

          <article className={styles.attendeeCard}>
            <h3>Christian Organisations and Ministry Leaders</h3>
            <p>
              Those seeking sustainable structures for growth and
              multiplication.
            </p>
          </article>

        </div>

      </div>
    </section>
  );
}

export default WhoShouldAttend;