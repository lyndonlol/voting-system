import { prisma } from '../db/prisma.ts';
import bcrypt from 'bcryptjs';
import { Role } from '../generated/prisma/enums.ts';

// Seed admin user
export const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { username: 'admin' },
    });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('admin123', 12);

      await prisma.user.create({
        data: {
          username: 'admin',
          phone: '+85299999999',
          passwordHash,
          role: Role.ADMIN,
        },
      });
      console.log('Admin user seeded: username=admin / password=admin123');
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
};
