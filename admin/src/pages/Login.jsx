import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaExclamationCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Already logged in? Go home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.loginHeader}>
          <div className={styles.loginIcon}>
            <FaSignInAlt />
          </div>
          <h1 className={styles.loginTitle}>Admin Login</h1>
          <p className={styles.loginSubtitle}>
            Sign in to manage Exponential Conference
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Email */}
          <div className={styles.loginGroup}>
            <label className={styles.loginLabel}>Email Address</label>
            <div className={styles.loginInputWrapper}>
              <FaUser className={styles.loginInputIcon} />
              <input
                type="email"
                placeholder="admin@exponential.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.loginInput}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.loginGroup}>
            <label className={styles.loginLabel}>Password</label>
            <div className={styles.loginInputWrapper}>
              <FaLock className={styles.loginInputIcon} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginInput}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className={styles.loginError}>
              <FaExclamationCircle />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.loginFooter}>
          <p>
            Contact <strong>ABU Admin</strong> for access
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;