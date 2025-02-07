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

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img
            src={process.env.PUBLIC_URL + "/images/logo/Hebe_Brand_Assets_Lockup_Stacked_Main.svg"}
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
              <Link to="/about">About</Link>
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