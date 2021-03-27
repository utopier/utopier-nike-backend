import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Review: {
    user: ({ id }) => prisma.review.findFirst({ where: { id } }).user(),
    product: ({ id }) => prisma.review.findFirst({ where: { id } }).product(),
    comments: ({ id }) => prisma.review.findFirst({ where: { id } }).comment(),
    commentCount: ({ id }) =>
      prisma.comment.count({
        where: {
          reviewId: id
        },
      }),
  },
};
