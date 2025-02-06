import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Updated About click handler: scrolls to #about if on home
  // Otherwise navigates to home, then scrolls to #about, plus scrolls to top.
  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for the home page to mount before scrolling.
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
    // Scroll to top of the page after navigating
    scrollToTop();
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          {/* Update src to your actual logo path */}
          <img
            src={process.env.PUBLIC_URL + "/images/logo/Hebe_Brand_Assets_Lockup_Stacked_Main.png"}
            alt="Hebe Cafe Logo"
            className={styles.logo}
          />        
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.linksHeader}>Address</h3>
          <div className={styles.infoText}>
            Hebe Cafe <br />
            258 Kingsland Road,
            London,
            E8 4DG
          </div>
          <div className={styles.socialMediaSection}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaFacebook />
            </a>
          </div>
        </div>
        <div className={styles.linksSection}>
          <h3 className={styles.linksHeader}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li>
              <Link to="/about" onClick={handleAboutClick}>About</Link>
            </li>
            <li>
              <Link to="/menu" onClick={scrollToTop}>Menu</Link>
            </li>
            <li>
              <Link to="/events" onClick={scrollToTop}>Events</Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Hebe Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 