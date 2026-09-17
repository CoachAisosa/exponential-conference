import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
  FaFileAlt,
  FaExternalLinkAlt,
  FaCopy,
  FaInbox,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  getAllPayments,
  approvePayment,
  rejectPayment,
} from "../services/api";
import styles from "../styles/Payments.module.css";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  "/api",
  ""
);

function Payments() {
  const [payments, setPayments] = useState([]);
  const [allCounts, setAllCounts] = useState({
    submitted: 0,
    approved: 0,
    rejected: 0,
  });
  const [activeTab, setActiveTab] = useState("submitted");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [processing, setProcessing] = useState(""); // ID being processed
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejecting, setRejecting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  // ============================================================
  // Load payments by status
  // ============================================================
  const loadPayments = async (status) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllPayments(status);
      setPayments(response.data.payments || []);
    } catch (err) {
      console.error("Load payments error:", err);
      setError("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Load counts for all statuses
  // ============================================================
  const loadCounts = async () => {
    try {
      const [pending, approved, rejected] = await Promise.all([
        getAllPayments("submitted"),
        getAllPayments("approved"),
        getAllPayments("rejected"),
      ]);

      setAllCounts({
        submitted: pending.data.count || 0,
        approved: approved.data.count || 0,
        rejected: rejected.data.count || 0,
      });
    } catch (err) {
      console.error("Load counts error:", err);
    }
  };

  // Load on mount + when tab changes
  useEffect(() => {
    loadPayments(activeTab);
  }, [activeTab]);

  useEffect(() => {
    loadCounts();
  }, []);

  // ============================================================
  // Handle Approve
  // ============================================================
  const handleApprove = async (id) => {
    try {
      setProcessing(id);
      const response = await approvePayment(id);

      setSuccessMessage(
        `✅ Approved! Access code: ${response.data.accessCode}`
      );

      // Reload after short delay
      setTimeout(() => {
        setSuccessMessage("");
        loadPayments(activeTab);
        loadCounts();
      }, 2500);
    } catch (err) {
      console.error("Approve error:", err);
      alert(err.response?.data?.message || "Failed to approve payment.");
    } finally {
      setProcessing("");
    }
  };

  // ============================================================
  // Handle Reject Submit
  // ============================================================
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    try {
      setRejecting(true);
      await rejectPayment(rejectTarget._id, rejectReason);

      setRejectTarget(null);
      setRejectReason("");

      loadPayments(activeTab);
      loadCounts();
    } catch (err) {
      console.error("Reject error:", err);
      alert(err.response?.data?.message || "Failed to reject payment.");
    } finally {
      setRejecting(false);
    }
  };

  // ============================================================
  // Copy access code to clipboard
  // ============================================================
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Access code copied!");
  };

  // ============================================================
  // Helper: Format date
  // ============================================================
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================================
  // view recipt function
  // ============================================================

  const viewReceipt = async (registrationId) => {
  try {
    const token = localStorage.getItem("adminToken");

    // Fetch image as blob
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/receipt/${registrationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Receipt not found");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Open in new tab
    window.open(url, "_blank");
  } catch (err) {
    console.error("View receipt error:", err);
    alert("Could not load receipt. It may have been removed.");
  }
};

  return (
    <div className={styles.paymentsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Payments Management</h1>
          <p className={styles.pageSubtitle}>
            Review and approve payment receipts from attendees
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            borderLeft: "4px solid #28a745",
            fontWeight: "600",
          }}
        >
          {successMessage}
        </div>
      )}

      {/* Status Tabs */}
      <div className={styles.statusTabs}>
        <button
          className={`${styles.statusTab} ${
            activeTab === "submitted" ? styles.statusTabActive : ""
          } ${styles.statusTabPending}`}
          onClick={() => setActiveTab("submitted")}
        >
          <FaClock />
          Pending
          <span className={styles.statusTabCount}>
            {allCounts.submitted}
          </span>
        </button>

        <button
          className={`${styles.statusTab} ${
            activeTab === "approved" ? styles.statusTabActive : ""
          }`}
          onClick={() => setActiveTab("approved")}
        >
          <FaCheckCircle />
          Approved
          <span className={styles.statusTabCount}>{allCounts.approved}</span>
        </button>

        <button
          className={`${styles.statusTab} ${
            activeTab === "rejected" ? styles.statusTabActive : ""
          }`}
          onClick={() => setActiveTab("rejected")}
        >
          <FaExclamationTriangle />
          Rejected
          <span className={styles.statusTabCount}>{allCounts.rejected}</span>
        </button>
      </div>

      {/* Payments List */}
      {loading ? (
        <div className={styles.loadingState}>Loading payments...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <FaExclamationTriangle className={styles.emptyStateIcon} />
          <h3>{error}</h3>
        </div>
      ) : payments.length === 0 ? (
        <div className={styles.emptyState}>
          <FaInbox className={styles.emptyStateIcon} />
          <h3>No {activeTab} payments</h3>
          <p>
            {activeTab === "submitted"
              ? "New payment receipts will appear here for approval."
              : `No payments with "${activeTab}" status.`}
          </p>
        </div>
      ) : (
        <div className={styles.paymentsList}>
          {payments.map((payment) => (
            <div
              key={payment._id}
              className={`${styles.paymentCard} ${
                payment.paymentStatus === "approved"
                  ? styles.paymentCardApproved
                  : payment.paymentStatus === "rejected"
                  ? styles.paymentCardRejected
                  : ""
              }`}
            >
              {/* Header */}
              <div className={styles.paymentCardHeader}>
                <div className={styles.paymentCardUser}>
                  <h3 className={styles.paymentCardName}>
                    {payment.fullName}
                  </h3>
                  <div className={styles.paymentCardContact}>
                    <span>
                      <FaEnvelope /> {payment.email}
                    </span>
                    <span>
                      <FaPhone /> {payment.phone}
                    </span>
                    <span>
                      <FaMapMarkerAlt /> {payment.city}, {payment.country}
                    </span>
                  </div>
                </div>

                <span
                  className={`${styles.statusBadge} ${
                    payment.paymentStatus === "approved"
                      ? styles.statusBadgeApproved
                      : payment.paymentStatus === "rejected"
                      ? styles.statusBadgeRejected
                      : styles.statusBadgeSubmitted
                  }`}
                >
                  {payment.paymentStatus}
                </span>
              </div>

              {/* Details */}
              <div className={styles.paymentCardDetails}>
                <div className={styles.paymentDetailItem}>
                  <span className={styles.paymentDetailLabel}>
                    Category
                  </span>
                  <span className={styles.paymentDetailValue}>
                    {payment.registrationCategory?.replace(/-/g, " ")}
                  </span>
                </div>
                <div className={styles.paymentDetailItem}>
                  <span className={styles.paymentDetailLabel}>
                    Payment Method
                  </span>
                  <span className={styles.paymentDetailValue}>
                    {payment.paymentMethod?.replace(/-/g, " ") || "N/A"}
                  </span>
                </div>
                <div className={styles.paymentDetailItem}>
                  <span className={styles.paymentDetailLabel}>
                    Uploaded
                  </span>
                  <span className={styles.paymentDetailValue}>
                    {formatDate(payment.receiptUploadedAt)}
                  </span>
                </div>
              </div>

              {/* Access Code (only if approved) */}
              {payment.paymentStatus === "approved" && payment.accessCode && (
                <div className={styles.accessCodeBox}>
                  <div className={styles.accessCodeInfo}>
                    <p className={styles.accessCodeLabel}>Access Code</p>
                    <p className={styles.accessCodeValue}>
                      {payment.accessCode}
                    </p>
                  </div>
                  <button
                    className={styles.accessCodeCopy}
                    onClick={() => copyCode(payment.accessCode)}
                  >
                    <FaCopy /> Copy
                  </button>
                </div>
              )}

              {/* Rejection reason (only if rejected) */}
              {payment.paymentStatus === "rejected" && payment.adminNote && (
                <div className={styles.rejectionReason}>
                  <p className={styles.rejectionReasonLabel}>
                    Rejection Reason
                  </p>
                  <p className={styles.rejectionReasonText}>
                    {payment.adminNote}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className={styles.paymentCardActions}>
                {(payment.receiptData || payment.receiptUrl) && (
                    <button
                      onClick={() => viewReceipt(payment._id)}
                      className={`${styles.actionButton} ${styles.actionView}`}
                    >
                      <FaFileAlt /> View Receipt <FaExternalLinkAlt />
                  </button>
                )}
                
                {payment.paymentStatus === "submitted" && (
                  <>
                    <button
                      className={`${styles.actionButton} ${styles.actionReject}`}
                      onClick={() => setRejectTarget(payment)}
                      disabled={processing === payment._id}
                    >
                      <FaTimes /> Reject
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.actionApprove}`}
                      onClick={() => handleApprove(payment._id)}
                      disabled={processing === payment._id}
                    >
                      {processing === payment._id ? (
                        "Approving..."
                      ) : (
                        <>
                          <FaCheck /> Approve
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <div
          className={styles.modalOverlay}
          onClick={() => !rejecting && setRejectTarget(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              <FaTimes />
            </div>

            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Reject Payment</h3>
              <p className={styles.modalText}>
                You're rejecting the payment from{" "}
                <strong>{rejectTarget.fullName}</strong>. Please provide a
                reason (this will be emailed to the attendee).
              </p>
            </div>

            <div className={styles.modalForm}>
              <textarea
                placeholder="e.g., Receipt is unclear. Please upload a clear screenshot of your payment confirmation."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className={styles.modalTextarea}
                autoFocus
              />
            </div>

            <div className={styles.modalActions}>
              <button
                className={`${styles.modalButton} ${styles.modalButtonCancel}`}
                onClick={() => {
                  setRejectTarget(null);
                  setRejectReason("");
                }}
                disabled={rejecting}
              >
                Cancel
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalButtonConfirm}`}
                onClick={handleReject}
                disabled={rejecting || !rejectReason.trim()}
              >
                {rejecting ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;