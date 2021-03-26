import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  ColorCode: {
    productCode: ({ id }) =>
      prisma.colorcode.findFirst({ where: { id } }).productcode(),
  },
};
