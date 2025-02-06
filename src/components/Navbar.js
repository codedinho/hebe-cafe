import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Choose the appropriate logo based on the current route.
  const logoSrc =
    location.pathname === "/"
      ? `${process.env.PUBLIC_URL}/images/logo/Hebe_Brand_Assets_Lockup_Horizontal_Oyster.png`
      : `${process.env.PUBLIC_URL}/images/logo/Hebe_Brand_Assets_Lockup_Horizontal_Main.png`;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    // If not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Give the home page a little time to mount
      setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Close mobile menu after clicking (if open)
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <nav
      className={`${styles.navbar} ${
        location.pathname === "/" ? styles.transparent : ""
      }`}
    >
      {/* Desktop Navigation */}
      <div className={styles.desktopMenu}>
        {/* Logo container always exists */}
        <div className={styles.navbarLogo}>
          {location.pathname !== "/" ? (
            <Link to="/">
              <img
                src={logoSrc}
                alt="Hebe Cafe Logo"
                className={styles.logoImg}
              />
            </Link>
          ) : (
            <div className={styles.placeholder}></div>
          )}
        </div>
        {/* Navigation options on the right */}
        <div className={styles.menuOptions}>
          <a href="#about" onClick={handleAboutClick} className={styles.navLink}>
            About
          </a>
          <Link to="/menu" className={styles.navLink}>
            Menu
          </Link>
          <Link to="/events" className={styles.navLink}>
            Events
          </Link>
          <Link to="/contact" className={styles.navLink}>
            Contact
          </Link>
          <span className={styles.contactNumber}>Call: (123) 456-7890</span>
        </div>
      </div>

      {/* Mobile Navigation Header */}
      <div className={styles.mobileHeader}>
        <div className={styles.mobileLogo}>
          {location.pathname !== "/" ? (
            <Link to="/">
              <img
                src={logoSrc}
                alt="Hebe Cafe Logo"
                className={styles.logoImg}
              />
            </Link>
          ) : (
            <div className={styles.placeholder}></div>
          )}
        </div>
        {/* Mobile: Hamburger on the right */}
        <button className={styles.hamburger} onClick={toggleMobileMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <button className={styles.closeButton} onClick={toggleMobileMenu}>
            ✖
          </button>
          <div className={styles.mobileMenuLinks}>
            <Link
              to="/menu"
              onClick={toggleMobileMenu}
              className={styles.mobileNavLink}
            >
              Menu
            </Link>
            <a
              href="#about"
              onClick={handleAboutClick}
              className={styles.mobileNavLink}
            >
              About
            </a>
            <Link
              to="/events"
              onClick={toggleMobileMenu}
              className={styles.mobileNavLink}
            >
              Events
            </Link>
            <Link
              to="/contact"
              onClick={toggleMobileMenu}
              className={styles.mobileNavLink}
            >
              Contact
            </Link>
            <span className={styles.contactNumberMobile}>
              Call: (123) 456-7890
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
