import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Product: {
    descriptionPreview: ({ id }) =>
      prisma.product.findFirst({ where: { id } }).descriptionpreview(),
    imageUrls: ({ id }) =>
      prisma.product.findFirst({ where: { id } }).imageurl(),
    sizes: ({ id }) => prisma.product.findFirst({ where: { id } }).size(),
    productCode: ({ id }) =>
      prisma.product.findFirst({ where: { id } }).productcode(),
    likes: ({ id }) => prisma.product.findFirst({ where: { id } }).productlike(),
    reviews: ({ id }) => prisma.product.findFirst({ where: { id } }).review(),
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.productlike.findFirst({
        where:{id}
        // AND: [
        //   {
        //     user: {
        //       id: user.id,
        //     },
        //   },
        //   {
        //     product: {
        //       id,
        //     },
        //   },
        // ],
      }).user()
    },
    likeCount: ({ id }) => prisma.productlike.count({ where: { productId:  id  } }),
    reviewCount: ({ id }) =>
      prisma.review.count({ where: { productId: id  } }),
  },
};
