import { prisma } from '../db/prisma.ts';

export default class UserRepo {
  async findByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  async findByPhone(phone: string) {
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    return user;
  }

  async create(data: {
    username: string;
    phone: string;
    passwordHash: string;
    role: 'USER' | 'ADMIN';
  }) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
