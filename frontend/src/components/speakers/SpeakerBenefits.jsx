import {
  FaBookOpen,
  FaUsers,
  FaLightbulb,
  FaUserFriends,
  FaGlobeAfrica,
} from "react-icons/fa";

import styles from "../../pages/Speakers.module.css";

function SpeakerBenefits() {
  const benefits = [
    {
      id: 1,
      icon: <FaBookOpen />,
      title: "BIBLICAL INSIGHT",
      description:
        "Sound biblical teaching that provides the foundation for effective Christian leadership.",
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: "LEADERSHIP EXPERIENCE",
      description:
        "Lessons drawn from real leadership and ministry experiences.",
    },
    {
      id: 3,
      icon: <FaLightbulb />,
      title: "PRACTICAL STRATEGIES",
      description:
        "Tools and approaches that can be applied immediately in churches, ministries, organisations, and leadership teams.",
    },
    {
      id: 4,
      icon: <FaUserFriends />,
      title: "MENTORSHIP WISDOM",
      description:
        "Insights into developing people intentionally and preparing emerging leaders.",
    },
    {
      id: 5,
      icon: <FaGlobeAfrica />,
      title: "GENERATIONAL PERSPECTIVE",
      description:
        "A focus on building leadership that can continue beyond one person or one generation.",
    },
  ];

  return (
    <section
      className={styles.speakerBenefitsSection}
      data-aos="fade-up"
    >
      <div className={styles.speakerBenefitsContainer}>

        <div
          className={styles.speakerBenefitsHeader}
          data-aos="fade-up"
        >
          <span className={styles.speakerBenefitsLabel}>
            WHAT OUR SPEAKERS WILL BRING
          </span>

          <h2 className={styles.speakerBenefitsTitle}>
            Biblical Wisdom. Practical Leadership. Generational Impact.
          </h2>

          <p className={styles.speakerBenefitsDescription}>
            These sessions are designed to equip participants with biblical
            understanding, practical leadership principles, mentorship wisdom,
            and a generational perspective that can be applied beyond the
            conference.
          </p>
        </div>

        <div className={styles.speakerBenefitsGrid}>

          {benefits.map((benefit, index) => (
            <article
              className={styles.speakerBenefitCard}
              key={benefit.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >

              <div className={styles.speakerBenefitIcon}>
                {benefit.icon}
              </div>

              <div className={styles.speakerBenefitContent}>

                <h3 className={styles.speakerBenefitTitle}>
                  {benefit.title}
                </h3>

                <p className={styles.speakerBenefitDescription}>
                  {benefit.description}
                </p>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default SpeakerBenefits;