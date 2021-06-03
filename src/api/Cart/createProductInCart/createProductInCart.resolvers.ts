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
        select:{
          id:true,
          product:{
            select:{
              price: true,
              imageurl: true,
              title: true,
              subtitle: true
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
      newProductInCart.product['imageUrls'] = newProductInCart.product['imageurl']
      const {imageurl, ...withoutImageurlData} = newProductInCart.product

      console.log('newProductInCart : ',newProductInCart)
      return {
        id: newProductInCart.id,
        product: withoutImageurlData
      };
    },
  },
};
