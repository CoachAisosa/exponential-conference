import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCreditCard,
  FaNewspaper,
  FaMicrophone,
  FaCalendarAlt,
  FaEnvelope,
  FaUserShield,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaVideo,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Sidebar.module.css";

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/registrations", icon: <FaUsers />, label: "Registrations" },
    { path: "/payments", icon: <FaCreditCard />, label: "Payments" },
    { path: "/trainings", icon: <FaVideo />, label: "Live Trainings" }, 
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/speakers", icon: <FaMicrophone />, label: "Speakers" },
    { path: "/programme", icon: <FaCalendarAlt />, label: "Programme" },
    { path: "/contacts", icon: <FaEnvelope />, label: "Contacts" },
  ];

  if (user?.role === "superadmin") {
    navItems.push({ path: "/admins", icon: <FaUserShield />, label: "Admins" });
  }

  navItems.push({ path: "/settings", icon: <FaCog />, label: "Settings" });

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
    >
      {/* Logo + Close button */}
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarLogo}>
          <h2>EXPONENTIAL</h2>
          <p>Admin Panel</p>
        </div>

        <button
          className={styles.sidebarClose}
          onClick={onClose}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `${styles.sidebarLink} ${
                isActive ? styles.sidebarLinkActive : ""
              }`
            }
          >
            <span className={styles.sidebarIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info + Logout */}
      <div className={styles.sidebarFooter}>
        <div className={styles.sidebarUser}>
          <p className={styles.sidebarUserName}>{user?.name}</p>
          <p className={styles.sidebarUserRole}>{user?.role}</p>
        </div>

        <button onClick={logout} className={styles.sidebarLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;