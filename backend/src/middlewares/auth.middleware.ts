import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError } from '../utils/error.utils.ts';
import { Role } from '../generated/prisma/browser.ts';
import UserRepo from '../repo/user.repo.ts';

interface JwtPayload {
  userId: number;
  username: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        role: Role;
      };
    }
  }
}

export const authenticate: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const userRepo = new UserRepo();

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new ApiError('UNAUTHORIZED', 'Missing or invalid token', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await userRepo.findById(decoded.userId);

    if (!user) {
      throw new ApiError('UNAUTHORIZED', 'User not found', 401);
    }

    req.user = user;

    next();
  } catch (err) {
    throw new ApiError('UNAUTHORIZED', 'Invalid or expired token', 401);
  }
};

export const adminOnly: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.user.role !== 'ADMIN') {
    throw new ApiError('FORBIDDEN', 'Admin access only', 403);
  }

  next();
};
