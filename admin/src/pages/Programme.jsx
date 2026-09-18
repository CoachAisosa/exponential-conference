import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  getProgrammes,
  createProgramme,
  updateProgramme,
  deleteProgramme,
} from "../services/api";
import styles from "../styles/Programme.module.css";

const emptySession = {
  time: "",
  title: "",
  description: "",
  speaker: "",
  venue: "Main Auditorium",
};

const emptyForm = {
  day: 1,
  date: "",
  sessions: [{ ...emptySession }],
};

function Programme() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ============================================================
  // Load programmes on mount
  // ============================================================
  useEffect(() => {
    loadProgrammes();
  }, []);

  const loadProgrammes = async () => {
    try {
      setLoading(true);
      const response = await getProgrammes();
      const sorted = (response.data.programmes || []).sort(
        (a, b) => a.day - b.day
      );
      setDays(sorted);
    } catch (err) {
      console.error("Load programme error:", err);
      setError("Failed to load programme.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Open modal
  // ============================================================
  const openCreate = () => {
    const nextDay = days.length > 0 ? Math.max(...days.map((d) => d.day)) + 1 : 1;

    setEditingId(null);
    setFormData({
      day: nextDay,
      date: "",
      sessions: [{ ...emptySession }],
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      day: item.day || 1,
      date: item.date || "",
      sessions:
        item.sessions && item.sessions.length > 0
          ? item.sessions.map((s) => ({ ...s }))
          : [{ ...emptySession }],
    });
    setShowModal(true);
  };

  // ============================================================
  // Handle form submit
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate sessions
      const validSessions = formData.sessions.filter(
        (s) => s.time.trim() && s.title.trim()
      );

      if (validSessions.length === 0) {
        alert("Please add at least one session with time and title.");
        setSaving(false);
        return;
      }

      const payload = {
        day: Number(formData.day),
        date: formData.date,
        sessions: validSessions,
      };

      if (editingId) {
        await updateProgramme(editingId, payload);
      } else {
        await createProgramme(payload);
      }

      setShowModal(false);
      setFormData(emptyForm);
      setEditingId(null);
      loadProgrammes();
    } catch (err) {
      console.error("Save programme error:", err);
      alert(err.response?.data?.message || "Failed to save programme.");
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
      await deleteProgramme(deleteTarget._id);
      setDeleteTarget(null);
      loadProgrammes();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete programme.");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // Session editor handlers
  // ============================================================
  const handleSessionChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      sessions: prev.sessions.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  const addSession = () => {
    setFormData((prev) => ({
      ...prev,
      sessions: [...prev.sessions, { ...emptySession }],
    }));
  };

  const removeSession = (index) => {
    if (formData.sessions.length === 1) {
      alert("At least one session is required.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={styles.programmePage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Programme Management</h1>
          <p className={styles.pageSubtitle}>
            Manage conference schedule and sessions
          </p>
        </div>

        <button className={styles.addButton} onClick={openCreate}>
          <FaPlus /> Add Day
        </button>
      </div>

      {/* Days List */}
      {loading ? (
        <div className={styles.loadingState}>Loading programme...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <h3>{error}</h3>
        </div>
      ) : days.length === 0 ? (
        <div className={styles.emptyState}>
          <FaCalendarAlt className={styles.emptyStateIcon} />
          <h3>No programme yet</h3>
          <p>Add the first day to get started.</p>
          <button className={styles.addButton} onClick={openCreate}>
            <FaPlus /> Add First Day
          </button>
        </div>
      ) : (
        <div className={styles.daysList}>
          {days.map((day) => (
            <div key={day._id} className={styles.dayCard}>
              {/* Day Header */}
              <div className={styles.dayCardHeader}>
                <div className={styles.dayCardHeaderLeft}>
                  <span className={styles.dayCardNumber}>{day.day}</span>
                  <div className={styles.dayCardInfo}>
                    <h3>Day {day.day}</h3>
                    <p>{day.date}</p>
                  </div>
                </div>

                <div className={styles.dayCardActions}>
                  <button
                    className={`${styles.dayCardActionButton} ${styles.dayCardActionEdit}`}
                    onClick={() => openEdit(day)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className={`${styles.dayCardActionButton} ${styles.dayCardActionDelete}`}
                    onClick={() => setDeleteTarget(day)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>

              {/* Sessions */}
              <div className={styles.sessionsList}>
                {day.sessions && day.sessions.length > 0 ? (
                  day.sessions.map((session, idx) => (
                    <div key={idx} className={styles.sessionItem}>
                      <div className={styles.sessionTime}>
                        <FaClock /> {session.time}
                      </div>

                      <div className={styles.sessionContent}>
                        <h4 className={styles.sessionTitle}>
                          {session.title}
                        </h4>

                        {session.description && (
                          <p className={styles.sessionDescription}>
                            {session.description}
                          </p>
                        )}

                        <div className={styles.sessionMeta}>
                          {session.speaker && (
                            <span className={styles.sessionMetaItem}>
                              <FaUser /> {session.speaker}
                            </span>
                          )}
                          {session.venue && (
                            <span className={styles.sessionMetaItem}>
                              <FaMapMarkerAlt /> {session.venue}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.sessionsEmpty}>
                    No sessions yet for this day.
                  </p>
                )}
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
                {editingId ? "Edit Day" : "Add Day"}
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
              {/* Day + Date */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Day Number *</label>
                  <input
                    type="number"
                    value={formData.day}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        day: e.target.value,
                      }))
                    }
                    className={styles.formInput}
                    min="1"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date *</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className={styles.formInput}
                    placeholder="e.g. 9th December 2026"
                    required
                  />
                </div>
              </div>

              {/* Sessions Editor */}
              <div className={styles.sessionsEditor}>
                <div className={styles.sessionsEditorHeader}>
                  <h3 className={styles.sessionsEditorTitle}>
                    Sessions ({formData.sessions.length})
                  </h3>

                  <button
                    type="button"
                    className={styles.addSessionButton}
                    onClick={addSession}
                  >
                    <FaPlus /> Add Session
                  </button>
                </div>

                {formData.sessions.map((session, idx) => (
                  <div key={idx} className={styles.sessionEditorItem}>
                    <div className={styles.sessionEditorItemHeader}>
                      <span className={styles.sessionEditorItemNumber}>
                        Session {idx + 1}
                      </span>
                      <button
                        type="button"
                        className={styles.removeSessionButton}
                        onClick={() => removeSession(idx)}
                        title="Remove session"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Time + Venue */}
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Time *</label>
                        <input
                          type="text"
                          value={session.time}
                          onChange={(e) =>
                            handleSessionChange(idx, "time", e.target.value)
                          }
                          className={styles.formInput}
                          placeholder="e.g. 09:00 AM – 10:00 AM"
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Venue</label>
                        <input
                          type="text"
                          value={session.venue}
                          onChange={(e) =>
                            handleSessionChange(idx, "venue", e.target.value)
                          }
                          className={styles.formInput}
                          placeholder="e.g. Main Auditorium"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Title *</label>
                      <input
                        type="text"
                        value={session.title}
                        onChange={(e) =>
                          handleSessionChange(idx, "title", e.target.value)
                        }
                        className={styles.formInput}
                        placeholder="e.g. Opening Session: The Call to Multiply"
                        required
                      />
                    </div>

                    {/* Speaker */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Speaker</label>
                      <input
                        type="text"
                        value={session.speaker}
                        onChange={(e) =>
                          handleSessionChange(idx, "speaker", e.target.value)
                        }
                        className={styles.formInput}
                        placeholder="e.g. Prof. Julius Iyare"
                      />
                    </div>

                    {/* Description */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Description</label>
                      <textarea
                        value={session.description}
                        onChange={(e) =>
                          handleSessionChange(
                            idx,
                            "description",
                            e.target.value
                          )
                        }
                        className={styles.formTextarea}
                        placeholder="Short description of the session"
                        rows="2"
                      />
                    </div>
                  </div>
                ))}
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
            <h3 className={styles.modalTitle}>Delete Day {deleteTarget.day}?</h3>
            <p
              style={{
                color: "#7a8aaa",
                margin: "0.5rem 0 1.5rem",
                lineHeight: 1.6,
              }}
            >
              This will delete <strong>{deleteTarget.date}</strong> and all{" "}
              <strong>{deleteTarget.sessions?.length || 0} sessions</strong>{" "}
              inside it.
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

export default Programme;