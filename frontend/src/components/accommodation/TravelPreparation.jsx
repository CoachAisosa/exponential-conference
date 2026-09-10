import styles from "../../pages/Accommodation.module.css";

function TravelPreparation() {
  const steps = [
    {
      number: "01",
      title: "Register for the conference",
      text: "Complete your conference registration through the official registration platform.",
    },
    {
      number: "02",
      title: "Confirm your accommodation",
      text: "Secure your accommodation before travelling to Benin City.",
    },
    {
      number: "03",
      title: "Plan your transportation",
      text: "Arrange your airport transfer or local transportation in advance.",
    },
    {
      number: "04",
      title: "Keep your documents safe",
      text: "Keep your passport, identification, travel documents, registration confirmation, and payment records accessible.",
    },
    {
      number: "05",
      title: "Save the venue address",
      text: "Keep the complete conference venue address on your phone for easy reference.",
    },
  ];

  return (
    <section className={styles.travelPrepSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>TRAVEL PREPARATION</span>
          <h2 className={styles.sectionTitle}>Before You Travel</h2>
          <p className={styles.sectionDescription}>
            We encourage every delegate to plan ahead.
          </p>
        </div>

        <div className={styles.travelPrepGrid}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={styles.travelPrepCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className={styles.travelPrepNumber}>{step.number}</span>
              <h3 className={styles.travelPrepTitle}>{step.title}</h3>
              <p className={styles.travelPrepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TravelPreparation;