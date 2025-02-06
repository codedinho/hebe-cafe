import React, { useRef, useEffect } from "react";
import styles from "./Home.module.css";
import About from "../components/About";

function Home() {
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (window.location.hash === "#about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className={styles.home}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/cafe-stock-image.jpg)`,
        }}
      >
        <img
          className={styles.heroLogo}
          src={process.env.PUBLIC_URL + "/images/logo/Hebe_Brand_Assets_Lockup_Stacked_Oyster.svg"}
          alt="Hebe Cafe Logo"
        />
        <button onClick={scrollToAbout} className={styles.scrollDown}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.arrowIcon}
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={styles.spacer}></div>
      <div ref={aboutRef}>
        <About />
      </div>
    </div>
  );
}

export default Home;
