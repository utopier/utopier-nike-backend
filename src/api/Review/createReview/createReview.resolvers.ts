import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    createReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { title, body, productId } = args;
      const review = await prisma.review.create({
        data: {
          title,
          body,
          user: { connect: { id: +user.id } },
          product: { connect: { id: +productId } },
        },
      });
      return review;
    },
  },
};
