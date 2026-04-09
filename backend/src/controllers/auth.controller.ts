import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/error.utils.ts';
import { prisma } from '../db/prisma.ts';
import AuthService from '../services/auth.service.ts';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { username, phone, password } = req.body;

  if (!username || !phone || !password) {
    throw new ApiError(
      'VALIDATION_ERROR',
      'Username, phone and password are required',
      400
    );
  }

  const result = await authService.register(username, phone, password);

  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(
      'VALIDATION_ERROR',
      'Username and password are required',
      400
    );
  }
  const result = await authService.login(username, password);

  res.status(200).json(result);
};
