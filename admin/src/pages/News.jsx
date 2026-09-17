import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaNewspaper,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaUpload,
} from "react-icons/fa";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../services/api";
import styles from "../styles/News.module.css";
import { uploadImage } from "../services/api";

// Empty form template
const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Conference",
  country: "Nigeria",
  date: "",
  image: "",
  featured: false,
  published: true,
};

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);


  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate size
  if (file.size > 5 * 1024 * 1024) {
    alert("Image too large. Maximum 5MB.");
    return;
  }

  setUploadingImage(true);

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImage(formData);
    setFormData((prev) => ({ ...prev, image: response.data.url }));
  } catch (err) {
    console.error("Upload error:", err);
    alert("Failed to upload image.");
  } finally {
    setUploadingImage(false);
  }
};

  // ============================================================
  // Load news on mount
  // ============================================================
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await getNews();
      setNews(response.data.news || []);
    } catch (err) {
      console.error("Load news error:", err);
      setError("Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Open modal for create or edit
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
      excerpt: item.excerpt || "",
      content: item.content || "",
      category: item.category || "Conference",
      country: item.country || "Nigeria",
      date: item.date || "",
      image: item.image || "",
      featured: item.featured || false,
      published: item.published !== false,
    });
    setShowModal(true);
  };

  // ============================================================
  // Handle form submit (create or update)
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await updateNews(editingId, formData);
      } else {
        await createNews(formData);
      }

      setShowModal(false);
      setFormData(emptyForm);
      setEditingId(null);
      loadNews();
    } catch (err) {
      console.error("Save news error:", err);
      alert(err.response?.data?.message || "Failed to save news.");
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
      await deleteNews(deleteTarget._id);
      setDeleteTarget(null);
      loadNews();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete news.");
    } finally {
      setDeleting(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className={styles.newsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>News Management</h1>
          <p className={styles.pageSubtitle}>
            Manage news articles displayed on the public site
          </p>
        </div>

        <button className={styles.addButton} onClick={openCreate}>
          <FaPlus /> Add News
        </button>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className={styles.loadingState}>Loading news...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <h3>{error}</h3>
        </div>
      ) : news.length === 0 ? (
        <div className={styles.emptyState}>
          <FaNewspaper className={styles.emptyStateIcon} />
          <h3>No news yet</h3>
          <p>Add your first news article to get started.</p>
          <button className={styles.addButton} onClick={openCreate}>
            <FaPlus /> Add First News
          </button>
        </div>
      ) : (
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <div key={item._id} className={styles.newsCard}>
              <div className={styles.newsCardImageWrapper}>
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/400x250/1a2a4a/ffffff?text=News"
                  }
                  alt={item.title}
                  className={styles.newsCardImage}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250/1a2a4a/ffffff?text=News";
                  }}
                />

                <span className={styles.newsCardBadge}>{item.category}</span>

                {item.featured && (
                  <span
                    className={`${styles.newsCardBadge} ${styles.newsCardBadgeFeatured}`}
                    style={{ left: "auto", right: "0.75rem" }}
                  >
                    <FaStar /> Featured
                  </span>
                )}
              </div>

              <div className={styles.newsCardContent}>
                <h3 className={styles.newsCardTitle}>{item.title}</h3>
                <p className={styles.newsCardExcerpt}>{item.excerpt}</p>

                <div className={styles.newsCardMeta}>
                  <span className={styles.newsCardMetaItem}>
                    <FaMapMarkerAlt /> {item.country}
                  </span>
                  <span className={styles.newsCardMetaItem}>
                    <FaCalendarAlt /> {item.date}
                  </span>
                </div>

                <div className={styles.newsCardActions}>
                  <button
                    className={`${styles.newsCardButton} ${styles.newsCardButtonEdit}`}
                    onClick={() => openEdit(item)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className={`${styles.newsCardButton} ${styles.newsCardButtonDelete}`}
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
                {editingId ? "Edit News" : "Create News"}
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
                <label className={styles.formLabel}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                  placeholder="Enter news title"
                />
              </div>

              {/* Excerpt */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  required
                  placeholder="Short summary (shown on card)"
                  rows="3"
                />
              </div>

              {/* Content */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Full Content (Optional)
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Full article content"
                  rows="5"
                />
              </div>

              {/* Row: Category + Country */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="Conference">Conference</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Travel">Travel</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Announcement">Announcement</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>

              {/* Row: Date + Image */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="e.g. December 2026"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
  <label className={styles.formLabel}>News Image</label>
  
  {/* Preview */}
  {formData.image && (
    <img
      src={formData.image}
      alt="Preview"
      style={{
        width: "100%",
        height: "180px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "0.5rem",
      }}
      onError={(e) => (e.target.style.display = "none")}
    />
  )}

  {/* Upload button */}
  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
    <input
      type="file"
      id="news-image-upload"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: "none" }}
    />
    
    <label
      htmlFor="news-image-upload"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.7rem 1.5rem",
        background: "#f8f9fa",
        border: "2px dashed #b0b8c8",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.85rem",
        color: "#4a5a7a",
        fontWeight: "600",
        transition: "all 0.2s ease",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <FaUpload />
      {uploadingImage ? "Uploading..." : "Choose Image"}
    </label>

    {formData.image && (
      <button
        type="button"
        onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
        style={{
          padding: "0.7rem 1rem",
          background: "transparent",
          border: "2px solid #f8d7da",
          color: "#dc3545",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.8rem",
          fontFamily: "inherit",
        }}
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
              </div>

              {/* Checkboxes */}
              <div className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <label htmlFor="featured">
                  <span>⭐ Mark as Featured Story</span>
                </label>
              </div>

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
            <h3 className={styles.modalTitle}>Delete News?</h3>
            <p
              style={{
                color: "#7a8aaa",
                margin: "0.5rem 0 1.5rem",
                lineHeight: 1.6,
              }}
            >
              Are you sure you want to delete{" "}
              <strong style={{ color: "#1a2a4a" }}>"{deleteTarget.title}"</strong>
              ?
              <br />
              This action cannot be undone.
            </p>
            <div className={styles.modalActions} style={{ justifyContent: "center" }}>
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

export default News;