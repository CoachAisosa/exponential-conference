import { FaHotel, FaHome, FaUsers } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function AccommodationOptions() {
  const options = [
    {
      icon: <FaHotel />,
      title: "Hotels",
      text: "Suitable for delegates who prefer private rooms and hotel facilities.",
    },
    {
      icon: <FaHome />,
      title: "Guest Houses",
      text: "An alternative for delegates looking for convenient and potentially more economical accommodation.",
    },
    {
      icon: <FaUsers />,
      title: "Group Accommodation",
      text: "Churches, ministries, and leadership teams travelling together may consider group accommodation arrangements.",
    },
  ];

  return (
    <section className={styles.accommodationOptionsSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>ACCOMMODATION</span>
          <h2 className={styles.sectionTitle}>Where to Stay</h2>
          <p className={styles.sectionDescription}>
            Delegates travelling from outside Benin City are encouraged to
            arrange accommodation early. A range of accommodation options may
            be available in different parts of Benin City, including:
          </p>
        </div>

        <div className={styles.accommodationOptionsGrid}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.accommodationOptionCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.accommodationOptionIcon}>{option.icon}</div>
              <h3 className={styles.accommodationOptionTitle}>{option.title}</h3>
              <p className={styles.accommodationOptionText}>{option.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AccommodationOptions;