import { useState, useEffect } from "react";

interface List {
  id: string;
  name: string;
  email: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
}
interface Event {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  list: List[];
}
interface UseEventByIdResult {
  exists: boolean | null;
  error: string | null;
  event: Event | null;
}

export const useEventById = (id: string | null): UseEventByIdResult => {
  const [exists, setExists] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const checkIdExists = async () => {
      try {
        const response = await fetch(`/api/v1/events/${id}`);
        const data = await response.json();

        setExists(data.exists);
        setEvent(data.eventBoard);
      } catch (error) {
        console.error("Error checking id:", error);
        setError("Error checking id");
        setExists(false);
        setEvent(null);
      }
    };

    if (id) {
      checkIdExists();
    } else {
      setExists(false);
      setEvent(null);
    }
  }, [id]);

  return { exists, error, event };
};
