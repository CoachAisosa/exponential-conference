import { useState, useEffect } from "react";
import {
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaReply,
  FaInbox,
  FaTimes,
} from "react-icons/fa";
import { getContacts, deleteContact } from "../services/api";
import styles from "../styles/Contacts.module.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ============================================================
  // Load contacts on mount
  // ============================================================
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await getContacts();
      setContacts(response.data.contacts || []);
    } catch (err) {
      console.error("Load contacts error:", err);
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Handle delete
  // ============================================================
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteContact(deleteTarget._id);
      setContacts((prev) =>
        prev.filter((c) => c._id !== deleteTarget._id)
      );
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete contact.");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // Filter contacts
  // ============================================================
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      !search ||
      contact.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      contact.email?.toLowerCase().includes(search.toLowerCase()) ||
      contact.message?.toLowerCase().includes(search.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      !subjectFilter || contact.subject === subjectFilter;

    return matchesSearch && matchesSubject;
  });

  // ============================================================
  // Format date
  // ============================================================
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============================================================
  // Human-readable subject
  // ============================================================
  const formatSubject = (subject) => {
    return (subject || "general").replace(/-/g, " ");
  };

  return (
    <div className={styles.contactsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Contact Messages</h1>
          <p className={styles.pageSubtitle}>
            Messages sent through the website contact form
          </p>
        </div>

        <div className={styles.messageCount}>
          Total Messages
          <span className={styles.messageCountNumber}>
            {contacts.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Search</label>
          <div className={styles.filterInputWrapper}>
            <FaSearch className={styles.filterSearchIcon} />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Subject</label>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Subjects</option>
            <option value="registration">Registration</option>
            <option value="programme">Programme</option>
            <option value="speakers">Speakers</option>
            <option value="accommodation">Accommodation</option>
            <option value="travel">Travel</option>
            <option value="partnership">Partnership</option>
            <option value="sponsorship">Sponsorship</option>
            <option value="media">Media</option>
            <option value="general-enquiry">General Enquiry</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className={styles.loadingState}>Loading messages...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <h3>{error}</h3>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className={styles.emptyState}>
          <FaInbox className={styles.emptyStateIcon} />
          <h3>
            {search || subjectFilter
              ? "No matching messages"
              : "No messages yet"}
          </h3>
          <p>
            {search || subjectFilter
              ? "Try adjusting your filters."
              : "Contact form submissions will appear here."}
          </p>
        </div>
      ) : (
        <div className={styles.messagesList}>
          {filteredContacts.map((contact) => (
            <div key={contact._id} className={styles.messageCard}>
              {/* Header */}
              <div className={styles.messageHeader}>
                <div className={styles.messageSender}>
                  <h3 className={styles.messageName}>{contact.fullName}</h3>

                  <div className={styles.messageContact}>
                    <span className={styles.messageContactItem}>
                      <FaEnvelope />
                      <a href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </span>

                    {contact.phone && contact.phone !== "N/A" && (
                      <span className={styles.messageContactItem}>
                        <FaPhone />
                        <a href={`tel:${contact.phone}`}>
                          {contact.phone}
                        </a>
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.messageMeta}>
                  <span className={styles.messageDate}>
                    {formatDate(contact.createdAt)}
                  </span>
                  <span className={styles.messageSubjectBadge}>
                    {formatSubject(contact.subject)}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className={styles.messageBody}>
                <p className={styles.messageBodyText}>{contact.message}</p>
              </div>

              {/* Actions */}
              <div className={styles.messageActions}>
                <a
                  href={`mailto:${contact.email}?subject=Re: ${formatSubject(
                    contact.subject
                  )}`}
                  className={`${styles.messageActionButton} ${styles.messageActionReply}`}
                >
                  <FaReply /> Reply
                </a>

                <button
                  className={`${styles.messageActionButton} ${styles.messageActionDelete}`}
                  onClick={() => setDeleteTarget(contact)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
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

            <h3 className={styles.modalTitle}>Delete Message?</h3>

            <p className={styles.modalText}>
              Are you sure you want to delete the message from{" "}
              <strong>{deleteTarget.fullName}</strong>?
              <br />
              This action cannot be undone.
            </p>

            <div className={styles.modalActions}>
              <button
                className={`${styles.modalButton} ${styles.modalButtonCancel}`}
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalButtonConfirm}`}
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

export default Contacts;