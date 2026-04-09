import { prisma } from '../db/prisma.ts';

export default class VoteRepo {
  async createOrUpdate(userId: number, eventId: number, choiceId: number) {
    return prisma.vote.upsert({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
      update: { choiceId, votedAt: new Date() },
      create: {
        userId,
        eventId,
        choiceId,
        votedAt: new Date(),
      },
      include: { choice: true },
    });
  }

  async findByUserId(userId: number) {
    return prisma.vote.findMany({
      where: { userId },
      include: {
        choice: true,
        event: true,
      },
      orderBy: { votedAt: 'desc' },
    });
  }
}
