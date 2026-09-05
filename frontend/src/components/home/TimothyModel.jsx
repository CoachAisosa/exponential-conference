import styles from '../../pages/Home.module.css';

function TimothyModel() {
  return (
    <section className={styles.timothyModelSection}>
      <div className={styles.timothyModelContainer}>

        <div className="section-heading">
          <p className="section-eyebrow">
            THE 2 TIMOTHY 2:2 MODEL
          </p>

          <h2 className="section-title">
            Received. Developed. Entrusted. Multiplied.
          </h2>

          <p className="section-description">
            2 Timothy 2:2 presents a powerful model of generational
            leadership development.
          </p>
        </div>

        <div className={styles.multiplicationModel}>

          <article className={styles.modelCard}>
            <span className={styles.modelNumber}>01</span>

            <h3>PAUL</h3>

            <p>
              The one who receives and carries the revelation,
              experience, wisdom, and responsibility.
            </p>
          </article>

          <article className={styles.modelCard}>
            <span className={styles.modelNumber}>02</span>

            <h3>TIMOTHY</h3>

            <p>
              The emerging leader who is intentionally developed
              through relationship, instruction, example, and
              assignment.
            </p>
          </article>

          <article className={styles.modelCard}>
            <span className={styles.modelNumber}>03</span>

            <h3>FAITHFUL MEN</h3>

            <p>
              People who have been tested, developed, entrusted, and
              prepared to carry responsibility.
            </p>
          </article>

          <article className={styles.modelCard}>
            <span className={styles.modelNumber}>04</span>

            <h3>OTHERS</h3>

            <p>
              The next generation who will receive what has been
              entrusted and continue the multiplication process.
            </p>
          </article>

        </div>

        <div className={styles.modelConclusion}>
          <p>
            This is the power of multiplication: what God places in one
            person can reach generations.
          </p>
        </div>

      </div>
    </section>
  );
}

export default TimothyModel;