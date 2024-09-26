import { AddEventButton } from "./add-event-button";
import EventList from "./components/events-list";

const EventsPage = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold">Events</h1>
        <AddEventButton />
      </div>
      <EventList />
    </div>
  );
};

export default EventsPage;
