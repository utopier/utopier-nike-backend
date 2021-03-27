import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getComment: async (_, args) => {
      const { commentId } = args;
      return await prisma.comment.findFirst({
        where: {
          id: +commentId,
        },
      });
    },
  },
};
