import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa";

import styles from "./Footer.module.css";
import abuLogo from "../assets/logos/abuLogo.png"

function Footer() {
  return (
    <footer className={styles.footer}>

      {/* MAIN FOOTER */}

      <div className={styles.footerMain}>

        <div className={styles.footerContainer}>

          {/* EXPONENTIAL CONFERENCE BRAND */}

          <div
            className={styles.footerBrand}
            data-aos="fade-up"
          >

            <Link
              to="/"
              className={styles.footerLogo}
            >
              EXPONENTIAL
              <span>CONFERENCE</span>
            </Link>

            <p className={styles.footerYear}>
              2026
            </p>

            <h2 className={styles.footerTheme}>
              THE MULTIPLIER
            </h2>

            <p className={styles.footerSubtitle}>
              Raising Leaders Who Multiply
            </p>

            <p className={styles.footerDescription}>
              A strategic gathering of pastors, ministers, church leaders,
              Christian educators, emerging leaders, mentors, and believers
              committed to developing people and multiplying Kingdom impact.
            </p>

          </div>


          {/* QUICK LINKS */}

          <div
            className={styles.footerLinks}
            data-aos="fade-up"
          >

            <h3 className={styles.footerColumnTitle}>
              QUICK LINKS
            </h3>

            <ul className={styles.footerLinksList}>

              <li>
                <Link to="/">
                  HOME
                </Link>
              </li>

              <li>
                <Link to="/about">
                  ABOUT
                </Link>
              </li>

              <li>
                <Link to="/speaker">
                  SPEAKERS
                </Link>
              </li>

              <li>
                <Link to="/program">
                  PROGRAMME
                </Link>
              </li>

              <li>
                <Link to="/register">
                  REGISTRATION
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  CONTACT
                </Link>
              </li>

            </ul>

          </div>


          {/* CONFERENCE DETAILS */}

          <div
            className={styles.footerDetails}
            data-aos="fade-up"
          >

            <h3 className={styles.footerColumnTitle}>
              CONFERENCE DETAILS
            </h3>

            <div className={styles.footerDetailItem}>

              <FaMapMarkerAlt />

              <p>
                Dream City Christian Centre
                <br />
                2, Ogiemwanye Avenue,
                <br />
                Off Nomayo, Upper Sakponba Road,
                <br />
                Benin City, Edo State, Nigeria.
              </p>

            </div>

            <div className={styles.footerDetailItem}>

              <FaEnvelope />

              <p>
                abuexpocon@gmail.com
              </p>

            </div>

            <div className={styles.footerDetailItem}>

              <FaPhone />

              <p>
                +2348119271947 <br /> 
                +2348062854749
              </p>

            </div>

          </div>


          {/* REGISTER CTA */}

          <div
            className={styles.footerCTA}
            data-aos="fade-up"
          >

            <h3 className={styles.footerColumnTitle}>
              BECOME A MULTIPLIER
            </h3>

            <p className={styles.footerCTADescription}>
              Don't just attend. Come ready to receive, develop,
              empower, and multiply.
            </p>

            <Link
              to="/register"
              className={styles.footerCTAButton}
            >
              REGISTER NOW
              <FaArrowRight />
            </Link>

            <p className={styles.footerDate}>
              9th–11th December 2026
            </p>

          </div>

        </div>

      </div>


      {/* ABU SECTION */}

      <div
        className={styles.footerABU}
        data-aos="fade-up"
      >

        <div className={styles.footerABUContainer}>

          {/* ABU LOGO + INFORMATION */}

          <div className={styles.footerABUContent}>

            <div className={styles.footerABULogoWrapper}>

              <Link to="/">

                <img
                  src={abuLogo}
                  alt="Apostolos Bible University International"
                  className={styles.footerABULogo}
                />

              </Link>

            </div>

            <div className={styles.footerABUInfo}>

              <span className={styles.footerABULabel}>
                ORGANIZED BY
              </span>

              <h3 className={styles.footerABUTitle}>
                APOSTOLOS BIBLE UNIVERSITY INTERNATIONAL
              </h3>

              <p className={styles.footerABUTagline}>
                Training for Effective Ministry Work
              </p>

              <p className={styles.footerABUDescription}>
                Apostolos Bible University International is committed to
                biblical education, ministerial training, leadership
                development, and equipping men and women for effective
                Kingdom service.
              </p>

            </div>

          </div>


          {/* ABU SOCIALS */}

          <div
            className={styles.footerSocials}
            data-aos="fade-up"
          >

            <h3 className={styles.footerSocialsTitle}>
              CONNECT WITH ABU
            </h3>

            <p className={styles.footerSocialsDescription}>
              Follow Apostolos Bible University International through
              its official communication platforms.
            </p>

            <div className={styles.footerSocialLinks}>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={styles.footerSocialLink}
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={styles.footerSocialLink}
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className={styles.footerSocialLink}
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className={styles.footerSocialLink}
              >
                <FaWhatsapp />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={styles.footerSocialLink}
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM FOOTER */}

      <div className={styles.footerBottom}>

        <div className={styles.footerBottomContainer}>

          <p className={styles.footerCopyright}>
            © 2026 Exponential Conference. All Rights Reserved.
          </p>

          <div className={styles.footerBottomLinks}>

            <Link to="/about">
              About
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>

          <p className={styles.footerCredit}>
            Organized by Apostolos Bible University International
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;