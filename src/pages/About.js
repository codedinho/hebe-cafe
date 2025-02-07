import React, { useState, useEffect, useRef } from "react";
import styles from "./About.module.css";

function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.animateIn}>
      <div className={styles.pageContent}>
        <div id="about" ref={sectionRef} className={`${styles.about} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.aboutImageContainer}>
            <img
              src={process.env.PUBLIC_URL + "/images/about-me-stock-image.jpg"}
              alt="About Hebe Cafe"
              className={styles.aboutImage}
            />
            <div className={styles.aboutTextContainer}>
              <div className={styles.aboutHeader}>About Hebe Cafe</div>
              <div className={styles.aboutSubHeader}>Est. 2025</div>
              <p className={styles.aboutDescription}>
                Welcome to Hebe Café, London's best hotspot for quality atmosphere and great food. Nestled in the heart of the city, we're all about great flavors and warm smiles.
                <br />
                Whether you're grabbing coffee, enjoying a pint, savoring fresh dishes, or meeting friends, Hebe Café is where community and taste come together.
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
        </div>
      </div>
    </div>
  );
}

export default About;
