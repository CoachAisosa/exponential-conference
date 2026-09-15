import { useState, useEffect } from "react";
import DaySchedule from "./DaySchedule";
import styles from "../../pages/Programme.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function ProgrammeSchedule() {

  // Default schedule (used while loading OR if API fails)
  const defaultSchedule = [
    {
      day: 1,
      date: "9th December 2026",
      sessions: [
        {
          time: "09:00 AM – 10:00 AM",
          title: "Opening Session: The Call to Multiply",
          description:
            "An opening address that sets the tone for the conference, focusing on the biblical mandate to raise leaders who multiply.",
          speaker: "Prof. Julius Oyengbowman Iyare",
          venue: "Main Auditorium",
        },
        {
          time: "10:30 AM – 12:30 PM",
          title: "Session 1: The 2 Timothy 2:2 Model",
          description:
            "An in-depth teaching on the biblical model for generational leadership development found in 2 Timothy 2:2.",
          speaker: "Speaker Name",
          venue: "Main Auditorium",
        },
        {
          time: "02:00 PM – 04:00 PM",
          title: "Session 2: Developing People Intentionally",
          description:
            "Practical strategies for identifying, developing, mentoring, and releasing emerging leaders.",
          speaker: "Speaker Name",
          venue: "Main Auditorium",
        },
        {
          time: "04:30 PM – 06:00 PM",
          title: "Panel Discussion: Leadership Challenges",
          description:
            "An interactive session where leaders discuss real challenges and solutions in leadership development.",
          venue: "Main Auditorium",
        },
      ],
    },
    {
      day: 2,
      date: "10th December 2026",
      sessions: [
        {
          time: "09:00 AM – 10:30 AM",
          title: "Session 3: Transferring Responsibility",
          description:
            "Understanding how to entrust responsibility, delegate effectively, and develop capacity in others.",
          speaker: "Speaker Name",
          venue: "Main Auditorium",
        },
        {
          time: "11:00 AM – 12:30 PM",
          title: "Session 4: Building a Multiplication Culture",
          description:
            "Creating environments where leadership multiplication becomes the norm, not the exception.",
          speaker: "Speaker Name",
          venue: "Main Auditorium",
        },
        {
          time: "02:00 PM – 04:00 PM",
          title: "Workshop: Mentorship & Discipleship",
          description:
            "A practical workshop on building effective mentorship and discipleship structures.",
          speaker: "Speaker Name",
          venue: "Workshop Hall",
        },
        {
          time: "06:00 PM – 08:00 PM",
          title: "Evening Session: Worship & Word",
          description:
            "A time of worship, prayer, and prophetic ministry to commission leaders for multiplication.",
          speaker: "Speaker Name",
          venue: "Main Auditorium",
        },
      ],
    },
    {
      day: 3,
      date: "11th December 2026",
      sessions: [
        {
          time: "09:00 AM – 10:30 AM",
          title: "Session 5: Identifying Emerging Leaders",
          description:
            "Learning to recognize, nurture, and release the next generation of Kingdom leaders.",
          speaker: "Speaker Name",
          venue: "Main Auditorium",
        },
        {
          time: "11:00 AM – 12:30 PM",
          title: "Session 6: Generational Leadership",
          description:
            "Understanding the responsibility of passing wisdom, vision, and values to the next generation.",
          speaker: "Speaker Name",
          venue: "Main Auditorium",
        },
        {
          time: "02:00 PM – 04:00 PM",
          title: "Closing Session: The Commissioning",
          description:
            "A powerful closing session that commissions participants to return home and begin multiplying.",
          speaker: "Prof. Julius Oyengbowman Iyare",
          venue: "Main Auditorium",
        },
      ],
    },
  ];

  const [schedule, setSchedule] = useState(defaultSchedule);

  useEffect(() => {
    const fetchProgramme = async () => {
      try {
        const response = await fetch(`${API_URL}/programme`);
        const data = await response.json();

        console.log("Programme response:", data);

        if (data.success && data.programmes.length > 0) {
          // Normalize backend data to match frontend shape
          const apiSchedule = data.programmes.map((item) => ({
            day: item.day,
            date: item.date,
            sessions: item.sessions.map((s) => ({
              time: s.time,
              title: s.title,
              description: s.description || "",
              speaker: s.speaker || "",
              venue: s.venue || "Main Auditorium",
            })),
          }));

          setSchedule(apiSchedule);
        }
        // Otherwise keep default schedule
      } catch (err) {
        console.error("Programme fetch error:", err);
        // Keep default schedule on error
      }
    };

    fetchProgramme();
  }, []);

  return (
    <section
      id="schedule"
      className={styles.programmeScheduleSection}
      data-aos="fade-up"
    >
      <div className={styles.programmeScheduleContainer}>

        <div
          className={styles.programmeScheduleHeader}
          data-aos="fade-up"
        >
          <span className={styles.programmeScheduleLabel}>
            CONFERENCE SCHEDULE
          </span>

          <h2 className={styles.programmeScheduleTitle}>
            A Journey of Discovery, Development, and Commissioning
          </h2>

          <p className={styles.programmeScheduleDescription}>
            Each session is designed to equip, challenge, and inspire leaders
            to embrace the responsibility of multiplication. Below is the
            full schedule for the three days.
          </p>
        </div>

        <div className={styles.programmeScheduleGrid}>
          {schedule.map((dayData, index) => (
            <DaySchedule
              key={index}
              day={dayData.day}
              date={dayData.date}
              sessions={dayData.sessions}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProgrammeSchedule;