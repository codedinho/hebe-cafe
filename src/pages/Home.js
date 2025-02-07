import React from "react";
import styles from "./Home.module.css";

function Home() {
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
        <button className={styles.scrollDown}>
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
    </div>
  );
}

export default Home;
