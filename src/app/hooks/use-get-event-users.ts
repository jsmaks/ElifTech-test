
import { useState, useEffect } from "react";

interface UseEventByIdResult {
  exists: boolean | null;
  error: string | null;
}

export const useEventById = (id: string | null): UseEventByIdResult => {
  const [exists, setExists] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIdExists = async () => {
      try {
        const response = await fetch(`/api/v1/events/${id}`);
        const data = await response.json();

        setExists(data.exists);
      } catch (error) {
        console.error("Error checking id:", error);
        setError("Error checking id");
        setExists(false);
      }
    };

    if (id) {
      checkIdExists();
    } else {
      setExists(false);
    }
  }, [id]);

  return { exists, error };
};
