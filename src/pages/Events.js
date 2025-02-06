import React from "react";
import eventsData from "../data/events.json";
import { FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import styles from "./Events.module.css";

function Events() {
  // Sort events by newest first (descending order)
  const sortedEvents = [...eventsData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className={styles.eventsWrapper}>
      <header className={styles.eventsHeader}>
        <h1 className={styles.title}>Hebe Cafe Events</h1>
        <p className={styles.subtitle}>
          Experience an unforgettable blend of live music, tasting events, and private hire celebrations.
        </p>
      </header>
      <section className={styles.description}>
        <div className={styles.descriptionText}>
          At Hebe Cafe, every event is crafted to create memorable experiences. Whether you're joining a public event or planning a private hire for your special celebration, our dedicated team is on hand to ensure an exceptional experience. Browse our upcoming events below and secure your tickets today!
        </div>
      </section>
      <div className={styles.eventsContainer}>
        {sortedEvents.map((event) => {
          const ticketsUrl =
            event.ticketsUrl || "https://www.hebecafe.com/tickets";
          return (
            <div className={styles.card} key={event.id}>
              <div className={styles.imageContainer}>
                <img
                  src={process.env.PUBLIC_URL + event.image}
                  alt={event.header}
                  className={styles.cardImage}
                />
                {/* Big ticket icon overlay on top right */}
                <a
                  href={ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ticketOverlay}
                >
                  <FaTicketAlt />
                </a>
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardHeader}>{event.header}</h2>
                <p className={styles.cardDate}>
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className={styles.cardDescription}>{event.description}</p>
                {/* Clean ticket icon link inside a circle */}
                <div className={styles.ticketIconContainer}>
                  <a
                    href={ticketsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ticketIconLink}
                  >
                    <FaTicketAlt />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
