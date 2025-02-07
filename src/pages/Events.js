import React, { useEffect, useState, useRef } from "react";
import styles from "./Events.module.css";
import EventsBanner from "../components/EventsBanner";

// Helper function to get ordinal suffix for a number
function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Function to format the ISO date string into a user-friendly string
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const ordinalDay = getOrdinal(day);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${ordinalDay} ${month} ${year}, ${hours}.${formattedMinutes}${period}`;
}

function Events() {
  const [eventsData, setEventsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 8;
  const loaderRef = useRef(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/events.json")
      .then((response) => response.json())
      .then((data) => setEventsData(data));
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate a network delay before showing more events
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  // Only show the events for the current page.
  const displayedEvents = eventsData.slice(0, page * itemsPerPage);

  // Use Intersection Observer to automatically load more events when the bottom element is in view.
  useEffect(() => {
    // Don't observe if we're loading or if all events are already loaded.
    if (loading || displayedEvents.length >= eventsData.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Clean up the observer on unmount or when dependencies change.
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, displayedEvents.length, eventsData.length]);

  return (
    <div className={styles.animateIn}>
      <div className={styles.pageContent}>
        <header className={styles.eventsHeader}>
          <h1 className={styles.title}>Events & Private Hire</h1>
          <p className={styles.subtitle}>
            Experience an unforgettable blend of live music, gourmet tastes, and
            sophisticated settings expertly curated for every celebration. At Hebe Cafe,
            we design each event to create magical moments—from intimate tastings to vibrant
            private hires—ensuring a harmonious fusion of ambiance, flavor, and melody.
          </p>
          <hr className={styles.divider} />
        </header>
        <div className={styles.eventsGrid}>
          {displayedEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <img
                src={process.env.PUBLIC_URL + event.image}
                alt={event.header}
                className={styles.eventImage}
              />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{event.header}</h3>
                <p className={styles.cardDescription}>{event.description}</p>
                <p className={styles.cardDate}>{formatDate(event.date)}</p>
              </div>
            </div>
          ))}
        </div>
        {/* This empty div is observed by the Intersection Observer.
            When in view, it triggers the loading of the next set of events.
            A spinner is displayed here during the loading period. */}
        <div ref={loaderRef} className={styles.loadMoreContainer}>
          {loading && <div className={styles.spinner}></div>}
        </div>
      </div>
    </div>
  );
}

export default Events;
