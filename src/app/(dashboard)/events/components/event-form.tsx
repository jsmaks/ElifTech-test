"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEventModal } from "@/app/hooks/use-create-event-modal";
import { toast } from "sonner";

export const EventForm = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { onClose } = useEventModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        setError(null);

        toast.success("Add event successful!");
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setMessage(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred.");
      setMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-y-2">
        <Label htmlFor="title">Title</Label>
        <Input name="title" required />
        <Label htmlFor="description">Description</Label>
        <Input name="description" required />
      </div>
      <Button type="submit" className="w-full mt-4">
        Submit
      </Button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </form>
  );
};
