import styles from '../../pages/Home.module.css';

function WhyMultiplier() {
  return (
    <section className={styles.whyMultiplierSection}>
      <div className={styles.whyMultiplierContainer}>

        <div className="section-heading">
          <p className="section-eyebrow">
            WHY THE MULTIPLIER?
          </p>

          <h2 className="section-title">
            Because the future needs more than great leaders.
          </h2>
        </div>

        <div className={styles.whyMultiplierContent}>

          <p>
            The greatest evidence of leadership is not simply what you
            accomplish yourself, but what you enable others to
            accomplish.
          </p>

          <p>
            A church becomes stronger when leaders are developed.
          </p>

          <p>
            A ministry becomes more sustainable when responsibility is
            transferred.
          </p>

          <p>
            A generation becomes stronger when wisdom is intentionally
            passed on.
          </p>

          <p>
            A movement becomes exponential when leaders begin to
            multiply leaders.
          </p>

          <div className={styles.whyMultiplierQuestion}>
            <p>
              The question is no longer:
            </p>

            <h3>
              “How many people can I lead?”
            </h3>

            <p>
              The greater question is:
            </p>

            <h3>
              “How many leaders can I raise?”
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyMultiplier;