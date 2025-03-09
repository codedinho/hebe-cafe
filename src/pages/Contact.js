import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Contact.module.css";

function Contact() {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/company-info.json`)
      .then(response => response.json())
      .then(data => setCompanyInfo(data))
      .catch(error => console.error('Error loading company info:', error));
  }, []);

  return (
    <div className={`${styles.contactContainer} ${styles.animateIn}`}>
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src={process.env.PUBLIC_URL + "/images/Map_Location_Outdoor.png"}
            alt="Our Location"
            className={styles.locationImage}
          />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.header}>
            Get In Touch
          </h1>
          <div className={styles.infoText}>
            If you have any questions or feedback, feel free to reach out to us.
          </div>
          <div className={styles.contactDetail}>
            <FaEnvelope className={styles.contactIcon} />
            <div className={styles.contactDetailValue}>
              {companyInfo?.contact?.email}
            </div>
          </div>
          <div className={styles.contactDetail}>
            <FaPhoneAlt className={styles.contactIcon} />
            <div className={styles.contactDetailValue}>{companyInfo?.contact?.phone}</div>
          </div>
          <div className={styles.contactDetail}>
            <FaMapMarkerAlt className={styles.contactIcon} />
            <div className={styles.contactDetailValue}>
              {companyInfo?.name}, {companyInfo?.address?.street}, {companyInfo?.address?.city}, {companyInfo?.address?.postcode}
            </div>
          </div>
          
          <h2 className={styles.subHeader}>Opening Hours</h2>
          <div className={styles.openingHours}>
            <div className={styles.dayBlock}>
              <span className={styles.day}>Monday</span>
              <span className={styles.hours}>{companyInfo?.openingHours?.monday?.hours}</span>
            </div>
            
            <div className={styles.dayBlock}>
              <span className={styles.day}>Tuesday</span>
              <span className={styles.hours}>{companyInfo?.openingHours?.tuesday?.hours}</span>
            </div>
            
            <div className={styles.dayBlock}>
              <span className={styles.day}>Wednesday</span>
              <span className={styles.hours}>{companyInfo?.openingHours?.wednesday?.hours}</span>
            </div>
            
            <div className={styles.dayBlock}>
              <span className={styles.day}>Thursday</span>
              <span className={styles.hours}>{companyInfo?.openingHours?.thursday?.hours}</span>
            </div>
            
            <div className={styles.dayBlock}>
              <span className={styles.day}>Friday</span>
              <span className={styles.hours}>{companyInfo?.openingHours?.friday?.hours}</span>
            </div>
            
            <div className={styles.dayBlock}>
              <span className={styles.day}>Saturday</span>
              <span className={styles.hours}>{companyInfo?.openingHours?.saturday?.hours}</span>
            </div>
            
            <div className={styles.dayBlock}>
              <span className={styles.day}>Sunday</span>
              <span className={styles.hours}>{companyInfo?.openingHours?.sunday?.hours}</span>
            </div>
            
            <div className={styles.note}>
              {companyInfo?.openingHours?.kitchenNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
