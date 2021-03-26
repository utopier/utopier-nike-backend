import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Query: {
    getProducts: async (_, {filter, skip, take, orderBy}, { request, isAuthenticated }) => {
      try{
        const where = filter ? { title: filter } : {}
        
        const products = await prisma.product.findMany({
          where,
          skip,
          take,
          orderBy
        })
        console.log(products);
        return products;

      } catch(e) {
        console.log(e)
        return false;
      }
    },
  },
};
