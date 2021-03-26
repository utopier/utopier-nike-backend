import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Like: {
    product: ({ id }) => prisma.productlike.findFirst({ where: { id } }).product(),
    user: ({ id }) => prisma.productlike.findFirst({ where: { id } }).user(),
  },
};
