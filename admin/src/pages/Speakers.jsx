import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaMicrophone,
  FaUpload,
} from "react-icons/fa";
import {
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
  uploadImage,
} from "../services/api";
import styles from "../styles/Speakers.module.css";

// ✅ Local placeholder — no external service needed
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%231a2a4a'/%3E%3Ctext x='50%25' y='50%25' fill='%23e87a2a' font-family='Arial' font-size='24' text-anchor='middle' dominant-baseline='middle'%3ESpeaker%3C/text%3E%3C/svg%3E";

// ✅ Shared helper — turns position keyword into CSS object-position value
const getObjectPosition = (position) => {
  switch (position) {
    case "top":
      return "center 0%";
    case "upper":
      return "center 20%";
    case "center":
      return "center 50%";
    case "lower":
      return "center 75%";
    case "bottom":
      return "center 100%";
    default:
      return "center 20%";
  }
};

const emptyForm = {
  name: "",
  title: "",
  role: "Conference Speaker",
  image: "",
  imagePosition: "upper",
  bio: "",
  focus: "",
  order: 0,
  published: true,
};

function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ============================================================
  // Load speakers
  // ============================================================
  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      setLoading(true);
      const response = await getSpeakers();
      setSpeakers(response.data.speakers || []);
    } catch (err) {
      console.error("Load speakers error:", err);
      setError("Failed to load speakers.");
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
      name: item.name || "",
      title: item.title || "",
      role: item.role || "Conference Speaker",
      image: item.image || "",
      imagePosition: item.imagePosition || "upper",
      bio: item.bio || "",
      focus: item.focus || "",
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

     console.log("📤 SUBMITTING:", JSON.stringify(formData, null, 2)); 

    try {
      if (editingId) {
        await updateSpeaker(editingId, formData);
      } else {
        await createSpeaker(formData);
      }

      setShowModal(false);
      setFormData(emptyForm);
      setEditingId(null);
      loadSpeakers();
    } catch (err) {
      console.error("Save speaker error:", err);
      alert(err.response?.data?.message || "Failed to save speaker.");
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
      await deleteSpeaker(deleteTarget._id);
      setDeleteTarget(null);
      loadSpeakers();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete speaker.");
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
  // Handle image upload to Cloudinary
  // ============================================================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large. Maximum 5MB.");
      return;
    }

    setUploadingImage(true);

    try {
      const formDataFile = new FormData();
      formDataFile.append("image", file);

      const response = await uploadImage(formDataFile);
      setFormData((prev) => ({ ...prev, image: response.data.url }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className={styles.speakersPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Speakers Management</h1>
          <p className={styles.pageSubtitle}>
            Manage conference speakers and their profiles
          </p>
        </div>

        <button className={styles.addButton} onClick={openCreate}>
          <FaPlus /> Add Speaker
        </button>
      </div>

      {/* Speakers Grid */}
      {loading ? (
        <div className={styles.loadingState}>Loading speakers...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <h3>{error}</h3>
        </div>
      ) : speakers.length === 0 ? (
        <div className={styles.emptyState}>
          <FaMicrophone className={styles.emptyStateIcon} />
          <h3>No speakers yet</h3>
          <p>Add your first speaker to get started.</p>
          <button className={styles.addButton} onClick={openCreate}>
            <FaPlus /> Add First Speaker
          </button>
        </div>
      ) : (
        <div className={styles.speakersGrid}>
          {speakers.map((item) => (
            <div key={item._id} className={styles.speakerCard}>
              <div className={styles.speakerCardImageWrapper}>
                <img
                  src={item.image || PLACEHOLDER_IMAGE}
                  alt={item.name}
                  className={styles.speakerCardImage}
                  style={{
                    objectPosition: getObjectPosition(item.imagePosition),
                  }}
                  onError={(e) => {
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
                <span className={styles.speakerCardOrder}>
                  Order: {item.order || 0}
                </span>
              </div>

              <div className={styles.speakerCardContent}>
                <span className={styles.speakerCardRole}>{item.role}</span>
                <h3 className={styles.speakerCardName}>{item.name}</h3>
                <p className={styles.speakerCardTitle}>{item.title}</p>
                <p className={styles.speakerCardBio}>{item.bio}</p>

                {item.focus && (
                  <div className={styles.speakerCardFocus}>
                    <span className={styles.speakerCardFocusLabel}>
                      Conference Focus
                    </span>
                    <p className={styles.speakerCardFocusText}>
                      {item.focus}
                    </p>
                  </div>
                )}

                <div className={styles.speakerCardActions}>
                  <button
                    className={`${styles.speakerCardButton} ${styles.speakerCardButtonEdit}`}
                    onClick={() => openEdit(item)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className={`${styles.speakerCardButton} ${styles.speakerCardButtonDelete}`}
                    onClick={() => setDeleteTarget(item)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
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
                {editingId ? "Edit Speaker" : "Add Speaker"}
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
              {/* Name */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. PROF. JULIUS OYENGBOWMAN IYARE"
                  required
                />
              </div>

              {/* Title */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title / Position *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. Chancellor, ABU"
                  required
                />
              </div>

              {/* Role + Order */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="e.g. Convener, Conference Speaker"
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

              {/* Image Upload */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Speaker Image</label>

                {/* ✅ Preview uses formData, not item */}
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className={styles.imagePreview}
                    style={{
                      objectPosition: getObjectPosition(
                        formData.imagePosition
                      ),
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}

                <div className={styles.imageUploadRow}>
                  <input
                    type="file"
                    id="speaker-image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />

                  <label
                    htmlFor="speaker-image-upload"
                    className={styles.imageUploadLabel}
                  >
                    <FaUpload />
                    {uploadingImage ? "Uploading..." : "Choose Image"}
                  </label>

                  {formData.image && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: "" }))
                      }
                      className={styles.imageRemoveButton}
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Manual URL fallback */}
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Or paste image URL here..."
                  style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}
                />
              </div>

              {/* Image Position */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Image Crop Position</label>
                <select
                  name="imagePosition"
                  value={formData.imagePosition}
                  onChange={handleChange}
                  className={styles.formSelect}
                >
                  <option value="top">Top (face very high in photo)</option>
                  <option value="upper">
                    Upper (recommended for headshots)
                  </option>
                  <option value="center">Center (face in middle)</option>
                  <option value="lower">Lower (face low in photo)</option>
                  <option value="bottom">Bottom (full-body shot)</option>
                </select>
                <small style={{ color: "#7a8aaa", fontSize: "0.75rem" }}>
                  Controls how the image is cropped on the public speaker card.
                </small>
              </div>

              {/* Bio */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Biography *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Short biography highlighting ministry experience, leadership, and expertise."
                  rows="5"
                  required
                />
              </div>

              {/* Focus */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Conference Focus / Topic
                </label>
                <input
                  type="text"
                  name="focus"
                  value={formData.focus}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. Raising Leaders Who Multiply"
                />
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
                  <span>✅ Publish (visible on site)</span>
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
                  disabled={saving || uploadingImage}
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
            <h3 className={styles.modalTitle}>Delete Speaker?</h3>
            <p
              style={{
                color: "#7a8aaa",
                margin: "0.5rem 0 1.5rem",
                lineHeight: 1.6,
              }}
            >
              Are you sure you want to delete{" "}
              <strong style={{ color: "#1a2a4a" }}>
                "{deleteTarget.name}"
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

export default Speakers;