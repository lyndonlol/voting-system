import { Dayjs } from 'dayjs';
import ChoiceRepo from '../repo/choice.repo.ts';
import EventRepo from '../repo/event.repo.ts';
import { ApiError } from '../utils/error.utils.ts';

export default class EventService {
  constructor(private eventRepo: EventRepo = new EventRepo()) {}

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
}
