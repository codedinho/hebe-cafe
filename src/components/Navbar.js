import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/company-info.json`)
      .then(response => response.json())
      .then(data => setCompanyInfo(data))
      .catch(error => console.error('Error loading company info:', error));
  }, []);

  // Choose the appropriate logo based on the current route.
  const logoSrc =
    location.pathname === "/"
      ? `${process.env.PUBLIC_URL}/images/logo/Hebe_Branding_Assets_Logo_Terracotta.png`
      : `${process.env.PUBLIC_URL}/images/logo/Hebe_Branding_Assets_Logo_Terracotta.png`;
  const logoSrcSmall = `${process.env.PUBLIC_URL}/images/logo/Hebe_Branding_Assets_Logo_Terracotta.png`
  const logoSrcSmallWhite = `${process.env.PUBLIC_URL}/images/logo/Hebe_Branding_Assets_Logo_Oyster.png`

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`${styles.navbar} ${location.pathname === "/" ? styles.transparent : ""}`}>
        {/* Desktop Navigation */}
        <div className={styles.desktopMenu}>
          <div className={styles.navbarLogo}>
            <Link to="/">
              <img 
                src={logoSrc} 
                alt="Hebe Cafe Logo" 
                className={`${styles.logoImg} ${location.pathname === "/" ? styles.invisible : ""}`} 
              />
            </Link>
          </div>
          <div className={styles.menuOptions}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              About
            </NavLink>
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
            <span className={styles.contactNumber}>
              {companyInfo?.contact?.phone}
            </span>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileLogo}>
            <Link to="/">
              <img 
                src={logoSrcSmall} 
                alt="Hebe Cafe Logo" 
                className={`${styles.logoImgSmall} ${location.pathname === "/" ? styles.invisible : ""}`} 
              />
            </Link>
          </div>
          <button 
            className={styles.hamburger} 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`${styles.mobileMenuOverlay} ${location.pathname === "/" ? styles.transparentOverlay : ""}`}>
          <div className={styles.mobileMenuHeader}>
            <div></div>
            <img src={logoSrcSmallWhite} alt="Hebe Cafe Logo" className={styles.mobileHeaderLogo} />
            <button className={styles.closeButton} onClick={toggleMobileMenu}>
              ✖
            </button>
          </div>
          <div className={styles.mobileMenuLinks}>
            <NavLink
              to="/about"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
              }
            >
              About
            </NavLink>
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
            <span className={styles.contactNumberMobile}>
              Call: {companyInfo?.contact?.phone}
            </span>
            
            {/* Add social media icons */}
            <div className={styles.socialMediaSection}>
              <a
                href={companyInfo?.social?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Visit our Instagram page"
              >
                <FaInstagram />
              </a>
              <a
                href={companyInfo?.social?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Visit our Facebook page"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
