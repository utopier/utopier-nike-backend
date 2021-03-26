import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  ProductCode: {
    styleCode: ({ id }) =>
      prisma.productcode.findFirst({ where: { id } }).colorcode,
  },
};
