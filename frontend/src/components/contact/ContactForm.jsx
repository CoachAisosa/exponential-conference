import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaHandshake,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import styles from "../../pages/Contact.module.css";

function ContactForm() {
  return (
    <section
      id="contact-form"
      className={styles.contactFormSection}
      data-aos="fade-up"
    >

      <div className={styles.contactFormContainer}>

        {/* CONTACT INFORMATION */}

        <div
          className={styles.contactInformation}
          data-aos="fade-right"
        >

          <span className={styles.contactInformationLabel}>
            EXPONENTIAL CONFERENCE 2026
          </span>

          <h2 className={styles.contactInformationTitle}>
            WE ARE READY TO CONNECT
          </h2>

          <p className={styles.contactInformationDescription}>
            Whether you are planning to attend, bring a leadership team,
            partner with the conference, or simply want more information,
            we are ready to connect with you.
          </p>

          {/* CONFERENCE DETAILS */}

          <div className={styles.contactDetails}>

            <div className={styles.contactDetailItem}>

              <div className={styles.contactDetailIcon}>
                <FaMapMarkerAlt />
              </div>

              <div className={styles.contactDetailContent}>

                <span className={styles.contactDetailLabel}>
                  CONFERENCE VENUE
                </span>

                <h3>Dream City Christian Centre</h3>

                <p>
                  2, Ogiemwanye Avenue,
                  <br />
                  Off Nomayo, Upper Sakponba Road,
                  <br />
                  Benin City, Edo State, Nigeria.
                </p>

              </div>

            </div>

            <div className={styles.contactDetailItem}>

              <div className={styles.contactDetailIcon}>
                <FaPhone />
              </div>

              <div className={styles.contactDetailContent}>

                <span className={styles.contactDetailLabel}>
                  PHONE / WHATSAPP
                </span>

                <p>
                    +2348119271947 
                </p>

              </div>

            </div>

            <div className={styles.contactDetailItem}>

              <div className={styles.contactDetailIcon}>
                <FaEnvelope />
              </div>

              <div className={styles.contactDetailContent}>

                <span className={styles.contactDetailLabel}>
                  EMAIL
                </span>

                <p>
                    abuexpocon@gmail.com
                </p>

              </div>

            </div>

          </div>

          {/* PARTNERSHIP */}

          <div
            className={styles.contactPartnership}
            data-aos="fade-up"
          >

            <div className={styles.contactPartnershipIcon}>
              <FaHandshake />
            </div>

            <div className={styles.contactPartnershipContent}>

              <h3>
                PARTNERSHIP & SPONSORSHIP
              </h3>

              <p>
                Partner with the Exponential Conference and support the
                development of Christian leaders.
              </p>

              <a
                href="#contact-form"
                className={styles.contactPartnershipLink}
              >
                ENQUIRE ABOUT PARTNERSHIP
              </a>

            </div>

          </div>

          {/* SOCIAL MEDIA */}

          <div
            className={styles.contactSocials}
            data-aos="fade-up"
          >

            <h3 className={styles.contactSocialsTitle}>
              CONNECT WITH US
            </h3>

            <p className={styles.contactSocialsDescription}>
              Follow us for conference announcements, speaker updates,
              programme releases, registration information, videos,
              photographs, leadership insights, and live updates.
            </p>

            <div className={styles.contactSocialsLinks}>

              <a
                href="#"
                className={styles.contactSocialLink}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className={styles.contactSocialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className={styles.contactSocialLink}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className={styles.contactSocialLink}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

        </div>

        {/* MESSAGE FORM */}

        <div
          className={styles.contactFormWrapper}
          data-aos="fade-left"
        >

          <div className={styles.contactFormHeader}>

            <span className={styles.contactFormLabel}>
              SEND US A MESSAGE
            </span>

            <h2 className={styles.contactFormTitle}>
              How Can We Help You?
            </h2>

            <p className={styles.contactFormDescription}>
              Use the contact form below and a member of the conference
              team will respond to your enquiry.
            </p>

          </div>

          <form className={styles.contactForm} 
          name="contactForm"
          method="POST"
          data-netlify="true">

            {/* FULL NAME */}

            <div className={styles.contactFormGroup}>

              <label
                htmlFor="fullName"
                className={styles.contactFormLabelText}
              >
                <FaUser />
                FULL NAME
              </label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className={styles.contactFormInput}
                required
              />

            </div>

            {/* EMAIL */}

            <div className={styles.contactFormGroup}>

              <label
                htmlFor="email"
                className={styles.contactFormLabelText}
              >
                <FaEnvelope />
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className={styles.contactFormInput}
                required
              />

            </div>

            {/* PHONE */}

            <div className={styles.contactFormGroup}>

              <label
                htmlFor="phone"
                className={styles.contactFormLabelText}
              >
                <FaPhone />
                PHONE / WHATSAPP
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone or WhatsApp number"
                className={styles.contactFormInput}
              />

            </div>

            {/* SUBJECT */}

            <div className={styles.contactFormGroup}>

              <label
                htmlFor="subject"
                className={styles.contactFormLabelText}
              >
                SUBJECT
              </label>

              <select
                id="subject"
                name="subject"
                className={styles.contactFormSelect}
                defaultValue=""
                required
              >

                <option value="" disabled>
                  Select enquiry type
                </option>

                <option value="registration">
                  Registration
                </option>

                <option value="programme">
                  Programme
                </option>

                <option value="speakers">
                  Speakers
                </option>

                <option value="accommodation">
                  Accommodation
                </option>

                <option value="travel">
                  Travel
                </option>

                <option value="partnership">
                  Partnership
                </option>

                <option value="sponsorship">
                  Sponsorship
                </option>

                <option value="media">
                  Media
                </option>

                <option value="general-enquiry">
                  General Enquiry
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>

            {/* MESSAGE */}

            <div className={styles.contactFormGroup}>

              <label
                htmlFor="message"
                className={styles.contactFormLabelText}
              >
                YOUR MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Write your message here..."
                className={styles.contactFormTextarea}
                required
              ></textarea>

            </div>

            {/* SUBMIT */}

            <div className={styles.contactFormActions}>

              <button
                type="submit"
                className={styles.contactFormSubmitButton}
              >
                SEND MESSAGE
                <FaPaperPlane />
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* BOTTOM MESSAGE */}

      <div
        className={styles.contactBottomMessage}
        data-aos="fade-up"
      >

        <h2 className={styles.contactBottomTitle}>
          THE MULTIPLIER
        </h2>

        <p className={styles.contactBottomSubtitle}>
          Raising Leaders Who Multiply
        </p>

        <p className={styles.contactBottomDate}>
          9th–11th December 2026
        </p>

        <p className={styles.contactBottomScripture}>
          2 Timothy 2:2
        </p>

        <span className={styles.contactBottomTagline}>
          RECEIVE. DEVELOP. EMPOWER. MULTIPLY.
        </span>

      </div>

    </section>
  );
}

export default ContactForm;