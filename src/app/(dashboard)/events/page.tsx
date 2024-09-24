import { EventList } from "./components/events-list";

const EventsPage = () => {
  return (
    <div className="w-full py-5 bg-slate-100 ">
      <h1 className="text-2xl font-semibold mb-5">Events</h1>
      <EventList />
    </div>
  );
};

export default EventsPage;
