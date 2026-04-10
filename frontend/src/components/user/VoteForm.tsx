import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import type { Event, Vote } from "../../types";
import type { AxiosError, AxiosResponse } from "axios";

const VoteForm = ({ event }: { event: Event }) => {
  const queryClient = useQueryClient();
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [myVote, setMyVote] = useState<Vote | null>(null);

  // Fetch current vote
  useEffect(() => {
    api.get(`/votes/me/${event.id}`).then((res) => {
      if (res.data) {
        setMyVote(res.data);
        setSelectedChoice(res.data.choiceId);
      }
    });
  }, [event.id]);

  const voteMutation = useMutation<
    AxiosResponse<Vote>,
    AxiosError<{ message: string }>,
    { eventId: number; choiceId: number }
  >({
    mutationFn: (data: { eventId: number; choiceId: number }) =>
      api.post(`/votes`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["myVotes"] });
    },
    onError: (err) => {
      console.log(err.response?.data?.message || "Failed to vote");
    },
  });

  const handleVote = () => {
    if (!selectedChoice) return;
    voteMutation.mutate({ eventId: event.id, choiceId: selectedChoice });
  };

  return (
    <div className="mt-6">
      <div className="space-y-3">
        {event.choices.map((choice) => (
          <label
            key={choice.id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              checked={selectedChoice === choice.id}
              onChange={() => setSelectedChoice(choice.id)}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-lg">{choice.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleVote}
        disabled={voteMutation.isPending || !selectedChoice}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-2xl font-medium hover:bg-green-700 disabled:bg-gray-400 transition"
      >
        {voteMutation.isPending
          ? "Saving..."
          : myVote
            ? "Update Vote"
            : "Submit Vote"}
      </button>
    </div>
  );
};

export default VoteForm;
