"use client";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "./components/date-picker";

const RegisterPage = () => {
  const router = useParams();
  const eventId = router.registerId;

  if (!eventId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h2>Register Form</h2>
      <p>{eventId}</p>
      <form action="">
        <div className="mt-10">
          <Label htmlFor="fullName">Full name</Label>
          <Input name="fullName" placeholder="" />
          <Label htmlFor="email">Email</Label>
          <Input name="email" />
          <div className="grid w-full">
            <span>Date of birth</span>
            <DatePicker />
          </div>
        </div>
        <p className="mt-10">Where did you hear about this event ?</p>
        <RadioGroup defaultValue="social" className="grid grid-cols-3 mt-5">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="social" id="social" />
            <Label htmlFor="social">Social media</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="friends" id="friends" />
            <Label htmlFor="friends">Friends</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="myself" id="myself" />
            <Label htmlFor="myself">Found myself</Label>
          </div>
        </RadioGroup>
      </form>
    </div>
  );
};

export default RegisterPage;
