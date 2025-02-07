import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the public folder at runtime
    fetch(process.env.PUBLIC_URL + "/data/menu-items.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        return response.json();
      })
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

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
