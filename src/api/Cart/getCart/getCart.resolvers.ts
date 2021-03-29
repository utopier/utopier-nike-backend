import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getCart: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      // user.id === cart.id
      return await prisma.cart.findMany({
        where: {
          userId: user.id
        },
      });
    },
  },
};
