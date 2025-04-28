import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Loader from '../components/Loader';
import { useMinimumLoadingTime } from '../hooks/useMinimumLoadingTime';

function Home() {
  return (
    <div className={styles.home}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${process.env.PUBLIC_URL}/images/about-image-2.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
