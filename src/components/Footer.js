import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: { street: "", city: "", postcode: "" },
    social: { instagram: "", facebook: "" }
  });

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/company-info.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched company info:', data);
        setCompanyInfo(data);
      })
      .catch(error => console.error('Error loading company info:', error));
  }, []);

  // Helper to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img
            src={process.env.PUBLIC_URL + "/images/logo/Hebe_Branding_Assets_Lockup_Main-02.png"}
            alt="Hebe Cafe Logo"
            className={styles.logo}
          />        
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.linksHeader}>Address</h3>
          <div className={styles.infoText}>
            {companyInfo.name}<br />
            {companyInfo.address.street}<br />
            {companyInfo.address.city}<br />
            {companyInfo.address.postcode}
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
          <h3 className={styles.linksHeader}>Our Links</h3>
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
        <p>&copy; {new Date().getFullYear()} Hebe Café Bar. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 