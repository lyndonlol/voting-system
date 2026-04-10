import { useState } from "react";
import VoteForm from "./VoteForm";
import type { Event } from "../../types";
import dayjs from "dayjs";

const EventCard = ({ event }: { event: Event }) => {
  const [showVote, setShowVote] = useState(false);
  const startTime = dayjs(event.startTime);
  const endTime = dayjs(event.endTime);
  const isActive = dayjs().isAfter(startTime) && dayjs().isBefore(endTime);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold text-xl mb-1">{event.title}</h3>
      <div className="text-gray-500 text-sm mb-4">
        <p>Start: {dayjs(event.startTime).format("YYYY-MM-DD HH:mm")} </p>
        <p>End: {dayjs(event.endTime).format("YYYY-MM-DD HH:mm")}</p>
      </div>
      <button
        disabled={!isActive}
        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition w-full 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        onClick={() => setShowVote(!showVote)}
      >
        {showVote ? "Hide Vote Form" : "Cast / Update Vote"}
      </button>

      {showVote && <VoteForm event={event} />}
    </div>
  );
};

export default EventCard;
