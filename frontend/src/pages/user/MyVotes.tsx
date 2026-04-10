import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import type { Vote } from "../../types";
import dayjs from "dayjs";

const MyVotes = () => {
  const { data: votes = [], isLoading } = useQuery<Vote[]>({
    queryKey: ["myVotes"],
    queryFn: () => api.get("/votes/me").then((res) => res.data),
  });

  if (isLoading) return <div className="p-8">Loading your votes...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Votes</h1>
      <div className="space-y-4">
        {votes.map((vote) => (
          <div key={vote.voteId} className="bg-white p-5 rounded-2xl shadow">
            <div>
              <p className="font-medium">{vote.eventTitle}</p>
              <p className="text-sm text-gray-500">
                {dayjs(vote.votedAt).format("MMM D, YYYY h:mm A")}
              </p>
              <p className="text-green-600">Voted for: {vote.choiceLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVotes;
