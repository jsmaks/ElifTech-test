"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "./date-picker";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useEventById } from "@/app/hooks/use-get-event-users";
import { FaSpinner } from "react-icons/fa";

export const RegisterForm = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.registerId as string;

  const [selectedOption, setSelectedOption] = useState<string>("social");
  const { exists } = useEventById(id);

  if (exists === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <FaSpinner className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  if (!exists) {
    return <div>No EventBoard found with id: {id}.</div>;
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      eventId: id,
      date: formData.get("date"),
      heardAbout: selectedOption,
    };

    try {
      const response = await fetch(`/api/v1/events/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json(); // можно оставить или логировать результат
      router.push(`/events`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input name="fullName" required placeholder="Enter your full name" />

        <Label htmlFor="email">Email</Label>
        <Input name="email" required placeholder="Enter your email" />

        <div className="grid w-full">
          <span className="text-sm">Date of Birth</span>
          <DatePicker name="date" />
        </div>
      </div>

      <p className="mt-10">Where did you hear about this event?</p>
      <RadioGroup
        defaultValue="social"
        className="grid grid-cols-3 mt-5"
        onValueChange={handleOptionChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="social" id="social" />
          <Label htmlFor="social">Social Media</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="friends" id="friends" />
          <Label htmlFor="friends">Friends</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="myself" id="myself" />
          <Label htmlFor="myself">Found Myself</Label>
        </div>
      </RadioGroup>

      <input type="hidden" name="heardAbout" value={selectedOption} />
      <Button type="submit" className="mt-10 w-full">
        Submit
      </Button>
    </form>
  );
};
