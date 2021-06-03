import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteProductInCart: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { cartId, productId } = args;
      console.log('deleteProductInCart');
      try {
        await prisma.cart.delete({
          where:{
            id: +cartId
          }
        })
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
