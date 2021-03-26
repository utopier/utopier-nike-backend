import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  ImageUrl: {
    product: ({ id }) => prisma.imageurl.findFirst({ where: { id } }).product(),
  },
};
