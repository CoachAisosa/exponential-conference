import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from "../../pages/AboutABU.module.css";

function ABUFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What programmes does ABU offer?",
      answer:
        "ABU offers five programme levels: Certificate, Diploma, Bachelor, Masters, and Doctorate across five faculties including Ministerial Studies, Christian Leadership & Church Management, Theology & Biblical Studies, Faith-Based Counseling, and Christian Education & Missions.",
    },
    {
      question: "Is ABU accredited?",
      answer:
        "Yes, ABU is committed to maintaining high academic and theological standards. We operate under the authority of Apostolos Bible University International and follow rigorous academic and ministerial training standards.",
    },
    {
      question: "Can I study online with ABU?",
      answer:
        "Yes, ABU offers flexible learning options including online and distance learning programmes to accommodate students from different locations and schedules.",
    },
    {
      question: "Who can apply to ABU?",
      answer:
        "ABU is open to Christians who are called to ministry, leadership, or Christian service. Whether you are a pastor, minister, church worker, emerging leader, or someone with a heart for Kingdom impact, there is a programme for you.",
    },
    {
      question: "How do I apply to ABU?",
      answer:
        "You can apply by visiting our main website or contacting our admissions office. We will guide you through the application process, programme selection, and registration.",
    },
    {
      question: "Does ABU offer scholarships?",
      answer:
        "ABU provides opportunities for financial support based on merit, ministry involvement, and need. Contact the admissions office for more details on available scholarships.",
    },
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className={styles.abuFAQSection} data-aos="fade-up">
      <div className={styles.abuFAQContainer}>
        <div className={styles.abuFAQHeader}>
          <span className={styles.abuFAQEyebrow}>FREQUENTLY ASKED QUESTIONS</span>
          <h2 className={styles.abuFAQTitle}>Got Questions About ABU?</h2>
          <p className={styles.abuFAQDescription}>
            Find answers to common questions about Apostolos Bible
            University International.
          </p>
        </div>

        <div className={styles.abuFAQList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.abuFAQItem} ${
                openIndex === index ? styles.open : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                type="button"
                className={styles.abuFAQButton}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.abuFAQQuestion}>{faq.question}</span>
                <span className={styles.abuFAQIcon}>
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <div
                className={`${styles.abuFAQAnswer} ${
                  openIndex === index ? styles.open : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ABUFAQ;