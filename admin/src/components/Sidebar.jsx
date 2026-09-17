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
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Sidebar.module.css";

function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/registrations", icon: <FaUsers />, label: "Registrations" },
    { path: "/payments", icon: <FaCreditCard />, label: "Payments" },
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/speakers", icon: <FaMicrophone />, label: "Speakers" },
    { path: "/programme", icon: <FaCalendarAlt />, label: "Programme" },
    { path: "/contacts", icon: <FaEnvelope />, label: "Contacts" },
  ];

  // Superadmin-only items
  if (user?.role === "superadmin") {
    navItems.push({ path: "/admins", icon: <FaUserShield />, label: "Admins" });
  }

  navItems.push({ path: "/settings", icon: <FaCog />, label: "Settings" });

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.sidebarLogo}>
        <h2>EXPONENTIAL</h2>
        <p>Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`
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