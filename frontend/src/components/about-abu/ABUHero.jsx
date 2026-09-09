import { FaGraduationCap, FaBible, FaUsers, FaGlobeAfrica } from "react-icons/fa";
import styles from "../../pages/AboutABU.module.css";
import chancellorImg from "../../assets/images/founder.jpg";  
import vcImg from "../../assets/images/president.jpg";    

function ABUHero() {
  return (
    <section className={styles.abuHeroSection}>
      <div className={styles.abuHeroOverlay}></div>

      <div className={styles.abuHeroContainer}>

        <div className={styles.abuHeroContent} data-aos="fade-up">
          <div className={styles.abuHeroBadge}>
            <FaGraduationCap className={styles.abuHeroBadgeIcon} />
            <span>APOSTOLOS BIBLE UNIVERSITY INTERNATIONAL</span>
          </div>

          <h1 className={styles.abuHeroTitle}>
            Training for <span>Effective Ministry Work</span>
          </h1>

          <p className={styles.abuHeroDescription}>
            Apostolos Bible University International (ABU) is a Christian
            educational institution committed to biblical education,
            ministerial training, leadership development, and equipping
            men and women for effective service in the Kingdom of God.
          </p>

          <div className={styles.abuHeroStats}>
            <div className={styles.abuHeroStat}>
              <FaBible className={styles.abuHeroStatIcon} />
              <div>
                <span className={styles.abuHeroStatNumber}>5</span>
                <span className={styles.abuHeroStatLabel}>Faculties</span>
              </div>
            </div>

            <div className={styles.abuHeroStat}>
              <FaUsers className={styles.abuHeroStatIcon} />
              <div>
                <span className={styles.abuHeroStatNumber}>15+</span>
                <span className={styles.abuHeroStatLabel}>Departments</span>
              </div>
            </div>

            <div className={styles.abuHeroStat}>
              <FaGlobeAfrica className={styles.abuHeroStatIcon} />
              <div>
                <span className={styles.abuHeroStatNumber}>5</span>
                <span className={styles.abuHeroStatLabel}>Program Levels</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Images Section */}
        <div className={styles.abuFloatingImages} data-aos="fade-left" data-aos-delay="300">
          
          {/* Image 1: Chancellor */}
          <div className={styles.abuFloatingImageCard} data-aos="zoom-in" data-aos-delay="400">
            <div className={styles.abuFloatingImageWrapper}>
              <img 
                src={chancellorImg} 
                alt="Chancellor - Prof. Julius Oyengbowman Iyare" 
                className={styles.abuFloatingImage}
              />
              <div className={styles.abuFloatingImageOverlay}></div>
            </div>
            <div className={styles.abuFloatingImageInfo}>
              <h4>Chancellor</h4>
              <p>Prof. Julius Oyengbowman Iyare</p>
            </div>
          </div>

          {/* Image 2: Vice Chancellor */}
          <div className={styles.abuFloatingImageCard} data-aos="zoom-in" data-aos-delay="500">
            <div className={styles.abuFloatingImageWrapper}>
              <img 
                src={vcImg} 
                alt="Abu president" 
                className={styles.abuFloatingImage}
              />
              <div className={styles.abuFloatingImageOverlay}></div>
            </div>
            <div className={styles.abuFloatingImageInfo}>
              <h4>ABU Presideent</h4>
              <p>Prof. Blessing iyare</p>
            </div>
          </div>

        </div>

        {/* Vision & Mission Cards */}
        <div className={styles.abuVisionMission} data-aos="fade-up" data-aos-delay="200">
          <div className={styles.abuVisionCard}>
            <h3>Our Vision</h3>
            <p>
              To raise and equip leaders who multiply themselves, develop
              others, strengthen the Church, and create lasting Kingdom
              impact across generations.
            </p>
          </div>

          <div className={styles.abuMissionCard}>
            <h3>Our Mission</h3>
            <p>
              To equip Christian leaders with biblical and practical
              leadership principles, develop a culture of intentional
              mentorship and discipleship, and prepare emerging leaders
              for Kingdom responsibility.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ABUHero;