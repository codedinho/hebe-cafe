import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 