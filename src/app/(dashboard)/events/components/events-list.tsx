import { db } from "@/lib/db";
import Link from "next/link";

export const EventList = async () => {
  const events = await db.eventBoard.findMany();

  if (events.length === 0) {
    return <div>No boards found</div>;
  }

  return (
    <div className="p-5 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-300 text-black rounded-sm p-4">
            <h3 className="font-semibold">{event.title}</h3>
            <p className="line-clamp-2 truncate">{event.description}</p>
            <div className="links__wrapper grid grid-cols-2 gap-x-5 mt-10 text-sm xl:text-xl font-normal">
              <Link
                href={`/register/${event.id}`}
                className=" rounded-sm bg-sky-700 text-white px-4 py-2">
                Register
              </Link>
              <Link
                href={{
                  pathname: `/events/${event.id}`,
                  query: { title: event.title },
                }}
                className=" rounded-sm bg-sky-700 text-white px-4 py-2">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
