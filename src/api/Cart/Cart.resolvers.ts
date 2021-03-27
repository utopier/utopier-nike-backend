import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Cart: {
    user: ({ id }) => prisma.cart.findFirst({ where: { id } }).user(),
    products: ({ id }) => prisma.cart.findFirst({ where: { id } }).product(),
    productCount: ({ id }) =>
      prisma.product.count({where:{cart:{every:{id}}}})
  },
};
