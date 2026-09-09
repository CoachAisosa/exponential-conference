import {
  FaCertificate,
  FaGraduationCap,
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import styles from "../../pages/AboutABU.module.css";

function ABUPrograms() {
  const programs = [
    {
      level: "Certificate",
      icon: <FaCertificate />,
      description: "Foundational training for ministry and leadership.",
      duration: "6 Months",
    },
    {
      level: "Diploma",
      icon: <FaBookOpen />,
      description: "Practical ministry training and leadership development.",
      duration: "2 Years",
    },
    {
      level: "Bachelor",
      icon: <FaGraduationCap />,
      description: "Comprehensive theological and ministry education.",
      duration: "2 Years",
    },
    {
      level: "Masters",
      icon: <FaUserGraduate />,
      description: "Advanced leadership and ministry studies.",
      duration: "1 Years",
    },
    {
      level: "Doctorate",
      icon: <FaChalkboardTeacher />,
      description: "Highest level of theological and leadership scholarship.",
      duration: "2 Years",
    },
  ];

  return (
    <section className={styles.abuProgramsSection} data-aos="fade-up">
      <div className={styles.abuProgramsContainer}>
        <div className={styles.abuProgramsHeader}>
          <span className={styles.abuProgramsEyebrow}>ACADEMIC PROGRAMMES</span>
          <h2 className={styles.abuProgramsTitle}>
            Study With Apostolos Bible University
          </h2>
          <p className={styles.abuProgramsDescription}>
            Choose from five programme levels designed to equip you for
            effective ministry, leadership, and Kingdom service.
          </p>
        </div>

        <div className={styles.abuProgramsGrid}>
          {programs.map((program, index) => (
            <div
              key={index}
              className={styles.abuProgramCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.abuProgramIcon}>{program.icon}</div>
              <h3 className={styles.abuProgramLevel}>{program.level}</h3>
              <p className={styles.abuProgramDescription}>{program.description}</p>
              <span className={styles.abuProgramDuration}>{program.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ABUPrograms;