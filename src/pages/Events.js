import React, { useEffect, useState, useRef } from "react";
import styles from "./Events.module.css";
import EventsBanner from "../components/EventsBanner";
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
          {displayedEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <img
                src={process.env.PUBLIC_URL + event.image}
                alt={event.header}
                className={styles.eventImage}
              />
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
      <EventsBanner />

    </div>
  );
}

export default Events;
