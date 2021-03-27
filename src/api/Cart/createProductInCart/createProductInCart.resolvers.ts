import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    createProductInCart: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { productId , cartId } = args;
      const newProductInCart = await prisma.cart.create({
        data: {
          product: {
            connect: { id: +productId },
          },
          user:{
              connect:{id: +request.user.id}
          }
        },
        include:{
          product:{
            select:{
              imageurl:{
                take:1
              }
            }
          }
        }
        // select: {
        //   product: {
        //     where: {
        //       id:+productId
        //     },
        //     include: {
        //       imageurl:{take:1}
        //     }
        //   }
        // }
      });
      console.log('newProductInCart : ',newProductInCart)
      return newProductInCart.product[0];
    },
  },
};
