import {
  FaBookOpen,
  FaUsers,
  FaLightbulb,
  FaHandsHelping,
  FaUserFriends,
  FaPray
} from "react-icons/fa";

import styles from "../../pages/Programme.module.css";

function ProgrammeHighlights() {
  const highlights = [
    {
      id: 1,
      icon: <FaBookOpen />,
      title: "Biblical Teaching",
      description:
        "Sound biblical instruction on leadership, multiplication, discipleship, and generational impact.",
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: "Leadership Development",
      description:
        "Practical sessions designed to strengthen leadership capacity and develop multiplication skills.",
    },
    {
      id: 3,
      icon: <FaLightbulb />,
      title: "Practical Workshops",
      description:
        "Interactive workshops that provide tools and approaches for immediate application.",
    },
    {
      id: 4,
      icon: <FaHandsHelping />,
      title: "Mentorship & Discipleship",
      description:
        "Understanding how to build intentional relationships that develop faithful leaders.",
    },
    {
      id: 5,
      icon: <FaUserFriends />,
      title: "Networking & Connection",
      description:
        "Opportunities to connect with like-minded leaders and build strategic relationships.",
    },
    {
      id: 6,
      icon: <FaPray />,
      title: "Worship & Prayer",
      description:
        "Times of worship, prayer, and prophetic ministry for spiritual formation and commissioning.",
    },
  ];

  return (
    <section
      className={styles.programmeHighlightsSection}
      data-aos="fade-up"
    >
      <div className={styles.programmeHighlightsContainer}>

        <div
          className={styles.programmeHighlightsHeader}
          data-aos="fade-up"
        >
          <span className={styles.programmeHighlightsLabel}>
            WHAT TO EXPECT
          </span>

          <h2 className={styles.programmeHighlightsTitle}>
            A Programme Designed for Leadership Transformation
          </h2>

          <p className={styles.programmeHighlightsDescription}>
            The Exponential Conference programme is structured to provide
            participants with biblical teaching, practical workshops,
            leadership development, and spiritual formation — all aimed at
            equipping leaders to multiply.
          </p>
        </div>

        <div className={styles.programmeHighlightsGrid}>
          {highlights.map((item, index) => (
            <article
              key={item.id}
              className={styles.programmeHighlightCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.programmeHighlightIcon}>
                {item.icon}
              </div>

              <h3 className={styles.programmeHighlightTitle}>
                {item.title}
              </h3>

              <p className={styles.programmeHighlightDescription}>
                {item.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProgrammeHighlights;