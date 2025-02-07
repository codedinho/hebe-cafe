import React from "react";
import eventsData from "../data/events.json";
import styles from "./Events.module.css";

function Events() {
  return (
    <div className={styles.eventsWrapper}>
      <header className={styles.eventsHeader}>
        <h1 className={styles.title}>Hebe Cafe Events</h1>
        <p className={styles.subtitle}>
          Experience an unforgettable blend of live music, gourmet tastes, and
          sophisticated settings expertly curated for every celebration. At Hebe Cafe,
          we design each event to create magical moments—from intimate tastings to vibrant
          private hires—ensuring a harmonious fusion of ambiance, flavor, and melody.
        </p>
        <hr className={styles.divider} />
      </header>
      <div className={styles.eventsGrid}>
        {eventsData.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <img
              src={process.env.PUBLIC_URL + event.image}
              alt={event.header}
              className={styles.eventImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
