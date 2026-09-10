import {
  FaClipboardList,
  FaUserTag,
  FaCreditCard,
  FaCheckCircle,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import styles from "../../pages/Registration.module.css";

function HowToRegister() {
  const steps = [
    {
      number: "01",
      icon: <FaClipboardList />,
      title: "Complete the Registration Form",
      text: "Provide your correct personal and contact information.",
    },
    {
      number: "02",
      icon: <FaUserTag />,
      title: "Select Your Registration Category",
      text: "Choose the category that applies to you.",
    },
    {
      number: "03",
      icon: <FaCreditCard />,
      title: "Complete Payment",
      text: "Follow the official payment instructions provided on the registration platform.",
    },
    {
      number: "04",
      icon: <FaCheckCircle />,
      title: "Confirm Your Registration",
      text: "After payment, submit your payment confirmation where required.",
    },
    {
      number: "05",
      icon: <FaEnvelopeOpenText />,
      title: "Receive Your Conference Information",
      text: "Registered delegates will receive relevant information concerning the conference, programme, venue, and participation.",
    },
  ];

  return (
    <section className={styles.howToRegisterSection} data-aos="fade-up">
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.sectionEyebrow}>HOW TO REGISTER</span>
          <h2 className={styles.sectionTitle}>Your Registration Journey</h2>
          <p className={styles.sectionDescription}>
            Follow these five simple steps to complete your registration for
            Exponential Conference 2026.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={styles.stepCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowToRegister;