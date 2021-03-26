import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Size: {
    product: ({ id }) => prisma.size.findFirst({ where: { id } }).product(),
  },
};
