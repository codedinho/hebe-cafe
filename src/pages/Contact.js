import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src={process.env.PUBLIC_URL + "/images/location-photo.png"}
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
          <div className={styles.contactDetail}>
            <FaEnvelope className={styles.contactIcon} />
            <div className={styles.contactDetailValue}>
              contact@hebecafe.com
            </div>
          </div>
          <div className={styles.contactDetail}>
            <FaPhoneAlt className={styles.contactIcon} />
            <div className={styles.contactDetailValue}>123-456-7890</div>
          </div>
          <div className={styles.contactDetail}>
            <FaMapMarkerAlt className={styles.contactIcon} />
            <div className={styles.contactDetailValue}>
              Hebe Cafe, 258 Kingsland Road, London, E8 4DG
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
