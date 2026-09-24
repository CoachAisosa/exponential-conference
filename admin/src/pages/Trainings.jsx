import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaVideo,
  FaPlay,
  FaCheckCircle,
  FaClock,
  FaYoutube,
} from "react-icons/fa";
import {
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  activateTraining,
} from "../services/api";
import styles from "../styles/Trainings.module.css";

const emptyForm = {
  title: "",
  description: "",
  youtubeId: "",
  scheduledAt: "",
  order: 0,
  published: true,
};

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [activatingId, setActivatingId] = useState(null);

  // ============================================================
  // Load trainings
  // ============================================================
  const loadTrainings = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getTrainings();
      setTrainings(response.data.trainings || []);
    } catch (err) {
      console.error("Load trainings error:", err);
      setError("Failed to load trainings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainings();
  }, []);

  // ============================================================
  // Open create / edit
  // ============================================================
  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      youtubeId: item.youtubeId || "",
      scheduledAt: item.scheduledAt
        ? new Date(item.scheduledAt).toISOString().slice(0, 16)
        : "",
      order: item.order || 0,
      published: item.published !== false,
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
        scheduledAt: formData.scheduledAt || null,
      };

      if (editingId) {
        await updateTraining(editingId, payload);
      } else {
        await createTraining(payload);
      }

      setShowModal(false);
      setFormData(emptyForm);
      setEditingId(null);
      loadTrainings();
    } catch (err) {
      console.error("Save training error:", err);
      alert(err.response?.data?.message || "Failed to save training.");
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // Handle activate (set as LIVE)
  // ============================================================
  const handleActivate = async (id) => {
    if (
      !window.confirm(
        "Set this training as LIVE? Any currently live training will be marked as completed."
      )
    ) {
      return;
    }

    try {
      setActivatingId(id);
      await activateTraining(id);
      loadTrainings();
    } catch (err) {
      console.error("Activate error:", err);
      alert(err.response?.data?.message || "Failed to activate training.");
    } finally {
      setActivatingId(null);
    }
  };

  // ============================================================
  // Handle delete
  // ============================================================
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteTraining(deleteTarget._id);
      setDeleteTarget(null);
      loadTrainings();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete training.");
    } finally {
      setDeleting(false);
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

  // ============================================================
  // Helpers
  // ============================================================
  const formatDate = (date) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status) => {
    if (status === "live") return styles.statusBadgeLive;
    if (status === "completed") return styles.statusBadgeCompleted;
    return styles.statusBadgeUpcoming;
  };

  const getStatusIcon = (status) => {
    if (status === "live") return <FaPlay />;
    if (status === "completed") return <FaCheckCircle />;
    return <FaClock />;
  };

  return (
    <div className={styles.trainingsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Live Trainings</h1>
          <p className={styles.pageSubtitle}>
            Manage YouTube live sessions for the conference
          </p>
        </div>

        <button className={styles.addButton} onClick={openCreate}>
          <FaPlus /> Add Training
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className={styles.loadingState}>Loading trainings...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <h3>{error}</h3>
        </div>
      ) : trainings.length === 0 ? (
        <div className={styles.emptyState}>
          <FaVideo className={styles.emptyStateIcon} />
          <h3>No trainings yet</h3>
          <p>Add your first training session to get started.</p>
          <button className={styles.addButton} onClick={openCreate}>
            <FaPlus /> Add First Training
          </button>
        </div>
      ) : (
        <div className={styles.trainingsGrid}>
          {trainings.map((item) => (
            <div
              key={item._id}
              className={`${styles.trainingCard} ${
                item.status === "live" ? styles.trainingCardLive : ""
              }`}
            >
              <div className={styles.trainingCardHeader}>
                <span
                  className={`${styles.statusBadge} ${getStatusBadgeClass(
                    item.status
                  )}`}
                >
                  {getStatusIcon(item.status)}
                  {item.status.toUpperCase()}
                </span>

                {!item.published && (
                  <span className={styles.draftBadge}>Draft</span>
                )}
              </div>

              <h3 className={styles.trainingCardTitle}>{item.title}</h3>

              {item.description && (
                <p className={styles.trainingCardDescription}>
                  {item.description}
                </p>
              )}

              <div className={styles.trainingCardMeta}>
                <div className={styles.metaRow}>
                  <FaYoutube className={styles.metaIcon} />
                  <span className={styles.metaValue}>
                    {item.youtubeId || "No ID"}
                  </span>
                </div>

                <div className={styles.metaRow}>
                  <FaClock className={styles.metaIcon} />
                  <span className={styles.metaValue}>
                    {formatDate(item.scheduledAt)}
                  </span>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Order:</span>
                  <span className={styles.metaValue}>{item.order}</span>
                </div>
              </div>

              <div className={styles.trainingCardActions}>
                {item.status !== "live" && (
                  <button
                    className={`${styles.actionButton} ${styles.actionActivate}`}
                    onClick={() => handleActivate(item._id)}
                    disabled={activatingId === item._id}
                  >
                    <FaPlay />
                    {activatingId === item._id ? "Activating..." : "Set Live"}
                  </button>
                )}

                <button
                  className={`${styles.actionButton} ${styles.actionEdit}`}
                  onClick={() => openEdit(item)}
                >
                  <FaEdit /> Edit
                </button>

                <button
                  className={`${styles.actionButton} ${styles.actionDelete}`}
                  onClick={() => setDeleteTarget(item)}
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
                {editingId ? "Edit Training" : "Add Training"}
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
              {/* Title */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. Training 1 — Multiplication Foundations"
                  required
                />
              </div>

              {/* YouTube ID */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>YouTube Live ID *</label>
                <input
                  type="text"
                  name="youtubeId"
                  value={formData.youtubeId}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. DpIV3Tg6jHI"
                  required
                />
                <small className={styles.formHint}>
                  The video ID from the YouTube watch URL (the part after
                  <code>v=</code>). Do NOT paste the full URL, and never paste
                  a stream key.
                </small>
              </div>

              {/* Description */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Short description of this session"
                  rows="3"
                />
              </div>

              {/* Scheduled At + Order */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Scheduled Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Display Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className={styles.formInput}
                    min="0"
                  />
                </div>
              </div>

              {/* Published */}
              <div className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                />
                <label htmlFor="published">
                  <span>✅ Publish (visible to attendees)</span>
                </label>
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
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "420px", textAlign: "center" }}
          >
            <FaTrash
              style={{
                fontSize: "3rem",
                color: "#dc3545",
                margin: "0 auto 1rem",
                display: "block",
              }}
            />
            <h3 className={styles.modalTitle}>Delete Training?</h3>
            <p
              style={{
                color: "#7a8aaa",
                margin: "0.5rem 0 1.5rem",
                lineHeight: 1.6,
              }}
            >
              Are you sure you want to delete{" "}
              <strong style={{ color: "#1a2a4a" }}>
                "{deleteTarget.title}"
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

export default Trainings;