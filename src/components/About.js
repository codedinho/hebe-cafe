import React from "react";
import styles from "./About.module.css";
import EventsBanner from "../components/EventsBanner";

function About() {
  return (
    <div id="about" className={styles.about}>
      <div className={styles.aboutImageContainer}>
        <img
          src={process.env.PUBLIC_URL + "/images/about-me-stock-image.jpg"}
          alt="About Me"
          className={styles.aboutImage}
        />
        <div className={styles.aboutTextContainer}>
          <div className={styles.aboutHeader}>About Hebe Cafe</div>
          <div className={styles.aboutSubHeader}>Est. 2025</div>

          <p className={styles.aboutDescription}>
          Welcome to Hebe Café, London's best hotspot for quality atmosphere and great food. Nestled in the heart of the city, we're all about great flavors and warm smiles. 
          <br></br>Whether you're grabbing coffee, pint, savoring fresh dishes, or meeting friends, Hebe Café is where community and taste come together.
          </p>
          <div className={styles.reviewContainer}>
          <div className={styles.review}>
            <p className={styles.reviewText}>
              "Hebe Café is the stop-in place in London, great vibe and unreal food! You can tell the team cares."
            </p>
            <div className={styles.reviewAuthor}>- David Hemsworth, London</div>
          </div>
        </div>
        </div>
      </div>
      <EventsBanner />
    </div>
  );
}

export default About;
