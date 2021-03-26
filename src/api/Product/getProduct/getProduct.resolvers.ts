import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getProduct: async (_, args) => {
      const id = +args.id;
      return prisma.product.findFirst({ where: { id } });
    },
  },
};
