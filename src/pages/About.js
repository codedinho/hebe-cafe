import React, { useState, useEffect, useRef } from "react";
import styles from "./About.module.css";
import Loader from '../components/Loader';
import { useMinimumLoadingTime } from '../hooks/useMinimumLoadingTime';

function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const isShowingLoader = useMinimumLoadingTime(loading);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Store the ref value in a variable inside the effect
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);  // Use stored reference
        }
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);  // Use stored reference
    }

    return () => {
      if (currentRef) {  // Use stored reference
        observer.unobserve(currentRef);
      }
    };
  }, []);

  if (isShowingLoader) return <Loader />;

  return (
    <div className={styles.animateIn}>
      <div className={styles.pageContent}>
        <div id="about" ref={sectionRef} className={`${styles.about} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.aboutImageContainer}>
            <img
              src={process.env.PUBLIC_URL + "/images/cafe-hebe-about-image.jpg"}
              alt="About Hebe Cafe"
              className={styles.aboutImage}
            />
            <div className={styles.aboutTextContainer}>
              <h1 className={styles.aboutHeader}>Café Hebe</h1>
              <div className={styles.aboutSubHeader}>Est. 2025</div>
              <p className={styles.aboutDescription}>
                Welcome to Hebe Café Bar, London's best hotspot for quality atmosphere and great food. Nestled in the heart of the city, we're all about great flavors and warm smiles.
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
