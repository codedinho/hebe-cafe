import React from "react";
import menuItems from "../data/menu-items.json";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <div className={`${styles.menuWrapper} ${styles.animateIn}`}>
      <header className={styles.menuHeader}>
        <h1 className={styles.title}>Today's Menu</h1>
        <p className={styles.subtitle}>
          Enjoy our selection for the day, featuring our Salad of the Day, Soup of the Day, and a variety of delicious sandwiches.
        </p>
      </header>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.menuItem}>
            <div className={styles.itemInfo}>
              <h2 className={styles.itemName}>{item.name}</h2>
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
