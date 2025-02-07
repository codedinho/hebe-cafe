import React, { useState, useEffect } from "react";
import styles from "./EventsBanner.module.css";
import { FaBell } from "react-icons/fa";

function EventsBanner() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the public folder at runtime
    fetch(process.env.PUBLIC_URL + "/data/events.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events data");
        }
        return response.json();
      })
      .then((data) => setEventsData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Only render if data is loaded
  if (!eventsData.length) return null;

  // Filter events to only include future events or those on today
  const today = new Date();
  // Create a date at midnight today, ensuring we compare only the date parts
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const upcomingEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= todayStart;
  });

  // If there are no upcoming events, don't render the banner
  if (!upcomingEvents.length) return null;

  // Duplicate the events so that the banner loops seamlessly
  const duplicatedEvents = [...upcomingEvents, ...upcomingEvents];

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
              <h2 className={styles.cardHeader}>
                {event.header.toUpperCase()}
              </h2>
              <p className={styles.cardDate}>
                {new Date(event.date).toLocaleString()}
              </p>
              <p className={styles.cardDescription}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsBanner;