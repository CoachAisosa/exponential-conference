import SpeakerCard from "./SpeakerCard";

import styles from "../../pages/Speakers.module.css";
import founderImage from "../../assets/images/founder.jpg"
import speakersIcon from "../../assets/images/speaker icon.png"

function SpeakerList() {
  const speakers = [
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