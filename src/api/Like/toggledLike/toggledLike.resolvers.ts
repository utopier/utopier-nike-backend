export default {
    Subscription: {
        toggledLike:  {
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator(["TOGGLED_LIKE"]),
        }
    }
}