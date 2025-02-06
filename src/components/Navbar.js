import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Choose the appropriate logo based on the current route.
  const logoSrc =
    location.pathname === "/"
      ? `${process.env.PUBLIC_URL}/images/logo/Hebe_Brand_Assets_Lockup_Horizontal_Oyster.png`
      : `${process.env.PUBLIC_URL}/images/logo/Hebe_Brand_Assets_Lockup_Horizontal_Oyster.png`;
  const logoSrcSmall = `${process.env.PUBLIC_URL}/images/logo/Hebe_Brand_Assets_Logo_Red.png`

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
    <>
      {/* Main Navbar */}
      <nav className={`${styles.navbar} ${location.pathname === "/" ? styles.transparent : ""}`}>
        {/* Desktop Navigation */}
        <div className={styles.desktopMenu}>
          <div className={styles.navbarLogo}>
            {location.pathname !== "/" ? (
              <Link to="/">
                <img src={logoSrc} alt="Hebe Cafe Logo" className={styles.logoImg} />
              </Link>
            ) : (
              <div className={styles.placeholder}></div>
            )}
          </div>
          <div className={styles.menuOptions}>
            <a href="#about" onClick={handleAboutClick} className={styles.navLink}>
              About
            </a>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Contact
            </NavLink>
            <span className={styles.contactNumber}>Call: (123) 456-7890</span>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileLogo}>
            {location.pathname !== "/" ? (
              <Link to="/">
                <img src={logoSrc} alt="Hebe Cafe Logo" className={styles.logoImgSmall} />
              </Link>
            ) : (
              <div className={styles.placeholder}></div>
            )}
          </div>
          <button className={styles.hamburger} onClick={toggleMobileMenu}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (moved outside the main <nav>) */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <button className={styles.closeButton} onClick={toggleMobileMenu}>
            ✖
          </button>
          <div className={styles.mobileMenuLinks}>
            <a href="#about" onClick={handleAboutClick} className={styles.mobileNavLink}>
              About
            </a>
            <NavLink
              to="/menu"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/events"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/contact"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
              }
            >
              Contact
            </NavLink>
            <div className={styles.logoContainer}>
              <img src={logoSrcSmall} alt="Hebe Cafe Logo" className={styles.logoImgSmall} />

              <span className={styles.contactNumberMobile}>
                Call: (123) 456-7890
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
