import { Request, Response } from 'express';
import dayjs from '../utils/dayjs.ts';
import { ApiError } from '../utils/error.utils.ts';
import EventService from '../services/event.service.ts';

const eventService = new EventService();

export const createEvent = async (req: Request, res: Response) => {
  const adminId = req.userId;
  const { title, description, startTime, endTime, choices } = req.body;

  if (!title || !startTime || !endTime) {
    throw new ApiError('VALIDATION_ERROR', 'Invalid event data', 400);
  }

  if (!Array.isArray(choices)) {
    throw new ApiError(
      'VALIDATION_ERROR',
      'Invalid choices format, expected an array of strings',
      400
    );
  }

  // Validate ISO 8601 format (YYYY-MM-DDTHH:mm:ss.SSSZ)
  const startTimeDay = dayjs.utc(startTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true);
  const endTimeDay = dayjs.utc(endTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true);

  if (!startTimeDay.isValid() || !endTimeDay.isValid()) {
    throw new ApiError(
      'VALIDATION_ERROR',
      'Invalid time format. Use ISO 8601 format (e.g., 2026-12-03T04:56:78.000Z)',
      400
    );
  }

  const event = await eventService.createEvent({
    title,
    description,
    startTime: startTimeDay,
    endTime: endTimeDay,
    createdBy: adminId,
    choices,
  });

  res.status(201).json(event);
};

export const getEvents = async (_req: Request, res: Response) => {
  const events = await eventService.getEvents();

  res.status(200).json(events);
};

export const getEventById = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);

  if (isNaN(eventId)) {
    throw new ApiError('VALIDATION_ERROR', 'Invalid event ID', 400);
  }

  const event = await eventService.getEventById(eventId);

  res.status(200).json(event);
};
