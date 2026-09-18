import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCalendarAlt,
  FaCheck,
  FaPowerOff,
  FaInbox,
} from "react-icons/fa";
import {
  getAllConferences,
  createConference,
  updateConference,
  deleteConference,
} from "../services/api";
import styles from "../styles/Settings.module.css";

const emptyForm = {
  year: new Date().getFullYear() + 1,
  theme: "",
  subtitle: "Raising Leaders Who Multiply",
  date: "",
  venue: "",
  address: "",
  city: "Benin City",
  state: "Edo State",
  country: "Nigeria",
  registrationOpen: true,
  description: "",
  isActive: false,
};

function Settings() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ============================================================
  // Load conferences
  // ============================================================
  useEffect(() => {
    loadConferences();
  }, []);

  const loadConferences = async () => {
    try {
      setLoading(true);
      const response = await getAllConferences();
      const sorted = (response.data.conferences || []).sort(
        (a, b) => b.year - a.year
      );
      setConferences(sorted);
    } catch (err) {
      console.error("Load conferences error:", err);
      setError("Failed to load conference settings.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Open modal
  // ============================================================
  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      year: item.year || new Date().getFullYear(),
      theme: item.theme || "",
      subtitle: item.subtitle || "Raising Leaders Who Multiply",
      date: item.date || "",
      venue: item.venue || "",
      address: item.address || "",
      city: item.city || "Benin City",
      state: item.state || "Edo State",
      country: item.country || "Nigeria",
      registrationOpen: item.registrationOpen !== false,
      description: item.description || "",
      isActive: item.isActive || false,
    });
    setShowModal(true);
  };

  // ============================================================
  // Handle submit
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        year: Number(formData.year),
      };

      if (editingId) {
        await updateConference(editingId, payload);
      } else {
        await createConference(payload);
      }

      setShowModal(false);
      setFormData(emptyForm);
      setEditingId(null);
      loadConferences();
    } catch (err) {
      console.error("Save conference error:", err);
      alert(err.response?.data?.message || "Failed to save conference.");
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
      await deleteConference(deleteTarget._id);
      setDeleteTarget(null);
      loadConferences();
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete conference.");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // Handle activate (make this conference the active one)
  // ============================================================
  const handleActivate = async (conf) => {
    if (conf.isActive) return;

    if (
      !window.confirm(
        `Make ${conf.year} (${conf.theme}) the ACTIVE conference?\n\nThe public website will show this conference's data.`
      )
    ) {
      return;
    }

    try {
      // Deactivate all others first
      const others = conferences.filter(
        (c) => c._id !== conf._id && c.isActive
      );

      for (const other of others) {
        await updateConference(other._id, { isActive: false });
      }

      // Activate this one
      await updateConference(conf._id, { isActive: true });
      loadConferences();
    } catch (err) {
      console.error("Activate error:", err);
      alert("Failed to activate conference.");
    }
  };

  // ============================================================
  // Handle form input changes
  // ============================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className={styles.settingsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Conference Settings</h1>
          <p className={styles.pageSubtitle}>
            Manage yearly conference details. Only one can be active at a time.
          </p>
        </div>

        <button className={styles.addButton} onClick={openCreate}>
          <FaPlus /> Add Conference
        </button>
      </div>

      {/* Conferences List */}
      {loading ? (
        <div className={styles.loadingState}>Loading settings...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <h3>{error}</h3>
        </div>
      ) : conferences.length === 0 ? (
        <div className={styles.emptyState}>
          <FaCalendarAlt className={styles.emptyStateIcon} />
          <h3>No conference settings yet</h3>
          <p>Add your first conference year to get started.</p>
          <button className={styles.addButton} onClick={openCreate}>
            <FaPlus /> Create First Conference
          </button>
        </div>
      ) : (
        <div className={styles.confList}>
          {conferences.map((conf) => (
            <div
              key={conf._id}
              className={`${styles.confCard} ${
                conf.isActive ? styles.confCardActive : ""
              }`}
            >
              {/* Header */}
              <div className={styles.confCardHeader}>
                <div className={styles.confCardYear}>
                  <span
                    className={`${styles.confYearBadge} ${
                      conf.isActive ? styles.confYearBadgeActive : ""
                    }`}
                  >
                    {conf.year}
                  </span>
                  <div className={styles.confTitle}>
                    <h3 className={styles.confTheme}>{conf.theme}</h3>
                    <p className={styles.confSubtitle}>{conf.subtitle}</p>
                  </div>
                </div>

                <div className={styles.confStatusBadges}>
                  {conf.isActive ? (
                    <span
                      className={`${styles.statusBadge} ${styles.statusBadgeActive}`}
                    >
                      <FaCheck /> Active
                    </span>
                  ) : (
                    <span
                      className={`${styles.statusBadge} ${styles.statusBadgeInactive}`}
                    >
                      <FaPowerOff /> Inactive
                    </span>
                  )}

                  <span
                    className={`${styles.statusBadge} ${
                      conf.registrationOpen
                        ? styles.statusBadgeOpen
                        : styles.statusBadgeClosed
                    }`}
                  >
                    {conf.registrationOpen
                      ? "Registration Open"
                      : "Registration Closed"}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className={styles.confDetails}>
                <div className={styles.confDetailItem}>
                  <span className={styles.confDetailLabel}>Date</span>
                  <span className={styles.confDetailValue}>{conf.date}</span>
                </div>
                <div className={styles.confDetailItem}>
                  <span className={styles.confDetailLabel}>Venue</span>
                  <span className={styles.confDetailValue}>{conf.venue}</span>
                </div>
                <div className={styles.confDetailItem}>
                  <span className={styles.confDetailLabel}>Location</span>
                  <span className={styles.confDetailValue}>
                    {conf.city}, {conf.country}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.confActions}>
                {!conf.isActive && (
                  <button
                    className={`${styles.confActionButton} ${styles.confActionActivate}`}
                    onClick={() => handleActivate(conf)}
                  >
                    <FaCheck /> Set Active
                  </button>
                )}

                <button
                  className={`${styles.confActionButton} ${styles.confActionEdit}`}
                  onClick={() => openEdit(conf)}
                >
                  <FaEdit /> Edit
                </button>

                <button
                  className={`${styles.confActionButton} ${styles.confActionDelete}`}
                  onClick={() => setDeleteTarget(conf)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => !saving && setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingId ? "Edit Conference" : "Add Conference"}
              </h2>
              <button
                className={styles.modalClose}
                onClick={() => setShowModal(false)}
                disabled={saving}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              {/* Year + Theme */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Year *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={styles.formInput}
                    min="2000"
                    max="2100"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Theme *</label>
                  <input
                    type="text"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="e.g. THE MULTIPLIER"
                    required
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. Raising Leaders Who Multiply"
                />
              </div>

              {/* Date + Venue */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date *</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="e.g. 9th–11th December 2026"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Venue *</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="e.g. Dream City Christian Centre"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Street address"
                />
              </div>

              {/* City + State + Country */}
              <div className={styles.formRow3}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Description */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Brief description of this year's conference"
                  rows="3"
                />
              </div>

              {/* Registration Open */}
              <div className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  id="registrationOpen"
                  name="registrationOpen"
                  checked={formData.registrationOpen}
                  onChange={handleChange}
                />
                <label htmlFor="registrationOpen">
                  <span>🎫 Registration is open for this conference</span>
                </label>
              </div>

              {/* Active */}
              <div className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label htmlFor="isActive">
                  <span>
                    ⭐ Make this the ACTIVE conference (shown on website)
                  </span>
                </label>
              </div>

              <p className={styles.formCheckboxHint}>
                ⚠️ Only one conference can be active at a time. Activating
                this one will deactivate others.
              </p>

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
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
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
              Delete Conference?
            </h3>

            <p className={styles.modalText}>
              Are you sure you want to delete{" "}
              <strong>
                {deleteTarget.year} — {deleteTarget.theme}
              </strong>
              ?
              <br />
              This action cannot be undone.
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

export default Settings;