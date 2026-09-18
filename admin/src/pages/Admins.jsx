import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaTimes,
  FaUserShield,
  FaUser,
  FaStar,
  FaBan,
} from "react-icons/fa";
import {
  getAllAdmins,
  createAdmin,
  deleteAdmin,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Admins.module.css";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "admin",
};

function Admins() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ============================================================
  // Load admins on mount
  // ============================================================
  useEffect(() => {
    if (currentUser?.role === "superadmin") {
      loadAdmins();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const response = await getAllAdmins();
      setAdmins(response.data.admins || []);
    } catch (err) {
      console.error("Load admins error:", err);
      setError("Failed to load admins.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Guard: only superadmin can access
  // ============================================================
  if (currentUser?.role !== "superadmin") {
    return (
      <div className={styles.adminsPage}>
        <div className={styles.accessDenied}>
          <FaBan className={styles.accessDeniedIcon} />
          <h3>Access Denied</h3>
          <p>Only superadmins can manage admin users.</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // Handle create
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await createAdmin(formData);
      setShowModal(false);
      setFormData(emptyForm);
      loadAdmins();
    } catch (err) {
      console.error("Create admin error:", err);
      alert(err.response?.data?.message || "Failed to create admin.");
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // Handle delete
  // ============================================================
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteAdmin(deleteTarget._id);
      setAdmins((prev) => prev.filter((a) => a._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete admin.");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // Handle input changes
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================================
  // Helpers
  // ============================================================
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isYou = (admin) => admin._id === currentUser?.id;

  const isLastSuperadmin = (admin) => {
    if (admin.role !== "superadmin") return false;
    const superadminCount = admins.filter(
      (a) => a.role === "superadmin"
    ).length;
    return superadminCount <= 1;
  };

  const canDelete = (admin) => !isYou(admin) && !isLastSuperadmin(admin);

  return (
    <div className={styles.adminsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Admin Users</h1>
          <p className={styles.pageSubtitle}>
            Manage who can access the admin dashboard
          </p>
        </div>

        <button
          className={styles.addButton}
          onClick={() => {
            setFormData(emptyForm);
            setShowModal(true);
          }}
        >
          <FaPlus /> Add Admin
        </button>
      </div>

      {/* Admins List */}
      {loading ? (
        <div className={styles.loadingState}>Loading admins...</div>
      ) : error ? (
        <div className={styles.accessDenied}>
          <h3>{error}</h3>
        </div>
      ) : (
        <div className={styles.adminsList}>
          {admins.map((admin) => (
            <div
              key={admin._id}
              className={`${styles.adminCard} ${
                admin.role === "superadmin" ? styles.adminCardSuperadmin : ""
              } ${isYou(admin) ? styles.adminCardYou : ""}`}
            >
              {/* Avatar */}
              <div
                className={`${styles.adminAvatar} ${
                  admin.role === "superadmin"
                    ? styles.adminAvatarSuperadmin
                    : ""
                }`}
              >
                {getInitials(admin.name)}
              </div>

              {/* Info */}
              <div className={styles.adminInfo}>
                <div className={styles.adminNameRow}>
                  <h3 className={styles.adminName}>{admin.name}</h3>

                  <span
                    className={`${styles.adminRoleBadge} ${
                      admin.role === "superadmin"
                        ? styles.adminRoleBadgeSuperadmin
                        : styles.adminRoleBadgeAdmin
                    }`}
                  >
                    {admin.role === "superadmin" ? (
                      <>
                        <FaStar /> Superadmin
                      </>
                    ) : (
                      <>
                        <FaUser /> Admin
                      </>
                    )}
                  </span>

                  {isYou(admin) && (
                    <span className={styles.adminYouBadge}>You</span>
                  )}
                </div>

                <p className={styles.adminEmail}>{admin.email}</p>
                <p className={styles.adminDate}>
                  Added {formatDate(admin.createdAt)}
                </p>
              </div>

              {/* Actions */}
              <div className={styles.adminActions}>
                {canDelete(admin) ? (
                  <button
                    className={styles.deleteButton}
                    onClick={() => setDeleteTarget(admin)}
                  >
                    <FaTrash /> Delete
                  </button>
                ) : (
                  <span className={styles.deleteButtonDisabledLabel}>
                    {isYou(admin)
                      ? "Cannot delete your own account"
                      : "Cannot delete last superadmin"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => !saving && setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Add Admin</h2>
              <button
                className={styles.modalClose}
                onClick={() => setShowModal(false)}
                disabled={saving}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              {/* Name */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="admin@exponential.com"
                  required
                />
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Minimum 6 characters"
                  minLength="6"
                  required
                />
                <p className={styles.formHint}>
                  Password will be hashed before storage
                </p>
              </div>

              {/* Role */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={styles.formSelect}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
                <p className={styles.formHint}>
                  Superadmins can manage other admins
                </p>
              </div>

              {/* Actions */}
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={`${styles.modalButton} ${styles.modalButtonCancel}`}
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${styles.modalButton} ${styles.modalButtonSave}`}
                  disabled={saving}
                >
                  {saving ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div
          className={styles.modalOverlay}
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              <FaTrash />
            </div>

            <h3 className={styles.modalTitle} style={{ textAlign: "center" }}>
              Delete Admin?
            </h3>

            <p className={styles.modalText}>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>'s admin account?
              <br />
              They will no longer be able to access the dashboard.
            </p>

            <div
              className={styles.modalActions}
              style={{ justifyContent: "center" }}
            >
              <button
                className={`${styles.modalButton} ${styles.modalButtonCancel}`}
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalButtonDelete}`}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admins;