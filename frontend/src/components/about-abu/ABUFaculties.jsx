import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "../../pages/AboutABU.module.css";

function ABUFaculties() {
  const [expandedFaculty, setExpandedFaculty] = useState(null);

  const faculties = [
    {
      id: "ministerial-studies",
      name: "Ministerial Studies",
      description:
        "Equipping ministers for effective pastoral ministry, church leadership, and spiritual formation.",
      departments: [
        "Ministry",
        "Pastoral Studies",
        "Pastoral Counseling",
      ],
    },
    {
      id: "christian-leadership",
      name: "Christian Leadership & Church Management",
      description:
        "Developing leaders with skills in church administration, human resource management, and organizational leadership.",
      departments: [
        "Christian Leadership",
        "Church Management",
        "Human Resource Management",
        "Church Administration",
      ],
    },
    {
      id: "faith-based-counseling",
      name: "Faith-Based Counseling",
      description:
        "Training counselors to provide biblical and professional counseling in various life situations.",
      departments: [
        "Marriage Counseling",
        "Behavioral Counseling",
        "Family Counseling",
        "Pre-Marital Counseling",
      ],
    },
    {
      id: "theology-biblical-studies",
      name: "Theology & Biblical Studies",
      description:
        "Deepening understanding of Scripture, theology, divinity, and apologetics for effective ministry.",
      departments: [
        "Theology",
        "Biblical Studies",
        "Divinity",
        "Apologetics and Others",
      ],
    },
    {
      id: "christian-education-missions",
      name: "Christian Education & Missions",
      description:
        "Preparing educators, church planters, and missionaries for global Kingdom impact.",
      departments: [
        "Christian Education",
        "Church Planting",
        "Missiology",
      ],
    },
  ];

  const toggleFaculty = (id) => {
    if (expandedFaculty === id) {
      setExpandedFaculty(null);
    } else {
      setExpandedFaculty(id);
    }
  };

  return (
    <section className={styles.abuFacultiesSection} data-aos="fade-up">
      <div className={styles.abuFacultiesContainer}>
        <div className={styles.abuFacultiesHeader}>
          <span className={styles.abuFacultiesEyebrow}>ACADEMIC FACULTIES</span>
          <h2 className={styles.abuFacultiesTitle}>
            Explore Our Faculties & Departments
          </h2>
          <p className={styles.abuFacultiesDescription}>
            Tap on any faculty to see the departments under it.
          </p>
        </div>

        <div className={styles.abuFacultiesList}>
          {faculties.map((faculty, index) => (
            <div
              key={faculty.id}
              className={`${styles.abuFacultyItem} ${
                expandedFaculty === faculty.id ? styles.expanded : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                type="button"
                className={styles.abuFacultyButton}
                onClick={() => toggleFaculty(faculty.id)}
              >
                <div className={styles.abuFacultyInfo}>
                  <h3 className={styles.abuFacultyName}>{faculty.name}</h3>
                  <p className={styles.abuFacultyDescription}>
                    {faculty.description}
                  </p>
                </div>
                <span className={styles.abuFacultyArrow}>
                  {expandedFaculty === faculty.id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </button>

              <div
                className={`${styles.abuFacultyDepartments} ${
                  expandedFaculty === faculty.id ? styles.open : ""
                }`}
              >
                <div className={styles.abuDepartmentsGrid}>
                  {faculty.departments.map((dept, idx) => (
                    <span key={idx} className={styles.abuDepartmentTag}>
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ABUFaculties;