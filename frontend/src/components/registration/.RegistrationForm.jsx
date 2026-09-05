import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChurch,
  FaUserTie,
  FaPaperPlane,
} from "react-icons/fa";

import styles from "../../pages/Registration.module.css";

function RegistrationForm() {
  return (
    <section
      id="registration-form"
      className={styles.registrationFormSection}
      data-aos="fade-up"
    >
      <div className={styles.registrationFormContainer}>

        {/* FORM INTRODUCTION */}

        <div
          className={styles.registrationFormHeader}
          data-aos="fade-up"
        >
          <span className={styles.registrationFormLabel}>
            REGISTER FOR EXPONENTIAL CONFERENCE 2026
          </span>

          <h2 className={styles.registrationFormTitle}>
            Your Place Is Waiting
          </h2>

          <p className={styles.registrationFormDescription}>
            Complete the registration form below with your correct
            information. Registered delegates will receive relevant
            information concerning the conference, programme, venue,
            and participation.
          </p>
        </div>

        {/* REGISTRATION FORM */}

        <form
          className={styles.registrationForm}
        >

          {/* PERSONAL INFORMATION */}

          <div
            className={styles.registrationFormSectionHeader}
            data-aos="fade-up"
          >
            <h3 className={styles.registrationFormSectionTitle}>
              Personal Information
            </h3>

            <p className={styles.registrationFormSectionDescription}>
              Please provide your correct personal and contact information.
            </p>
          </div>

          <div className={styles.registrationFormGrid}>

            {/* FULL NAME */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="fullName"
                className={styles.registrationFormLabelText}
              >
                <FaUser />
                FULL NAME
              </label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className={styles.registrationFormInput}
                required
              />
            </div>

            {/* EMAIL */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="email"
                className={styles.registrationFormLabelText}
              >
                <FaEnvelope />
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className={styles.registrationFormInput}
                required
              />
            </div>

            {/* PHONE */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="phone"
                className={styles.registrationFormLabelText}
              >
                <FaPhone />
                PHONE / WHATSAPP
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone or WhatsApp number"
                className={styles.registrationFormInput}
                required
              />
            </div>

            {/* COUNTRY */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="country"
                className={styles.registrationFormLabelText}
              >
                <FaMapMarkerAlt />
                COUNTRY
              </label>

              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                className={styles.registrationFormInput}
                required
              />
            </div>

            {/* STATE */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="state"
                className={styles.registrationFormLabelText}
              >
                <FaMapMarkerAlt />
                STATE
              </label>

              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter your state"
                className={styles.registrationFormInput}
                required
              />
            </div>

            {/* CITY */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="city"
                className={styles.registrationFormLabelText}
              >
                <FaMapMarkerAlt />
                CITY
              </label>

              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                className={styles.registrationFormInput}
                required
              />
            </div>

          </div>

          {/* CHURCH / ORGANISATION */}

          <div
            className={styles.registrationFormGroupFull}
            data-aos="fade-up"
          >
            <label
              htmlFor="churchOrganisation"
              className={styles.registrationFormLabelText}
            >
              <FaChurch />
              CHURCH / ORGANISATION
            </label>

            <input
              type="text"
              id="churchOrganisation"
              name="churchOrganisation"
              placeholder="Enter your church or organisation"
              className={styles.registrationFormInput}
            />
          </div>

          {/* LEADERSHIP INFORMATION */}

          <div
            className={styles.registrationFormSectionHeader}
            data-aos="fade-up"
          >
            <h3 className={styles.registrationFormSectionTitle}>
              Leadership Information
            </h3>

            <p className={styles.registrationFormSectionDescription}>
              Tell us about your role and registration category.
            </p>
          </div>

          <div className={styles.registrationFormGrid}>

            {/* REGISTRATION CATEGORY */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="registrationCategory"
                className={styles.registrationFormLabelText}
              >
                <FaUserTie />
                REGISTRATION CATEGORY
              </label>

              <select
                id="registrationCategory"
                name="registrationCategory"
                className={styles.registrationFormSelect}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select registration category
                </option>

                <option value="individual">
                  Individual Registration
                </option>

                <option value="church-group">
                  Church / Group Registration
                </option>

                <option value="minister-pastor">
                  Minister / Pastor Registration
                </option>

                <option value="student-emerging-leader">
                  Student / Emerging Leader Registration
                </option>
              </select>
            </div>

            {/* LEADERSHIP ROLE */}

            <div
              className={styles.registrationFormGroup}
              data-aos="fade-up"
            >
              <label
                htmlFor="leadershipRole"
                className={styles.registrationFormLabelText}
              >
                <FaUserTie />
                LEADERSHIP ROLE
              </label>

              <input
                type="text"
                id="leadershipRole"
                name="leadershipRole"
                placeholder="e.g. Pastor, Minister, Leader, Student"
                className={styles.registrationFormInput}
              />
            </div>

          </div>

          {/* MESSAGE */}

          <div
            className={styles.registrationFormGroupFull}
            data-aos="fade-up"
          >
            <label
              htmlFor="message"
              className={styles.registrationFormLabelText}
            >
              ADDITIONAL INFORMATION
            </label>

            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Tell us anything else we should know about your registration..."
              className={styles.registrationFormTextarea}
            ></textarea>
          </div>

          {/* AGREEMENT */}

          <div
            className={styles.registrationFormAgreement}
            data-aos="fade-up"
          >
            <input
              type="checkbox"
              id="registrationAgreement"
              name="registrationAgreement"
              className={styles.registrationFormCheckbox}
              required
            />

            <label
              htmlFor="registrationAgreement"
              className={styles.registrationFormAgreementLabel}
            >
              I confirm that the information provided above is accurate
              and that I am registering for Exponential Conference 2026.
            </label>
          </div>

          {/* SUBMIT */}

          <div
            className={styles.registrationFormActions}
            data-aos="fade-up"
          >
            <button
              type="submit"
              className={styles.registrationFormSubmitButton}
            >
              SUBMIT REGISTRATION
              <FaPaperPlane />
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}

export default RegistrationForm;