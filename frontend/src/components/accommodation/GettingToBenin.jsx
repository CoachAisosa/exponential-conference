import { FaPlane, FaPlaneDeparture, FaMapSigns } from "react-icons/fa";
import styles from "../../pages/Accommodation.module.css";

function GettingToBenin() {
  return (
    <section className={styles.gettingToBeninSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>GETTING TO BENIN CITY</span>
          <h2 className={styles.sectionTitle}>Plan Your Travel</h2>
        </div>

        <div className={styles.travelGrid}>
          <div className={styles.travelCard} data-aos="fade-up">
            <div className={styles.travelCardIcon}>
              <FaPlane />
            </div>
            <h3 className={styles.travelCardTitle}>By Air</h3>
            <p className={styles.travelCardText}>
              Delegates travelling by air should plan their journey to Benin
              City, Edo State.
            </p>
            <p className={styles.travelCardText}>
              Benin City is served by Benin Airport, providing access for
              delegates travelling from other parts of Nigeria.
            </p>
            <p className={styles.travelCardText}>
              International delegates may travel through major Nigerian
              international airports and make onward arrangements to Benin City.
            </p>
            <p className={styles.travelCardText}>
              Delegates should confirm their flight schedules and allow
              sufficient time for onward transportation to the conference venue.
            </p>
          </div>

          <div className={styles.travelCard} data-aos="fade-up" data-aos-delay="100">
            <div className={styles.travelCardIcon}>
              <FaPlaneDeparture />
            </div>
            <h3 className={styles.travelCardTitle}>From Airport to Venue</h3>
            <p className={styles.travelCardText}>
              Upon arrival in Benin City, delegates should arrange
              transportation to:
            </p>
            <div className={styles.travelVenueBox}>
              <p className={styles.travelVenueName}>Dream City Christian Centre</p>
              <p className={styles.travelVenueAddress}>
                2, Ogiemwanye Avenue, Off Nomayo, Upper Sakponba Road,
                Benin City, Edo State, Nigeria.
              </p>
            </div>
            <p className={styles.travelCardText}>
              Conference organisers may provide additional transportation
              information or recommended transport arrangements closer to
              the conference date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GettingToBenin;