import React from "react";
import styles from "./EventsBanner.module.css";
import eventsData from "../data/events.json";
import { FaBell } from 'react-icons/fa';

function EventsBanner() {
  // Duplicate the events so that the banner loops seamlessly
  const duplicatedEvents = [...eventsData, ...eventsData];

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.scroller}>
        {duplicatedEvents.map((event, index) => (
          <div className={styles.card} key={`${event.id}-${index}`}>
            <div className={styles.imageContainer}>
              <img
                src={process.env.PUBLIC_URL + event.image}
                alt={event.header}
                className={styles.cardImage}
              />
              <FaBell className={styles.notificationIcon} />
            </div>
            <div className={styles.cardDetails}>
              <h2 className={styles.cardHeader}>{event.header.toUpperCase()}</h2>
              <p className={styles.cardDate}>
                {new Date(event.date).toLocaleString()}
              </p>
              <p className={styles.cardDescription}>
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsBanner;