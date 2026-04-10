import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import type { Event, EventBody } from "../../types";
import type { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const [choices, setChoices] = useState<string[]>(["", ""]);

  const { mutate, isPending } = useMutation<
    AxiosResponse<Event>,
    AxiosError<{ message: string }>,
    EventBody
  >({
    mutationFn: (data: EventBody) => api.post("/events", data),
    onSuccess: () => {
      alert("Event created successfully!");
      navigate("/admin/events");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to create event");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const addChoice = () => setChoices([...choices, ""]);
  const removeChoice = (index: number) => {
    if (choices.length > 2) {
      setChoices(choices.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validChoices = choices.filter((c) => c.trim() !== "");

    if (validChoices.length < 2) {
      alert("Please add at least 2 choices");
      return;
    }

    mutate({
      title: form.title,
      description: form.description || undefined,
      startTime: dayjs(form.startTime).toISOString(),
      endTime: dayjs(form.endTime).toISOString(),
      choices: validChoices,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <button
          onClick={() => navigate("/admin/events")}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            placeholder="e.g. Title of the event"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            placeholder="Optional description..."
          />
        </div>

        {/* Time range */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              min={dayjs().format("YYYY-MM-DDTHH:mm")}
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Choices */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Choices
            </label>
            {choices.length < 4 && (
              <button
                type="button"
                onClick={addChoice}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Choice
              </button>
            )}
          </div>

          <div className="space-y-3">
            {choices.map((choice, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  placeholder={`Choice ${index + 1}`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                />
                {choices.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeChoice(index)}
                    className="text-red-500 hover:text-red-600 px-4"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-3xl transition text-lg"
        >
          {isPending ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
