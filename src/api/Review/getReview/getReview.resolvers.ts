import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getReview: async (_, args) => {
      const { reviewId } = args;
      return await prisma.review.findFirst({
        where: {
          id: +reviewId,
        },
      });
    },
  },
};
