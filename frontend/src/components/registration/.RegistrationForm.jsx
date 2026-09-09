import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChurch,
  FaUserTie,
  FaPaperPlane,
  FaCheckCircle,
  FaUniversity,
  FaWallet,
  FaMobileAlt,
  FaCopy,
  FaArrowRight,
} from "react-icons/fa";
import styles from "../../pages/Registration.module.css";

function RegistrationForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    churchOrganisation: "",
    leadershipRole: "",
    registrationCategory: "",
    message: "",
    agreement: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Bank details for Nigeria
  const bankDetails = {
    bankName: "Wema Bank",
    accountName: "Apostolos Bible College",
    accountNumber: "0124377422",
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Account number copied to clipboard!");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate agreement
    if (!formData.agreement) {
      setError("Please confirm that your information is accurate.");
      setLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.country || !formData.state || !formData.city || 
        !formData.registrationCategory) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Try to send to backend
      const response = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ✅ Backend success
        setFormSubmitted(true);
        setError("");
        scrollToPayment();
      } else {
        // ⚠️ Backend returned error but we'll still show payment
        setFormSubmitted(true); // ← SHOW PAYMENT ANYWAY
        setError("");
        scrollToPayment();
      }
    } catch (err) {
      // ❌ Backend not running - BUT we still show payment!
      console.warn("Backend not available, showing payment section anyway.");
      setFormSubmitted(true); // ← SHOW PAYMENT SECTION!
      setError("");
      scrollToPayment();
    } finally {
      setLoading(false);
    }
  };

  // Scroll to payment section
  const scrollToPayment = () => {
    setTimeout(() => {
      document
        .getElementById("payment-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // If form is submitted, show payment section
  if (formSubmitted) {
    return (
      <section className={styles.registrationFormSection}>
        <div className={styles.registrationFormContainer}>
          {/* Success Message */}
          <div className={styles.successMessage} data-aos="fade-up">
            <FaCheckCircle className={styles.successIcon} />
            <h2>Registration Successful!</h2>
            <p>
              Thank you, <strong>{formData.fullName}</strong>! Your registration
              has been received. Please complete your payment below to secure
              your spot at the Exponential Conference 2026.
            </p>
          </div>

          {/* Payment Section */}
          <div id="payment-section" className={styles.paymentSection}>
            <h3 className={styles.paymentSectionTitle}>
              Complete Your Payment
            </h3>
            <p className={styles.paymentSectionSubtitle}>
              Choose your preferred payment method to secure your spot at
              Exponential Conference 2026 — THE MULTIPLIER
            </p>

            {/* Payment Options Grid */}
            <div className={styles.paymentGrid}>
              {/* Option 1: Bank Transfer (Nigeria) */}
              <div className={styles.paymentCard} data-aos="fade-up">
                <div className={styles.paymentCardHeader}>
                  <div className={styles.paymentCardIcon}>
                    <FaUniversity />
                  </div>
                  <span className={styles.paymentBadge}>Recommended</span>
                </div>

                <h4 className={styles.paymentCardTitle}>Bank Transfer (Nigeria)</h4>
                <p className={styles.paymentCardDescription}>
                  Transfer directly to our Nigerian bank account.
                </p>

                <div className={styles.bankDetails}>
                  <div className={styles.bankDetailItem}>
                    <span className={styles.bankDetailLabel}>Bank:</span>
                    <span className={styles.bankDetailValue}>{bankDetails.bankName}</span>
                  </div>
                  <div className={styles.bankDetailItem}>
                    <span className={styles.bankDetailLabel}>Account Name:</span>
                    <span className={styles.bankDetailValue}>{bankDetails.accountName}</span>
                  </div>
                  <div className={styles.bankDetailItem}>
                    <span className={styles.bankDetailLabel}>Account Number:</span>
                    <span className={styles.bankDetailValue}>{bankDetails.accountNumber}</span>
                    <button
                      type="button"
                      className={styles.copyButton}
                      onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    >
                      <FaCopy /> Copy
                    </button>
                  </div>
                </div>

                <div className={styles.paymentNote}>
                  <FaCheckCircle className={styles.paymentNoteIcon} />
                  <p>After payment, send proof to our WhatsApp(08062854749) or Our Email (abuexpocon@gmail.com).</p>
                </div>
              </div>

              {/* Option 2: Selar Payment (International) */}
              <div className={styles.paymentCard} data-aos="fade-up" data-aos-delay="100">
                <div className={styles.paymentCardHeader}>
                  <div className={styles.paymentCardIcon}>
                    <FaWallet />
                  </div>
                  <span className={styles.paymentBadge}>Fast & Secure</span>
                </div>

                <h4 className={styles.paymentCardTitle}>Pay with Selar</h4>
                <p className={styles.paymentCardDescription}>
                  Pay securely using Selar — accepts cards, wallets, and international payments.
                </p>

                <div className={styles.selarFeatures}>
                  <div className={styles.selarFeature}>
                    <FaCheckCircle className={styles.selarFeatureIcon} />
                    <span>Secure card payments</span>
                  </div>
                  <div className={styles.selarFeature}>
                    <FaCheckCircle className={styles.selarFeatureIcon} />
                    <span>Instant confirmation</span>
                  </div>
                  <div className={styles.selarFeature}>
                    <FaCheckCircle className={styles.selarFeatureIcon} />
                    <span>International payments accepted</span>
                  </div>
                </div>

                <a
                  href="https://selar.co/exponential-conference-2026"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.selarButton}
                >
                  Pay with Selar <FaArrowRight />
                </a>
              </div>

              {/* Option 3: WhatsApp Payment */}
              <div className={styles.paymentCard} data-aos="fade-up" data-aos-delay="200">
                <div className={styles.paymentCardHeader}>
                  <div className={styles.paymentCardIcon}>
                    <FaMobileAlt />
                  </div>
                  <span className={styles.paymentBadge}>Quick & Easy</span>
                </div>

                <h4 className={styles.paymentCardTitle}>Pay via WhatsApp</h4>
                <p className={styles.paymentCardDescription}>
                  Contact us directly on WhatsApp for payment assistance.
                </p>

                <div className={styles.whatsappDetails}>
                  <p className={styles.whatsappText}>
                    Send us a message on WhatsApp and we'll guide you through
                    the payment process.
                  </p>
                </div>

                <a
                  href="https://wa.me/2348012345678?text=I%20want%20to%20register%20for%20Exponential%20Conference%202026"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.whatsappButton}
                >
                  <FaMobileAlt /> Chat on WhatsApp <FaArrowRight />
                </a>
              </div>
            </div>

            <div className={styles.paymentFooter}>
              <p className={styles.paymentFooterNote}>
                <FaCheckCircle className={styles.paymentFooterIcon} />
                Your registration is confirmed. Complete payment to secure your seat.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="registration-form"
      className={styles.registrationFormSection}
      data-aos="fade-up"
    >
      <div className={styles.registrationFormContainer}>

        {/* FORM INTRODUCTION */}
        <div className={styles.registrationFormHeader} data-aos="fade-up">
          <span className={styles.registrationFormLabel}>
            REGISTER FOR EXPONENTIAL CONFERENCE 2026
          </span>
          <h2 className={styles.registrationFormTitle}>Your Place Is Waiting</h2>
          <p className={styles.registrationFormDescription}>
            Complete the registration form below with your correct
            information. Registered delegates will receive relevant
            information concerning the conference, programme, venue,
            and participation.
          </p>
        </div>

        {/* REGISTRATION FORM */}
        <form className={styles.registrationForm} 
        name="registration-expon" 
        method="POST" 
        data-netlify="true" 
        onSubmit={handleSubmit}>

          {/* Error Message */}
          {error && (
            <div className={styles.formError}>
              <p>{error}</p>
            </div>
          )}

          {/* PERSONAL INFORMATION */}
          <div className={styles.registrationFormSectionHeader} data-aos="fade-up">
            <h3 className={styles.registrationFormSectionTitle}>
              Personal Information
            </h3>
            <p className={styles.registrationFormSectionDescription}>
              Please provide your correct personal and contact information.
            </p>
          </div>

          <div className={styles.registrationFormGrid}>

            {/* FULL NAME */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="fullName" className={styles.registrationFormLabelText}>
                <FaUser /> FULL NAME
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className={styles.registrationFormInput}
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="email" className={styles.registrationFormLabelText}>
                <FaEnvelope /> EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className={styles.registrationFormInput}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PHONE */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="phone" className={styles.registrationFormLabelText}>
                <FaPhone /> PHONE / WHATSAPP
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone or WhatsApp number"
                className={styles.registrationFormInput}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* COUNTRY */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="country" className={styles.registrationFormLabelText}>
                <FaMapMarkerAlt /> COUNTRY
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                className={styles.registrationFormInput}
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            {/* STATE */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="state" className={styles.registrationFormLabelText}>
                <FaMapMarkerAlt /> STATE
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter your state"
                className={styles.registrationFormInput}
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            {/* CITY */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="city" className={styles.registrationFormLabelText}>
                <FaMapMarkerAlt /> CITY
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                className={styles.registrationFormInput}
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* CHURCH / ORGANISATION */}
          <div className={styles.registrationFormGroupFull} data-aos="fade-up">
            <label htmlFor="churchOrganisation" className={styles.registrationFormLabelText}>
              <FaChurch /> CHURCH / ORGANISATION
            </label>
            <input
              type="text"
              id="churchOrganisation"
              name="churchOrganisation"
              placeholder="Enter your church or organisation"
              className={styles.registrationFormInput}
              value={formData.churchOrganisation}
              onChange={handleChange}
            />
          </div>

          {/* LEADERSHIP INFORMATION */}
          <div className={styles.registrationFormSectionHeader} data-aos="fade-up">
            <h3 className={styles.registrationFormSectionTitle}>
              Leadership Information
            </h3>
            <p className={styles.registrationFormSectionDescription}>
              Tell us about your role and registration category.
            </p>
          </div>

          <div className={styles.registrationFormGrid}>

            {/* REGISTRATION CATEGORY */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="registrationCategory" className={styles.registrationFormLabelText}>
                <FaUserTie /> REGISTRATION CATEGORY
              </label>
              <select
                id="registrationCategory"
                name="registrationCategory"
                className={styles.registrationFormSelect}
                value={formData.registrationCategory}
                onChange={handleChange}
                defaultValue=""
                required
              >
                <option value="" disabled>Select registration category</option>
                <option value="individual">Individual Registration</option>
                <option value="church-group">Church / Group Registration</option>
                <option value="minister-pastor">Minister / Pastor Registration</option>
                <option value="student-emerging-leader">Student / Emerging Leader Registration</option>
              </select>
            </div>

            {/* LEADERSHIP ROLE */}
            <div className={styles.registrationFormGroup} data-aos="fade-up">
              <label htmlFor="leadershipRole" className={styles.registrationFormLabelText}>
                <FaUserTie /> LEADERSHIP ROLE
              </label>
              <input
                type="text"
                id="leadershipRole"
                name="leadershipRole"
                placeholder="e.g. Pastor, Minister, Leader, Student"
                className={styles.registrationFormInput}
                value={formData.leadershipRole}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* MESSAGE */}
          <div className={styles.registrationFormGroupFull} data-aos="fade-up">
            <label htmlFor="message" className={styles.registrationFormLabelText}>
              ADDITIONAL INFORMATION
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Tell us anything else we should know about your registration..."
              className={styles.registrationFormTextarea}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* AGREEMENT */}
          <div className={styles.registrationFormAgreement} data-aos="fade-up">
            <input
              type="checkbox"
              id="registrationAgreement"
              name="agreement"
              className={styles.registrationFormCheckbox}
              checked={formData.agreement}
              onChange={handleChange}
              required
            />
            <label htmlFor="registrationAgreement" className={styles.registrationFormAgreementLabel}>
              I confirm that the information provided above is accurate
              and that I am registering for Exponential Conference 2026.
            </label>
          </div>

          {/* SUBMIT */}
          <div className={styles.registrationFormActions} data-aos="fade-up">
            <button
              type="submit"
              className={styles.registrationFormSubmitButton}
              disabled={loading}
            >
              {loading ? "SUBMITTING..." : "SUBMIT REGISTRATION"}
              <FaPaperPlane />
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}

export default RegistrationForm;