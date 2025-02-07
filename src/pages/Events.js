import React, { useState, useEffect, useRef } from "react";
import eventsData from "../data/events.json";
import { 
  FaCalendarAlt,
  FaTicketAlt,
  FaTimesCircle,
  FaTh,
  FaList,
  FaBeer,
  FaCoffee,
  FaUtensils,
  FaCookieBite,
  FaBuilding,
  FaMapMarkerAlt,
  FaSpinner
} from "react-icons/fa";
import styles from "./Events.module.css";

function Events() {
  const now = new Date();

  // Separate upcoming and past events
  const upcomingEvents = eventsData
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastEvents = eventsData
    .filter((event) => new Date(event.date) < now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Combine upcoming events first, then past events at the bottom
  const sortedEvents = [...upcomingEvents, ...pastEvents];

  // Pagination: show a block of posts at a time (for non-mobile)
  const POSTS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // State to control animation
  const [animate, setAnimate] = useState(false);
  // State for view mode: "grid" (default) or "big"
  const [viewMode, setViewMode] = useState("grid");
  // State for automatic loading indicator
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef(null);

  // Detect mobile devices (using 768px as breakpoint)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Force grid view and show all posts on mobile:
  useEffect(() => {
    if (isMobile) {
      setViewMode("grid");
      // Show all events (so posts aren't clipped)
      setVisibleCount(sortedEvents.length);
    }
  }, [isMobile, sortedEvents]);

  // When view mode changes (or on page load), re-trigger the animation
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [viewMode]);

  // Setup infinite scroll with an IntersectionObserver (only on non-mobile)
  useEffect(() => {
    if (isMobile) return;
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < sortedEvents.length &&
          !isLoading
        ) {
          setIsLoading(true);
          // Simulate loading delay
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + POSTS_PER_PAGE, sortedEvents.length)
            );
            setIsLoading(false);
          }, 1000);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loadMoreRef.current);
    return () => {
      observer.disconnect();
    };
  }, [visibleCount, isLoading, sortedEvents, isMobile]);

  // Handler for "See More" which switches to big view and scrolls to the specified post
  // (this will only work on non-mobile, since mobile always shows grid view)
  const handleSeeMore = (eventId) => {
    setViewMode("big");
    setTimeout(() => {
      const element = document.getElementById(`event-${eventId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className={styles.eventsWrapper}>
      <header className={styles.eventsHeader}>
        <h1 className={styles.title}>Hebe Cafe Events</h1>
        <div className={styles.servicesBanner}>
          <div className={styles.serviceIcon} title="Bar">
            <FaBeer />
          </div>
          <div className={styles.serviceIcon} title="Cafe">
            <FaCoffee />
          </div>
          <div className={styles.serviceIcon} title="Food">
            <FaUtensils />
          </div>
          <div className={styles.serviceIcon} title="Snacks">
            <FaCookieBite />
          </div>
          <div className={styles.serviceIcon} title="Events">
            <FaCalendarAlt />
          </div>
          <div className={styles.serviceIcon} title="Private Hire">
            <FaBuilding />
          </div>
          <div className={styles.serviceIcon} title="Space in London">
            <FaMapMarkerAlt />
          </div>
        </div>
        <p className={styles.subtitle}>
          Experience an unforgettable blend of live music, tasting events, and
          private hire celebrations.
        </p>
        {/* Hide view toggle on mobile */}
        {!isMobile && (
          <div className={styles.viewToggleContainer}>
            <button
              className={`${styles.viewToggleIcon} ${viewMode === "grid" ? styles.activeToggle : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <FaTh />
            </button>
            <button
              className={`${styles.viewToggleIcon} ${viewMode === "big" ? styles.activeToggle : ""}`}
              onClick={() => setViewMode("big")}
              title="Card View"
            >
              <FaList />
            </button>
          </div>
        )}
      </header>
      <div className={`${styles.eventsContainer} ${viewMode === "big" ? styles.bigView : ""}`}>
        {sortedEvents.slice(0, visibleCount).map((event, index) => {
          const eventDate = new Date(event.date);
          // Format time as "HH:MM" in user's locale
          const eventTime = eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const hasEventPassed = eventDate < now;
          const ticketsUrl = event.ticketsUrl || "https://www.hebecafe.com/tickets";

          if (viewMode === "grid") {
            return (
              <div
                id={`event-${event.id}`}
                className={`${styles.card} ${animate ? styles.visibleLeft : styles.hidden}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                key={event.id}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={process.env.PUBLIC_URL + event.image}
                    alt={event.header}
                    className={styles.cardImage}
                  />
                  <span className={styles.timeOverlay}>
                    {hasEventPassed ? (
                      <span className={styles.timeOverlayEventClosed}>Event Closed</span>
                    ) : (
                      eventTime
                    )}
                  </span>
                  {hasEventPassed ? (
                    <span className={styles.ticketOverlaySoldOut} title="Event Passed"></span>
                  ) : (
                    <a
                      href={ticketsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ticketOverlay}
                    >
                      <FaTicketAlt />
                    </a>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardHeader}>{event.header}</h2>
                  <p className={styles.cardDate}>{eventDate.toLocaleDateString()}</p>
                  <p className={styles.cardDescription}>{event.description}</p>
                  {/* Hide "See More" button on mobile */}
                  {!isMobile && (
                    <button
                      className={styles.seeMoreButton}
                      onClick={() => handleSeeMore(event.id)}
                    >
                      See More
                    </button>
                  )}
                </div>
              </div>
            );
          } else {
            // Big view (only available on non-mobile)
            return (
              <div
                id={`event-${event.id}`}
                className={`${styles.bigCard} ${animate ? styles.visibleRight : styles.hidden}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                key={event.id}
              >
                <div className={styles.bigImageContainer}>
                  <img
                    src={process.env.PUBLIC_URL + event.image}
                    alt={event.header}
                    className={styles.bigCardImage}
                  />
                </div>
                <div className={styles.bigCardContent}>
                  <h2 className={styles.bigCardHeader}>{event.header}</h2>
                  <p className={styles.bigCardDate}>
                    {eventDate.toLocaleDateString()} {eventTime}
                  </p>
                  <p className={styles.bigCardDescription}>{event.description}</p>
                  {hasEventPassed ? (
                    <span className={styles.soldOutBadge}>
                      <FaTimesCircle /> Sold Out
                    </span>
                  ) : (
                    <a
                      href={ticketsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ticketButton}
                    >
                      <FaTicketAlt /> Buy Tickets
                    </a>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
      {/* Render infinite scroll loadMore container only on non-mobile */}
      {!isMobile && visibleCount < sortedEvents.length && (
        <div ref={loadMoreRef} className={styles.loadMoreContainer}>
          {isLoading && <FaSpinner className={styles.spinner} />}
        </div>
      )}
    </div>
  );
}

export default Events;
