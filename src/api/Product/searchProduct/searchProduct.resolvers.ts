import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    searchProduct: async (_, args) =>{
      const products = await prisma.product.findMany({
        where:{
          OR:{
            title:args.term,
            subtitle: args.term
          }
        }
      })
      console.log(products);
      return products;
    }
  },
};
