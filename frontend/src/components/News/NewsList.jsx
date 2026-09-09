import NewsCard from "./NewsCard";

import styles from "../../pages/NewsArticle.module.css";
import newsImg from "../../assets/images/chad.jpg";
import newsTwoImg from "../../assets/images/Gabon.jpg";
// import newsThrImg from "../../assets/images/news 1.jpg";
import newsForImg from "../../assets/images/IMG_0820.jpg";
import newsFivImg from "../../assets/images/IMG_0679.jpg";
// import newsSixImg from "../../assets/images/news.jpg";


function NewsList() {

  const news = [
    {
      id: 1,
      category: "Conference",
      country: "Ghana",
      date: "August 2026",
      title: "Exponential Conference Chad Creates New Leadership Conversations",
      excerpt:
        "Leaders and emerging voices gathered for an impactful conference experience focused on multiplication, leadership and generational influence.",
      image: newsImg,
    },

    {
      id: 2,
      category: "Conference",
      country: "Kenya",
      date: "July 2026",
      title: "Gabon Hosts Another Powerful Exponential Experience",
      excerpt:
        "The Exponential movement continues across nations as leaders gather to learn, connect and strengthen their commitment to multiplying impact.",
      image: newsTwoImg,
    },

    {
      id: 3,
      category: "Speaker",
      country: "International",
      date: "September 2026",
      title: "Meet the Voices Coming to Exponential Conference Nigeria",
      excerpt:
        "Discover the speakers and leaders who will be joining the 2026 Nigerian conference experience.",
      image: newsForImg,
    },

    {
      id: 4,
      category: "Travel",
      country: "Nigeria",
      date: "September 2026",
      title: "Planning Your Journey to Benin City for Exponential 2026",
      excerpt:
        "Everything attendees need to know about travelling to Benin City and preparing for the conference.",
      image: newsForImg,
    },

    {
      id: 5,
      category: "Graduation",
      country: "Nigeria",
      date: "2026",
      title: "Celebrating Another Generation of ABU Graduates",
      excerpt:
        "Apostolos Bible University International celebrates students completing another important chapter in their academic journey.",
      image: newsFivImg,
    },

    {
      id: 6,
      category: "Announcement",
      country: "Nigeria",
      date: "2026",
      title: "Important Updates for Exponential Conference Attendees",
      excerpt:
        "Stay informed about registration, programmes, venue information and other important conference announcements.",
      image: newsForImg,
    },
  ];

  return (
    <section
      className={styles.newsList}
      id="latest-news"
    >

      <div className={styles.sectionContainer}>

        <div className={styles.newsGrid}>

          {news.map((item, index) => (
            <NewsCard
              key={item.id}
              news={item}
              index={index}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default NewsList;