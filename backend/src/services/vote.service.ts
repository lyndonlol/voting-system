import dayjs from 'dayjs';
import ChoiceRepo from '../repo/choice.repo.ts';
import EventRepo from '../repo/event.repo.ts';
import VoteRepo from '../repo/vote.repo.ts';
import { ApiError } from '../utils/error.utils.ts';

export default class VoteService {
  constructor(
    private voteRepo = new VoteRepo(),
    private eventRepo = new EventRepo(),
    private choiceRepo = new ChoiceRepo()
  ) {}

  async castOrUpdateVote({
    userId,
    eventId,
    choiceId,
  }: {
    userId: number;
    eventId: number;
    choiceId: number;
  }) {
    const event = await this.eventRepo.findById(eventId);

    if (!event) throw new ApiError('NOT_FOUND', 'Event not found', 404);

    // Check if event is active
    const now = dayjs();
    const eventStart = dayjs(event.startTime);
    const eventEnd = dayjs(event.endTime);

    if (now.isBefore(eventStart) || now.isAfter(eventEnd)) {
      throw new ApiError(
        'VOTE_TIME_EXPIRED',
        'Votes are only allowed within the event time window',
        400
      );
    }

    // Validate choice belongs to event
    const validChoices = await this.choiceRepo.findByEventIdAndId(
      eventId,
      choiceId
    );

    if (!validChoices) {
      throw new ApiError(
        'INVALID_CHOICE',
        'Selected choice does not belong to the event',
        400
      );
    }

    const vote = await this.voteRepo.createOrUpdate(userId, eventId, choiceId);

    return {
      id: vote.id,
      eventId: vote.eventId,
      choiceId: vote.choiceId,
      choiceLabel: vote.choice.label,
      votedAt: vote.votedAt,
    };
  }

  async getMyVotes(userId: number) {
    const votes = await this.voteRepo.findByUserId(userId);

    return votes.map((vote) => ({
      id: vote.id,
      eventId: vote.eventId,
      choiceId: vote.choiceId,
      choiceLabel: vote.choice.label,
      votedAt: vote.votedAt,
    }));
  }

  async getMyVote(userId: number, eventId: number) {
    const vote = await this.voteRepo.findByUserIdAndEventId(userId, eventId);

    if (!vote) {
      return null;
    }

    return {
      id: vote.id,
      eventId: vote.eventId,
      choiceId: vote.choiceId,
      choiceLabel: vote.choice.label,
      votedAt: vote.votedAt,
    };
  }
}
