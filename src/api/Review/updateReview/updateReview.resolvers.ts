import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    updateReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { reviewId, username, title, body } = args;
      const { user } = request;
      try {
        if (username === user.username) {
          await prisma.review.update({
            where: { id: +reviewId },
            data: {
              title,
              body,
            },
          });
          return true;
        } else {
          console.log('수정할 권한이 없음');
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
