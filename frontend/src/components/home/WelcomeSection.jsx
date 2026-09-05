import styles from '../../pages/Home.module.css';

function WelcomeSection() {
  return (
    <section
      id="conference"
      className={styles.welcomeSection}
    >
      <div className={styles.welcomeContainer}>

        <div className="section-heading">
          <p className="section-eyebrow">
            WELCOME TO THE MULTIPLIER
          </p>

          <h2 className="section-title">
            Raising Leaders Who Multiply
          </h2>
        </div>

        <div className={styles.welcomeContent}>

          <p>
            There is a difference between leading people and raising
            leaders.
          </p>

          <p>
            A leader may gather followers, but a multiplier develops
            people who can carry responsibility, reproduce vision,
            develop others, and continue the work beyond their own
            generation.
          </p>

          <p>
            The Exponential Conference 2026 is designed to help leaders
            discover the principles, disciplines, structures, and
            spiritual responsibilities required to become multiplying
            leaders.
          </p>

          <h3 className={styles.welcomeSubtitle}>
            We are gathering to learn how to:
          </h3>

          <ul className={styles.welcomeList}>
            <li>Raise leaders rather than merely followers</li>
            <li>Develop people intentionally</li>
            <li>Transfer knowledge and spiritual values</li>
            <li>Build a culture of mentorship and discipleship</li>
            <li>Multiply ministry capacity</li>
            <li>Develop emerging leaders</li>
            <li>Create systems that reproduce healthy leadership</li>
            <li>Prepare the next generation for Kingdom responsibility</li>
            <li>Leave a legacy that continues beyond one person</li>
          </ul>

        </div>

      </div>
    </section>
  );
}

export default WelcomeSection;