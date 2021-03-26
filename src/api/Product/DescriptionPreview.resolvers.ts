import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  DescriptionPreview: {
    product: ({ id }) =>
      prisma.descriptionpreview.findFirst({ where: { id } }).product(),
  },
};
