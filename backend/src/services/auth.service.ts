import UserRepo from '../repo/user.repo.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/error.utils.ts';
import { Role } from '../generated/prisma/enums.ts';

export default class AuthService {
  constructor(private userRepo: UserRepo = new UserRepo()) {}

  async register(username: string, phone: string, password: string) {
    // HK phone validation (+852xxxxxxxx)
    const hkPhoneRegex = /^\+852\d{8}$/;

    if (!hkPhoneRegex.test(phone)) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Phone must be a valid Hong Kong number (+852xxxxxxxx)',
        400
      );
    }

    const existingUser =
      (await this.userRepo.findByUsername(username)) ||
      (await this.userRepo.findByPhone(phone));

    if (existingUser) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Username or phone already exists',
        400
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.userRepo.create({
      username,
      phone,
      passwordHash,
      role: Role.USER,
    });

    const token = this.generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      user: { id: user.id, username: user.username, role: user.role },
      token,
    };
  }

  async login(username: string, password: string) {
    const user = await this.userRepo.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new ApiError('AUTH_ERROR', 'Invalid username or password', 401);
    }

    const token = this.generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      user: { id: user.id, username: user.username, role: user.role },
      token,
    };
  }

  private generateToken(user: { id: number; username: string; role: Role }) {
    const JWT_SECRET = process.env.JWT_SECRET!;

    return jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}
