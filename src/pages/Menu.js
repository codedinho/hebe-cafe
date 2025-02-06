import React, { useState } from "react";
import menuItems from "../data/menu-items.json";
import styles from "./Menu.module.css";
import { FaStar } from "react-icons/fa";

function Menu() {
  // Default to "weeklySpecials" so the Weekly Specials tab shows first
  const [activeTab, setActiveTab] = useState("menu");

  // If on the "menu" tab, include both regular menu items and specials.
  // If on the "weeklySpecials" tab, filter only weekly specials.
  const filteredItems =
    activeTab === "menu"
      ? menuItems.filter(
          item => item.menuType === "menu" || item.menuType === "weeklySpecials"
        )
      : menuItems.filter(item => item.menuType === activeTab);

  return (
    <div className={`${styles.menuWrapper} ${styles.animateIn}`}>
      <header className={styles.menuHeader}>
        <h1 className={styles.title}>
          {activeTab === "weeklySpecials" ? "Weekly Specials" : "Menu"}
        </h1>
        <p className={styles.subtitle}>
          {activeTab === "weeklySpecials"
            ? "Explore our curated selection of weekly specials that form the core of our menu."
            : "Discover our classic menu items, crafted with care."}
        </p>
      </header>
      <div className={styles.tabs}>
        <div
          className={`${styles.tabSelector} ${
            activeTab === "menu" ? styles.activeTabSelector : ""
          }`}
          onClick={() => setActiveTab("menu")}
        >
          <span className={styles.tabLabel}>Menu</span>
        </div>
        <div
          className={`${styles.tabSelector} ${
            activeTab === "weeklySpecials" ? styles.activeTabSelector : ""
          }`}
          onClick={() => setActiveTab("weeklySpecials")}
        >
          <span className={styles.tabLabel}>Specials</span>
        </div>
      </div>
      <ul className={styles.menuList}>
        {filteredItems.map(item => (
          <li key={item.id} className={styles.menuItem}>
            <div className={styles.itemInfo}>
              <div className={styles.headerWrapper}>
                <h2 className={styles.itemName}>{item.name}</h2>
                {item.menuType === "weeklySpecials" && (
                  <FaStar className={styles.specialStar} />
                )}
              </div>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
            <div className={styles.itemPrice}>
              <span>{item.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
