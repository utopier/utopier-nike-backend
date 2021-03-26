import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    editProfile: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username } = args;
      const { user } = request;
      return prisma.user.update({
        where: { id: user.id },
        data: { username },
      });
    },
  },
};
