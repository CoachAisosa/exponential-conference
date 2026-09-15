import { useState } from "react";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "../../pages/Registration.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function ReceiptUpload({ registrationId, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file size (5MB max)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum 5MB.");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setError("Only JPG, PNG, and PDF files are allowed.");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file) {
      setError("Please select a receipt file.");
      setLoading(false);
      return;
    }

    if (!registrationId) {
      setError("Registration ID not found. Please register again.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("receipt", file);
      formData.append("paymentMethod", paymentMethod);

      const response = await fetch(
        `${API_URL}payments/upload-receipt/${registrationId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Upload response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      setSuccess(true);
      setError("");
      if (onUploadSuccess) onUploadSuccess(data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.uploadSuccess}>
        <FaCheckCircle className={styles.uploadSuccessIcon} />
        <h3>Receipt Uploaded!</h3>
        <p>
          Your payment is being reviewed. You'll receive an access code via
          email once approved.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.uploadSection}>
      <h3 className={styles.uploadTitle}>Upload Payment Receipt</h3>
      <p className={styles.uploadSubtitle}>
        After completing payment, upload your receipt here for verification.
      </p>

      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        {/* Payment Method */}
        <div className={styles.uploadGroup}>
          <label className={styles.uploadLabel}>Payment Method Used</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className={styles.uploadSelect}
            required
          >
            <option value="bank-transfer">Bank Transfer</option>
            <option value="selar">Selar</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        {/* File Upload */}
        <div className={styles.uploadGroup}>
          <label className={styles.uploadLabel}>
            Receipt File (JPG, PNG, or PDF - Max 5MB)
          </label>
          <div className={styles.uploadFileWrapper}>
            <input
              type="file"
              id="receipt-upload"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className={styles.uploadFileInput}
            />
            <label htmlFor="receipt-upload" className={styles.uploadFileLabel}>
              <FaUpload /> {file ? file.name : "Choose File"}
            </label>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className={styles.uploadError}>
            <FaTimesCircle /> {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className={styles.uploadButton}
          disabled={loading || !file}
        >
          {loading ? "UPLOADING..." : "UPLOAD RECEIPT"}
          <FaUpload />
        </button>
      </form>
    </div>
  );
}

export default ReceiptUpload;