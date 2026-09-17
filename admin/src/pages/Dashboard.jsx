import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import StatCard from "../components/StatCard";
import { getRegistrationStats, getRegistrations, getAllPayments } from "../services/api";
import styles from "../styles/Dashboard.module.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // Load dashboard data on mount
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Run all requests in parallel (faster!)
        const [statsRes, recentRes, paymentsRes] = await Promise.all([
          getRegistrationStats(),
          getRegistrations({ limit: 5 }),
          getAllPayments("submitted"),
        ]);

        setStats(statsRes.data.stats);

        // Take first 5 recent registrations
        const recentList = recentRes.data.registrations.slice(0, 5);
        setRecent(recentList);

        setPendingPayments(paymentsRes.data.count || 0);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.dashboardLoading}>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className={styles.dashboardEmpty}>
        <FaExclamationTriangle />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard Overview</h1>
        <p className={styles.dashboardSubtitle}>
          Welcome back! Here's what's happening with your conference.
        </p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={<FaUsers />}
          label="Total Registrations"
          value={stats?.total || 0}
          color="navy"
          subtitle="All time"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          label="Recent (7 days)"
          value={stats?.recent || 0}
          color="green"
          subtitle="Last 7 days"
        />
        <StatCard
          icon={<FaClock />}
          label="Pending Payments"
          value={pendingPayments}
          color="orange"
          subtitle="Awaiting approval"
        />
        <StatCard
          icon={<FaCheckCircle />}
          label="Approved Payments"
          value={
            stats?.total && pendingPayments
              ? stats.total - pendingPayments
              : 0
          }
          color="green"
          subtitle="Confirmed"
        />
      </div>

      {/* Dashboard Grid */}
      <div className={styles.dashboardGrid}>
        {/* Categories Breakdown */}
        <div className={styles.dashboardPanel}>
          <div className={styles.dashboardPanelHeader}>
            <h2 className={styles.dashboardPanelTitle}>
              Registration Categories
            </h2>
            <Link to="/registrations" className={styles.dashboardPanelLink}>
              View All →
            </Link>
          </div>

          <div className={styles.categoryList}>
            <div className={styles.categoryItem}>
              <span className={styles.categoryItemLabel}>
                Individual Registration
              </span>
              <span className={styles.categoryItemValue}>
                {stats?.categories?.individual || 0}
              </span>
            </div>
            <div className={styles.categoryItem}>
              <span className={styles.categoryItemLabel}>
                Church / Group Registration
              </span>
              <span className={styles.categoryItemValue}>
                {stats?.categories?.churchGroup || 0}
              </span>
            </div>
            <div className={styles.categoryItem}>
              <span className={styles.categoryItemLabel}>
                Minister / Pastor Registration
              </span>
              <span className={styles.categoryItemValue}>
                {stats?.categories?.ministerPastor || 0}
              </span>
            </div>
            <div className={styles.categoryItem}>
              <span className={styles.categoryItemLabel}>
                Student / Emerging Leader
              </span>
              <span className={styles.categoryItemValue}>
                {stats?.categories?.student || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Registrations */}
        <div className={styles.dashboardPanel}>
          <div className={styles.dashboardPanelHeader}>
            <h2 className={styles.dashboardPanelTitle}>
              Recent Registrations
            </h2>
            <Link to="/registrations" className={styles.dashboardPanelLink}>
              View All →
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className={styles.dashboardEmpty}>No registrations yet.</p>
          ) : (
            <div className={styles.recentList}>
              {recent.map((reg) => (
                <div key={reg._id} className={styles.recentItem}>
                  <div className={styles.recentItemInfo}>
                    <p className={styles.recentItemName}>{reg.fullName}</p>
                    <p className={styles.recentItemEmail}>{reg.email}</p>
                  </div>
                  <span className={styles.recentItemBadge}>
                    {reg.registrationCategory?.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;