import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import styles from './Navbar.module.css';
import exponcoLogo from "../assets/logos/ExponetialLogo.jpg";
import { useLanguage } from '../context/LanguageContext';
import { languages, translations } from '../i18n/translations';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { lang, setLang, t, otherLang } = useLanguage();
  const dropdownRef = useRef(null);

  // Nav items — each maps to a translation key
  const navItems = [
    { path: '/', key: 'home' },
    { path: '/about', key: 'about' },
    { path: '/speakers', key: 'speakers' },
    { path: '/programme', key: 'programme' },
    { path: '/register', key: 'registration' },
    { path: '/accommodation', key: 'accommodation' },
    { path: '/about-abu', key: 'aboutAbu' },
    { path: '/live', key: 'live' },
    { path: '/news', key: 'news' },
    { path: '/contact', key: 'contact' },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLanguageSelect = (newLang) => {
    setLang(newLang);
    setLangDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <div className={styles.navbarLogo}>
          <Link to="/" onClick={closeMenu}>
            <img
              src={exponcoLogo}
              alt="Exponential Conference 2026"
              className={styles.logoImage}
            />
            <div className={styles.logoText}>
              <h1>EXPONENTIAL CONFERENCE</h1>
              <p>Equipping Leaders</p>
            </div>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* Nav links */}
        <div className={`${styles.navbarLinks} ${menuOpen ? styles.open : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {/* Desktop: single language. Mobile: both stacked. */}
              <span className={styles.labelPrimary}>{t(item.key)}</span>
             <span className={styles.labelSecondary}>
                {languages[otherLang].flag} {translationsSecondary(item.key, otherLang)}
             </span>
            </NavLink>
          ))}

          {/* Language switcher — visible inside mobile menu */}
          <div className={styles.mobileLangSwitcher}>
            <LanguageSwitcher
              lang={lang}
              onSelect={handleLanguageSelect}
              variant="inline"
            />
          </div>

          {/* Mobile CTA */}
          <Link
            to="/register"
            onClick={closeMenu}
            className={styles.mobileRegisterBtn}
          >
            {t('registerNow')}
          </Link>
        </div>

        {/* Desktop actions */}
        <div className={styles.navbarActions}>
          {/* Language dropdown — desktop */}
          <div className={styles.langDropdownWrapper} ref={dropdownRef}>
            <button
              className={styles.langButton}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Change language"
            >
              <FaGlobe />
              <span>{languages[lang].short}</span>
              <FaChevronDown
                className={`${styles.langChevron} ${
                  langDropdownOpen ? styles.langChevronOpen : ""
                }`}
              />
            </button>

            {langDropdownOpen && (
              <div className={styles.langDropdown}>
                {Object.entries(languages).map(([code, info]) => (
                  <button
                    key={code}
                    className={`${styles.langOption} ${
                      code === lang ? styles.langOptionActive : ""
                    }`}
                    onClick={() => handleLanguageSelect(code)}
                  >
                    <span>{info.flag}</span>
                    <span>{info.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop CTA */}
          <Link to="/register" onClick={closeMenu} className={styles.registerBtn}>
            {t('registerNow')}
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Helper: get the secondary translation (for mobile stacked view)
const translationsSecondary = (key, langCode) =>
  translations[langCode]?.[key] || "";

// Reusable language switcher (used in mobile menu)
function LanguageSwitcher({ lang, onSelect, variant }) {
  return (
    <div className={`${styles.langSwitcher} ${styles[variant]}`}>
      {Object.entries(languages).map(([code, info]) => (
        <button
          key={code}
          className={`${styles.langSwitcherBtn} ${
            code === lang ? styles.langSwitcherBtnActive : ""
          }`}
          onClick={() => onSelect(code)}
        >
          {info.flag} {info.short}
        </button>
      ))}
    </div>
  );
}

export default Navbar;