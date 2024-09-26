import { useState, useEffect, useCallback, useRef } from "react";

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

interface UseEventsResult {
  eventsList: Event[];
  currentPage: number;
  totalPages: number;
  //eslint-disable-next-line
  fetchEvents: (page: number, search: string) => Promise<void>;
  loading: boolean;
}

export const useEvents = (): UseEventsResult => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const initialFetchDone = useRef(false);

  const fetchEvents = useCallback(async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/events?page=${page}&search=${search}`
      );
      const data = await response.json();
      setEventsList(data.events);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);

      window.history.replaceState({}, "", `?page=${page}&search=${search}`);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialFetchDone.current) {
      const params = new URLSearchParams(window.location.search);
      const pageFromUrl = params.get("page");
      const searchFromUrl = params.get("search");

      fetchEvents(parseInt(pageFromUrl || "1"), searchFromUrl || "");
      initialFetchDone.current = true;
    }
  }, [fetchEvents]);

  return {
    eventsList,
    currentPage,
    totalPages,
    fetchEvents,
    loading,
  };
};
