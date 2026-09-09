import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import exponcoLogo from "../assets/logos/ExponetialLogo.jpg"



function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Logo / Brand Section */}
        <div className={styles.navbarLogo}>
          <Link to="/" onClick={closeMenu}>
            <img
              src={exponcoLogo}
              alt="Exponential Conference 2026"
              className={styles.logoImage}
            />
            <div className={styles.logoText}>
              <h1>EXPONENTIAL CONFERENCE</h1>
              <p>THE MULTIPLIER</p>
            </div>
          </Link>
        </div>

        {/* Hamburger Menu Toggle */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* Navigation Links */}
        <div className={`${styles.navbarLinks} ${menuOpen ? styles.open : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/speakers" onClick={closeMenu}>Speakers</Link>
          <Link to="/programme" onClick={closeMenu}>Programme</Link>
          <Link to="/register" onClick={closeMenu}>Registration</Link>
          <Link to="/about-abu"onClick={closeMenu}>About ABU</Link>
          <Link to="/live" onClick={closeMenu}>Live Event</Link>
          <Link to="/news" onClick={closeMenu}>News& Stories</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </div>

        {/* Registration CTA */}
        <div className={`${styles.navbarAction} ${menuOpen ? styles.open : ""}`}>
          <Link to="/register" onClick={closeMenu} className={styles.registerBtn}>
            REGISTER NOW
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;