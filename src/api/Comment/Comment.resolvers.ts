import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Comment: {
    user: ({ id }) => prisma.comment.findFirst({ where: { id } }).user(),
    review: ({ id }) => prisma.comment.findFirst({ where: { id } }).review(),
  },
};
