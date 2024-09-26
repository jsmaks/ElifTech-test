"use client";

import { useEventModal } from "@/app/hooks/use-create-event-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventForm } from "./components/event-form";

export const AddEventButton = () => {
  const { isOpen, onOpen, onClose } = useEventModal();

  return (
    <>
      <Button onClick={() => onOpen()}>Add event</Button>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new event</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <EventForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export const AddEventButton = () => {
//   const [message, setMessage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleAddEvent = async () => {
//     try {
//       const response = await fetch("/api/v1/events", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setMessage(result.message);
//         setError(null);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error);
//         setMessage(null);
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setError("An unexpected error occurred.");
//       setMessage(null);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleAddEvent}>Fetch events</Button>
//       {message && <p>{message}</p>}
//       {error && <p>{error}</p>}
//     </>
//   );
// };