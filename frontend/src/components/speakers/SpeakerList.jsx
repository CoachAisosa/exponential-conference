import { useState, useEffect } from "react";
import SpeakerCard from "./SpeakerCard";

import styles from "../../pages/Speakers.module.css";
import founderImage from "../../assets/images/founder.jpg";
import speakersIcon from "../../assets/images/speaker icon.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function SpeakerList() {

  // Default speakers (used while loading OR if API fails)
  const defaultSpeakers = [
    {
      id: 1,
      name: "PROF. JULIUS OYENGBOWMAN IYARE",
      title: "Chancellor, Apostolos Bible University International",
      role: "Convener, Exponential Conference",
      image: founderImage,
      bio: `Prof. Julius Oyengbowman Iyare is a Christian educator, leadership
      mentor, pastor, author, and ministry trainer with a passion for
      developing leaders and strengthening the Church through biblical
      education and practical leadership development.`,
      focus: "Raising Leaders Who Multiply",
    },

    {
      id: 2,
      name: "SPEAKER NAME",
      title: "Title / Position",
      role: "Conference Speaker",
      image: speakersIcon,
      bio: `Brief biography highlighting ministry experience, leadership
      responsibility, academic or professional background, and area of
      expertise.`,
      focus: "Session / Topic",
    },

    {
      id: 3,
      name: "SPEAKER NAME",
      title: "Title / Position",
      role: "Conference Speaker",
      image: speakersIcon,
      bio: `Brief biography highlighting ministry experience, leadership
      responsibility, academic or professional background, and area of
      expertise.`,
      focus: "Session / Topic",
    },

    {
      id: 4,
      name: "SPEAKER NAME",
      title: "Title / Position",
      role: "Conference Speaker",
      image: speakersIcon,
      bio: `Brief biography highlighting ministry experience, leadership
      responsibility, academic or professional background, and area of
      expertise.`,
      focus: "Session / Topic",
    },
  ];

  const [speakers, setSpeakers] = useState(defaultSpeakers);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch(`${API_URL}/speakers`);
        const data = await response.json();

        console.log("Speakers response:", data);

        if (data.success && data.speakers.length > 0) {
          // Normalize backend data to match frontend shape
          const apiSpeakers = data.speakers.map((item) => ({
            id: item._id, // Map MongoDB _id → id
            name: item.name,
            title: item.title,
            role: item.role || "Conference Speaker",
            image: item.image || speakersIcon, // Fallback image
            bio: item.bio,
            focus: item.focus || "Session / Topic",
          }));

          setSpeakers(apiSpeakers);
        }
        // Otherwise keep default speakers
      } catch (err) {
        console.error("Speakers fetch error:", err);
        // Keep default speakers on error
      }
    };

    fetchSpeakers();
  }, []);

  return (
    <section
      id="speakers"
      className={styles.speakerListSection}
      data-aos="fade-up"
    >
      <div className={styles.speakerListContainer}>

        <div
          className={styles.speakerListHeader}
          data-aos="fade-up"
        >
          <span className={styles.speakerListLabel}>
            MEET OUR SPEAKERS
          </span>

          <h2 className={styles.speakerListTitle}>
            Voices That Equip. Leaders That Inspire.
          </h2>

          <p className={styles.speakerListDescription}>
            Our speakers will bring biblical teaching, practical leadership
            principles, ministry experience, and prophetic insight to help
            participants understand how to develop people, build strong
            teams, transfer responsibility, and create a culture of
            multiplication.
          </p>
        </div>

        <div className={styles.speakerListGrid}>

          {speakers.map((speaker, index) => (
            <div
              className={styles.speakerListItem}
              key={speaker.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <SpeakerCard speaker={speaker} />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default SpeakerList;