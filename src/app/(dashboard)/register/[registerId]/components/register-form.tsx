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
import { useEvents } from "@/app/hooks/use-get-events"; // Импортируем useEvents
import { toast } from "sonner";

export const RegisterForm = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.registerId as string;

  const [selectedOption, setSelectedOption] = useState<string>("social");
  const { exists } = useEventById(id);
  const { currentPage } = useEvents();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: "",
  });
  const [errors, setErrors] = useState({ fullName: "", email: "" });

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    let errors = { fullName: "", email: "" };

    if (formData.fullName.length < 3) {
      errors.fullName = "Full Name must be at least 3 characters long.";
      valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      errors.email =
        "Email must be a valid email address (e.g., user@example.com).";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
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

        toast.success("Registration successful!");
        // Обновляем события на текущей странице
        router.push(`/events?page=${currentPage}`);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <span className="text-red-500 text-[10px]">{errors.fullName}</span>
        )}

        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className=" text-[10px] text-red-500">{errors.email}</span>
        )}

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
