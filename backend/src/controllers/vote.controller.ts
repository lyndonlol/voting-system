import { Request, Response } from 'express';
import VoteService from '../services/vote.service.ts';
import { ApiError } from '../utils/error.utils.ts';

const voteService = new VoteService();

export const castVote = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { eventId, choiceId } = req.body;

  if (!eventId || !choiceId) {
    throw new ApiError('VALIDATION_ERROR', 'Invalid vote data', 400);
  }

  const vote = await voteService.castOrUpdateVote({
    userId,
    eventId,
    choiceId,
  });

  res.status(201).json(vote);
};
