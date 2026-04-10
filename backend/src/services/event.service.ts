import dayjs, { Dayjs } from 'dayjs';
import ChoiceRepo from '../repo/choice.repo.ts';
import EventRepo from '../repo/event.repo.ts';
import { ApiError } from '../utils/error.utils.ts';
import VoteRepo from '../repo/vote.repo.ts';

export default class EventService {
  constructor(
    private eventRepo: EventRepo = new EventRepo(),
    private voteRepo: VoteRepo = new VoteRepo()
  ) {}

  async createEvent(data: {
    title: string;
    description: string;
    startTime: Dayjs;
    endTime: Dayjs;
    createdBy: number;
    choices: string[];
  }) {
    if (data.startTime.isAfter(data.endTime)) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Start time must be before end time',
        400
      );
    }

    if (data.choices.length < 2 || data.choices.length > 4) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Event must have between 2 and 4 choices',
        400
      );
    }

    const event = await this.eventRepo.create({
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
      createdBy: data.createdBy,
      choices: data.choices,
    });

    return event;
  }

  async getEvents() {
    return this.eventRepo.findAll();
  }

  async getEventById(eventId: number) {
    const event = await this.eventRepo.findById(eventId);

    if (!event) {
      throw new ApiError('NOT_FOUND', 'Event not found', 404);
    }

    return event;
  }

  async getEventTrends(eventId: number) {
    const event = await this.getEventById(eventId);

    if (!event) {
      throw new ApiError('NOT_FOUND', 'Event not found', 404);
    }

    const votes = await this.voteRepo.findByEventIdForTrends(eventId);

    // Group votes by hour
    const hourlyCounts: Record<string, Record<string, number>> = {};

    votes.forEach((vote) => {
      const hour = dayjs(vote.votedAt).startOf('hour').toISOString();
      const choice = vote.choice.label;

      if (!hourlyCounts[hour]) {
        hourlyCounts[hour] = {};
      }

      hourlyCounts[hour][choice] = (hourlyCounts[hour][choice] || 0) + 1;
    });

    // Sort hours and calculate cumulative counts
    const sortedHours = Object.keys(hourlyCounts).sort();

    const cumulative: Record<string, number> = {};
    const trends: { time: string; choices: Record<string, number> }[] = [];

    for (const hour of sortedHours) {
      // Add current hour's votes to cumulative total
      Object.keys(hourlyCounts[hour]).forEach((choice) => {
        cumulative[choice] =
          (cumulative[choice] || 0) + hourlyCounts[hour][choice];
      });

      trends.push({
        time: hour,
        choices: { ...cumulative },
      });
    }

    return trends;
  }
}
