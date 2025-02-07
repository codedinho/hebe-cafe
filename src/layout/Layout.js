import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export default Layout; 