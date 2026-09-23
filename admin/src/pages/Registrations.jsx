import { useState, useEffect } from "react";
import {
  FaSearch,
  FaTrash,
  FaEye,
  FaDownload,
  FaInbox,
  FaExclamationTriangle,
} from "react-icons/fa";
import { getRegistrations, deleteRegistration } from "../services/api";
import styles from "../styles/Registrations.module.css";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ============================================================
  // Fetch registrations with debounce (500ms after typing stops)
  // ============================================================
  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (country) params.country = country;

        const response = await getRegistrations(params);
        setRegistrations(response.data.registrations);
        setCurrentPage(1); // Reset to page 1 on filter change
      } catch (err) {
        console.error("Fetch registrations error:", err);
        setError("Failed to load registrations.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, category, country]);

  // ============================================================
  // Delete registration
  // ============================================================
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteRegistration(deleteTarget._id);

      // Remove from local state
      setRegistrations((prev) =>
        prev.filter((r) => r._id !== deleteTarget._id)
      );

      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete registration.");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // Export to CSV
  // ============================================================
  const handleExport = () => {
    if (registrations.length === 0) {
      alert("No registrations to export.");
      return;
    }

    // CSV headers
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Country",
      "State",
      "City",
      "Church/Organisation",
      "Leadership Role",
      "Category",
      "Attendance",
      "Message",
      "Payment Status",
      "Registered At",
    ];

    // CSV rows
    const rows = registrations.map((r) => [
      r.fullName,
      r.email,
      r.phone,
      r.country,
      r.state,
      r.city,
      r.churchOrganisation || "N/A",
      r.leadershipRole || "N/A",
      r.registrationCategory,
      r.attendanceType || "N/A",
      r.message || "N/A",
      r.paymentStatus || "pending",
      new Date(r.createdAt).toLocaleString(),
    ]);

    // Build CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `exponential-registrations-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ============================================================
  // Pagination logic
  // ============================================================
  const totalPages = Math.ceil(registrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = registrations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ============================================================
  // Category badge class
  // ============================================================
  const getCategoryClass = (cat) => {
    const map = {
      individual: styles.categoryBadgeIndividual,
      "church-group": styles.categoryBadgeChurchGroup,
      "minister-pastor": styles.categoryBadgeMinisterPastor,
      "student-emerging-leader": styles.categoryBadgeStudent,
    };
    return map[cat] || "";
  };

  return (
    <div className={styles.registrationsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Registrations</h1>
          <p className={styles.pageSubtitle}>
            Manage all conference registrations
          </p>
        </div>

        <button className={styles.exportButton} onClick={handleExport}>
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Search</label>
          <div className={styles.filterInputWrapper}>
            <FaSearch className={styles.filterSearchIcon} />
            <input
              type="text"
              placeholder="Search by name, email, phone, or church..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Categories</option>
            <option value="individual">Individual</option>
            <option value="church-group">Church / Group</option>
            <option value="minister-pastor">Minister / Pastor</option>
            <option value="student-emerging-leader">Student / Emerging</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Country</label>
          <input
            type="text"
            placeholder="Filter by country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={styles.filterInput}
            style={{ paddingLeft: "1rem" }}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className={styles.loadingState}>Loading registrations...</div>
      ) : error ? (
        <div className={styles.emptyState}>
          <FaExclamationTriangle className={styles.emptyStateIcon} />
          <h3>{error}</h3>
        </div>
      ) : registrations.length === 0 ? (
        <div className={styles.emptyState}>
          <FaInbox className={styles.emptyStateIcon} />
          <h3>No registrations found</h3>
          <p>
            {search || category || country
              ? "Try adjusting your filters."
              : "Registrations will appear here once people start signing up."}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <span className={styles.tableCount}>
                Showing <strong>{currentItems.length}</strong> of{" "}
                <strong>{registrations.length}</strong> registrations
              </span>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Category</th>
                  <th>Attendance</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((reg) => (
                  <tr key={reg._id}>
                    <td className={styles.cellName}>{reg.fullName}</td>
                    <td className={styles.cellEmail}>{reg.email}</td>
                    <td className={styles.cellPhone}>{reg.phone}</td>
                    <td>{reg.country}</td>
                    <td>
                      <span
                        className={`${styles.categoryBadge} ${getCategoryClass(
                          reg.registrationCategory
                        )}`}
                      >
                        {reg.registrationCategory?.replace(/-/g, " ")}
                      </span>
                    </td>
                    
                    <td>
                      <span
                        className={
                           reg.attendanceType === "online"
                                 ? styles.attendanceBadgeOnline
                                 : styles.attendanceBadgePhysical
                                  }
                      >
                         {reg.attendanceType === "online" ? "Online" : "Physical"}
                     </span>
                   </td>

                    <td>
                      <div className={styles.actionsCell}>
                        <button
                          className={styles.actionButton}
                          title="View"
                          onClick={() =>
                            alert(`View: ${reg.fullName}\n${reg.email}`)
                          }
                        >
                          <FaEye />
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                          title="Delete"
                          onClick={() => setDeleteTarget(reg)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`${styles.paginationButton} ${
                      currentPage === page ? styles.paginationButtonActive : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className={styles.paginationButton}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
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
            <h3 className={styles.modalTitle}>Delete Registration?</h3>
            <p className={styles.modalText}>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.fullName}</strong>'s registration? This
              action cannot be undone.
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

export default Registrations;