import styles from "../styles/Dashboard.module.css";

function StatCard({ icon, label, value, color = "navy", subtitle }) {
  return (
    <div
      className={`${styles.statCard} ${styles[`statCard${color}`]}`}
      data-aos="fade-up"
    >
      <div className={styles.statCardIcon}>{icon}</div>
      <div className={styles.statCardContent}>
        <p className={styles.statCardLabel}>{label}</p>
        <h2 className={styles.statCardValue}>{value}</h2>
        {subtitle && <p className={styles.statCardSubtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default StatCard;