"use client";

import { useEventById } from "@/app/hooks/use-get-event-users";
import { User } from "lucide-react";
import { useParams } from "next/navigation";

const EventIdPage = () => {
  const params = useParams();

  const { event, loading } = useEventById(params.eventId as string);
  console.log(event);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loader"></span>
      </div>
    );
  }

  if (!event) {
    return <p>No event found by ID</p>;
  }

  return (
    <div>
      <h3 className="first-letter:uppercase font-bold text-2xl mb-10">
        {`"${event.title}"`} participants
      </h3>

      {event.list.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-10">
          {event.list.map((list) => (
            <li key={list.id} className="bg-slate-100 shadow-md p-5 rounded-sm">
              <p className="font-medium text-xl">{list.name}</p>
              <p>{list.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-96">
          No participants found!
          <User className="size-10 ml-2" />
        </div>
      )}
    </div>
  );
};

export default EventIdPage;
