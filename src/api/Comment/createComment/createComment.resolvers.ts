import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    createComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { reviewId, text } = args;
      const newComment = await prisma.comment.create({
        data: {
          text,
          user: { connect: { id: +user.id } },
          review: { connect: { id: +reviewId } },
        },
      });
      console.log(newComment);
      return newComment;
    },
  },
};
