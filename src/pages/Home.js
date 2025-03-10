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
          src={process.env.PUBLIC_URL + "/images/logo/Hebe_Branding_Assets_Lockup_Oyster.png"}
          alt="Hebe Cafe Logo"
        />
      </div>
    </div>
  );
}

export default Home;
