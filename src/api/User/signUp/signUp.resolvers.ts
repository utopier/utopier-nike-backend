import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default {
  Query:{
    test: () => 'test'
  },
  Mutation: {
    signUp: async (_, args) => {
      const { username, email } = args;
      console.log(username, email);
      const exists = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      console.log(exists);
      if (exists) {
        throw Error('This username / email is already taken');
      }
      const password = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          cart: {},
        },
      });
      // await prisma.cart.create({
      //   include: {
      //     User: {
      //       select: {
      //         id: user.id,
      //       },
      //     },
      //   },
      // });
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      return {
        token,
        user,
      };
    },
  },
};
