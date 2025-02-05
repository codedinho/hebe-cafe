import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div id="about" className={styles.about}>
      <div className={styles.aboutHeader}>About Hebe Cafe</div>
      <p className={styles.aboutDescription}>
        Welcome to Hebe Cafe – enjoy our quality food and warm atmosphere!
      </p>
    </div>
  );
}

export default About;
