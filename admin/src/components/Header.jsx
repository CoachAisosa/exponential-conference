import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Header.module.css";

function Header() {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerTitle}>Admin Dashboard</h1>
      </div>

      <div className={styles.headerRight}>
        <button className={styles.headerIcon}>
          <FaBell />
        </button>

        <div className={styles.headerUser}>
          <FaUserCircle className={styles.headerUserIcon} />
          <span className={styles.headerUserName}>{user?.name}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;