import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getReviews: async (_, args, { request, isAuthenticated }) => {
      const { productId } = args;
      return prisma.review.findMany({
        where: {
          productId:+productId,
        },
      });
    },
  },
};
