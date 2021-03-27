import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { commentId, username } = args;
      try {
        if (user.username === username) {
          await prisma.comment.delete({ where: { id: +commentId } });
          return true;
        } else {
          console.error('삭제할 권한이 없음');
          return false;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
