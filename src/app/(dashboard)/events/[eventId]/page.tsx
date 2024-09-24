import { db } from "@/lib/db";

interface EventIdPageProps {
  params: { eventId: string };
}

const EventIdPage = async ({ params }: EventIdPageProps) => {
  const lists = await db.list.findMany({
    where: {
      eventId: params.eventId,
    },
  });

  //Розумію що це зайва дія, можна зробити по іншому :)

  const event = await db.eventBoard.findUnique({
    where: { id: params.eventId },
    include: { list: true },
  });

  if (lists.length === 0 || event === null) {
    return <div>Event ID not found</div>;
  }

  return (
    <div className="w-full py-5">
      <h3 className="first-letter:uppercase font-bold text-2xl">
        "{event.title}" participants
      </h3>
      <ul className="grid grid-cols-2 gap-x-5 mt-10 text-sm xl:text-xl">
        {lists.map((list) => (
          <li key={list.id} className="bg-slate-300 p-5 rounded-sm">
            <p className="font-medium text-xl">{list.name}</p>
            <p>{list.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventIdPage;
