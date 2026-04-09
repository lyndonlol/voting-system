import { prisma } from '../db/prisma.ts';

export default class ChoiceRepo {
  async findByEventIdAndId(eventId: number, choiceId: number) {
    return prisma.choice.findUnique({
      where: {
        id: choiceId,
        eventId: eventId,
      },
    });
  }
}
