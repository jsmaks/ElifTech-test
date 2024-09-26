"use client";
// import { db } from "@/lib/db";
import { useEventById } from "@/app/hooks/use-get-event-users";
import { useParams } from "next/navigation";

const EventIdPage = () => {
  // const event = await db.eventBoard.findUnique({
  //   where: { id: params.eventId },
  //   include: { list: true },
  // });

  // if (event === null) {
  //   return <div className="font-bold text-2xl">Event ID not found</div>;
  // }
  // if (event.list.length === 0) {
  //   return <div className="font-bold text-2xl">People not register yet</div>;
  // }

  const params = useParams();

  const { event } = useEventById(params.eventId as string);

  return (
    <div className="w-full py-5">
      <h3 className="first-letter:uppercase font-bold text-2xl mb-10">
        {`"${event?.title}"`} participants
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-10">
        {event?.list.map((list) => (
          <li key={list.id} className="bg-slate-100 shadow-md p-5 rounded-sm">
            <p className="font-medium text-xl">{list.name}</p>
            <p>{list.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventIdPage;
