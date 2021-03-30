import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  User: {
    cart: ({ id }) => prisma.user.findFirst({ where: { id } }).cart(),
    likes: ({ id }) => prisma.user.findFirst({ where: { id } }).productlike(),
    reviews: ({ id }) => prisma.user.findFirst({ where: { id } }).review(),
    comments: ({ id }) => prisma.user.findFirst({ where: { id } }).comment(),
  },
};
