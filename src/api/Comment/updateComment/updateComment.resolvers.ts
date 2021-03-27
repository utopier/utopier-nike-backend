import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    updateComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { commentId, username, text } = args;
      const { user } = request;
      try {
        if (username === user.username) {
          const newComment = await prisma.comment.update({
            where: { id: +commentId },
            data: {
              text,
            },
          });
          return newComment;
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
