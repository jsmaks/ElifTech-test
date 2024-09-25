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
