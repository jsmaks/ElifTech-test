"use client";
import { useParams } from "next/navigation";
import { RegisterForm } from "./components/register-form";
import { useEventById } from "@/app/hooks/use-get-event-users";

const RegisterPage = () => {
  const params = useParams();
  const { event } = useEventById(params.registerId as string);
  const title = event?.title;

  return (
    <div className="p-5 ">
      <h2 className="text-center font-bold text-xl xl:text-2xl mb-10">
        Register Form for {title}
      </h2>
      <div className="h-full w-full flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
