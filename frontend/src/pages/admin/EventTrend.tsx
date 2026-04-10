import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import api from "../../api/axios";
import type { EventTrends, HourlyTrend } from "../../types";
import dayjs from "dayjs";

const EventTrend = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const {
    data: trends = [],
    isLoading,
    error,
  } = useQuery<EventTrends>({
    queryKey: ["trends", eventId],
    queryFn: () => api.get(`/events/${eventId}/trends`).then((res) => res.data),
    enabled: !!eventId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading trends...</p>
      </div>
    );
  }

  if (error || !trends.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        No trends available yet
      </div>
    );
  }

  const allChoices: string[] = [];
  trends.forEach((row) => {
    Object.keys(row.choices).forEach((choice) => {
      if (!allChoices.includes(choice)) {
        allChoices.push(choice);
      }
    });
  });
  const sortedChoices = allChoices.sort();

  const trendRows = trends.map((row: HourlyTrend) => ({
    time: row.time,
    choices: sortedChoices.reduce(
      (acc, choice) => {
        acc[choice] = row.choices[choice] ?? 0;
        return acc;
      },
      {} as Record<string, number>,
    ),
  }));

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Hourly Vote Trends</h1>

      <div className="bg-white shadow overflow-hidden">
        <table className="w-full border border-collapse">
          <thead className="bg-gray-100">
            <tr className="border">
              <th className="p-5 text-left font-semibold border">Time</th>
              {sortedChoices.map((choice) => (
                <th
                  key={choice}
                  className="p-5 text-center font-semibold border"
                >
                  {choice}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trendRows.map((row) => (
              <tr key={row.time} className="border-t hover:bg-gray-50">
                <td className="p-5 font-medium border">
                  {dayjs(row.time).format("YYYY-MM-DD HH:mm")}
                </td>
                {sortedChoices.map((choice) => (
                  <td
                    key={choice}
                    className="p-5 text-center font-semibold text-lg border"
                  >
                    {row.choices[choice]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTrend;
