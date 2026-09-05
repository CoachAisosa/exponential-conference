import { FaClock, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../pages/Programme.module.css";

function DaySchedule({ day, date, sessions }) {
  return (
    <div
      className={styles.daySchedule}
      data-aos="fade-up"
    >
      <div className={styles.dayScheduleHeader}>
        <span className={styles.dayScheduleNumber}>DAY {day}</span>
        <h3 className={styles.dayScheduleDate}>{date}</h3>
      </div>

      <div className={styles.dayScheduleSessions}>
        {sessions.map((session, index) => (
          <div
            key={index}
            className={styles.dayScheduleSession}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className={styles.dayScheduleTime}>
              <FaClock />
              <span>{session.time}</span>
            </div>

            <div className={styles.dayScheduleContent}>
              <h4 className={styles.dayScheduleTitle}>
                {session.title}
              </h4>

              <p className={styles.dayScheduleDescription}>
                {session.description}
              </p>

              {session.speaker && (
                <div className={styles.dayScheduleSpeaker}>
                  <FaUser />
                  <span>{session.speaker}</span>
                </div>
              )}

              {session.venue && (
                <div className={styles.dayScheduleVenue}>
                  <FaMapMarkerAlt />
                  <span>{session.venue}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaySchedule;