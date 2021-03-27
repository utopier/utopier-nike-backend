import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getComments: async (_, args, { request, isAuthenticated }) => {
      const { reviewId } = args;
      const comments = await prisma.comment.findMany({
        where: {
          reviewId:+reviewId
        }
      })
      console.log(comments);
      return comments;
    },
  },
};
