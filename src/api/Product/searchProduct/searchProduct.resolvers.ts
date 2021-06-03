import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    searchProduct: async (_, args) =>{
      console.log(args.term);
      const products = await prisma.product.findMany({
        where:{
          title: {
            contains: args.term
          }
        }
      })
      console.log(products);
      return products;
    }
  },
};
