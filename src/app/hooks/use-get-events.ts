import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface UseEventsResult {
  eventsList: Event[];
  currentPage: number;
  totalPages: number;
  //eslint-disable-next-line
  fetchEvents: (page: number) => Promise<void>;
  loading: boolean;
}

export const useEvents = (): UseEventsResult => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/events?page=${page}`);
      const data = await response.json();
      setEventsList(data.events);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);

      window.history.pushState({}, "", `?page=${page}`);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromUrl = new URLSearchParams(window.location.search).get("page");
    fetchEvents(pageFromUrl ? parseInt(pageFromUrl) : 1);
  }, []);

  return {
    eventsList,
    currentPage,
    totalPages,
    fetchEvents,
    loading,
  };
};
