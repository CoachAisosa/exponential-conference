import { useState, useEffect } from "react";
import LiveHero from "../components/live/LiveHero";
import FreeBookCard from "../components/live/FreeBookCard";
import LiveStream from "../components/live/LiveStream";
import TrainingSessionsList from "../components/live/TrainingSessionsList";
import LiveCTA from "../components/live/LiveCTA";
import LiveAccessGate from "../components/live/LiveAccessGate";
import styles from "./LiveEvent.module.css";

function LiveEvent() {
  const [hasAccess, setHasAccess] = useState(false);

  // Check if user already has access (from localStorage)
  useEffect(() => {
    const accessGranted = localStorage.getItem("liveAccessGranted");
    if (accessGranted === "true") {
      setHasAccess(true);
    }
  }, []);

  // If no access, show gate
  if (!hasAccess) {
    return (
      <main className="liveEventPage">
        <LiveAccessGate onAccessGranted={() => setHasAccess(true)} />
      </main>
    );
  }

  // If access granted, show full live event
  return (
    <main className="liveEventPage">
      <LiveHero />
      <FreeBookCard />
      <LiveStream />
      <TrainingSessionsList />
      <LiveCTA />
    </main>
  );
}

export default LiveEvent;