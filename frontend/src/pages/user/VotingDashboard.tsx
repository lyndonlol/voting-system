import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import EventCard from "../../components/user/EventCard";
import type { Event } from "../../types";

const VotingDashboard = () => {
  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: () => api.get("/events").then((res) => res.data),
  });

  if (isLoading)
    return <div className="p-8 text-center text-lg">Loading events...</div>;
  if (error)
    return <div className="p-8 text-red-600">Failed to load events</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Active &amp; Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default VotingDashboard;
