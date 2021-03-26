import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated,pubsub }) => {
      isAuthenticated(request);
      const { productId } = args;
      const { user } = request;

      try {
        const existingLike = await prisma.productlike.findFirst({
          where:{
            AND:{
              userId: user.id,
              productId: +productId
            }
          }
        });
        let likeData;
        console.log('existingLike : ',existingLike)
        if (existingLike) {
          likeData = await prisma.productlike.delete({
            where:{
              id:existingLike.id
            }
          });
          console.log(`deletedLike : `, likeData)
          pubsub.publish("TOGGLED_LIKE", { toggledLike:{status:'deleted', like: likeData}}); 
        } else {
          likeData = await prisma.productlike.create({
            data:{
              user:{
                connect:{
                  id:user.id
                }
              },
              product: {
                connect:{
                  id:+productId
                }
              }
            },
          });
          console.log('addedLike : ', likeData);
          pubsub.publish("TOGGLED_LIKE", { toggledLike:{status:'added',lkie: likeData}})
        }
        return {
          status: existingLike ? 'deleted' : 'added',
          like: likeData
        }
      } catch(e) {
        console.log(e);
        return false;
      }
    },
  },
};
