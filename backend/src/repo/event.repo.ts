import { Dayjs } from 'dayjs';
import { prisma } from '../db/prisma.ts';

export default class EventRepo {
  async create(data: {
    title: string;
    description: string;
    startTime: Dayjs;
    endTime: Dayjs;
    createdBy: number;
    choices: string[];
  }) {
    return prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime.toDate(),
        endTime: data.endTime.toDate(),
        createdBy: data.createdBy,
        choices: {
          create: data.choices.map((label) => ({ label })),
        },
      },
      include: { choices: true },
    });
  }
}
