import React from "react";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src="/images/location-photo.png" // Replace with your actual location image path
            alt="Our Location"
            className={styles.locationImage}
          />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.header}>Contact Us!</h1>

          <div className={styles.infoText}>
            If you have any questions or feedback, feel free to reach out to
            us.
          </div>
          <p className={styles.contactDetail}>
          <div className={styles.contactDetailHighlighted}>
              Email
            </div>
            <div className={styles.contactDetailValue}>| contact@hebecafe.com</div>          
          </p>
          <p className={styles.contactDetail}>
            <div className={styles.contactDetailHighlighted}>
              Phone
            </div>
            <div className={styles.contactDetailValue}>| 123-456-7890</div>
          </p>
          <p className={styles.contactDetail}>
          <div className={styles.contactDetailHighlighted}>
              Address
            </div>
            <div className={styles.contactDetailValue}>| Hebe Cafe, 258 Kingsland Road, London, E8 4DG</div>          
            </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
