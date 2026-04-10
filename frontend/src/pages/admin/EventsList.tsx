import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../api/axios";
import type { Event } from "../../types";

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">All Events</h1>
        <div>
          <Link
            to="/admin/events/new"
            className="bg-blue-600 text-white px-3 py-3 rounded-2xl hover:bg-blue-700"
          >
            + Create New Event
          </Link>
        </div>
      </div>
      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-6 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {event.choices.length} choices
              </p>
            </div>
            <Link
              to={`/admin/events/${event.id}`}
              className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-xl text-sm font-medium"
            >
              View Trends
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
