import { useState } from "react";
import { FaLock, FaUnlock, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import styles from "../../pages/LiveEvent.module.css";

function LiveAccessGate({ onAccessGranted }) {
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!accessCode.trim()) {
      setError("Please enter your access code.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/payments/verify-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessCode: accessCode.trim().toUpperCase() }),
        }
      );

      const data = await response.json();
      console.log("Verify response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid access code.");
      }

      // ✅ Success
      setSuccess(true);
      setError("");

      // Store access in localStorage
      localStorage.setItem("liveAccessGranted", "true");
      localStorage.setItem("liveAccessUser", JSON.stringify(data.user));

      // Wait 1 second, then grant access
      setTimeout(() => {
        onAccessGranted(data.user);
      }, 1000);
    } catch (err) {
      console.error("Access error:", err);
      setError(err.message || "Invalid access code. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.liveGateSection}>
      <div className={styles.liveGateOverlay}></div>

      <div className={styles.liveGateContainer}>
        <div className={styles.liveGateCard} data-aos="fade-up">
          {!success ? (
            <>
              <div className={styles.liveGateIconWrapper}>
                <FaLock className={styles.liveGateIcon} />
              </div>

              <h2 className={styles.liveGateTitle}>Live Stream Locked</h2>

              <p className={styles.liveGateSubtitle}>
                Enter your access code to watch the Exponential Conference 2026
                live stream.
              </p>

              <div className={styles.liveGateInfo}>
                <p>
                  <strong>Don't have an access code?</strong>
                </p>
                <p>
                  Complete your registration and payment to receive your unique
                  access code via email.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.liveGateForm}>
                <input
                  type="text"
                  placeholder="EXP-XXXX-XXXX"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className={styles.liveGateInput}
                  disabled={loading}
                  autoFocus
                />

                {error && (
                  <div className={styles.liveGateError}>
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.liveGateButton}
                  disabled={loading}
                >
                  {loading ? "VERIFYING..." : "UNLOCK LIVE STREAM"}
                  <FaArrowRight />
                </button>
              </form>

              <div className={styles.liveGateHelp}>
                <p>
                  Need help? Contact us at{" "}
                  <a href="mailto:abuexpocon@gmail.com">
                    abuexpocon@gmail.com
                  </a>
                </p>
              </div>
            </>
          ) : (
            <div className={styles.liveGateSuccess}>
              <FaCheckCircle className={styles.liveGateSuccessIcon} />
              <h2>Access Granted!</h2>
              <p>Loading live stream...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LiveAccessGate;