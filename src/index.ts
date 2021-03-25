import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import schema from './schema';
import { createServer } from 'http';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

// import './passport';
// import  authenticateJwt  from './passport';
// import  {isAuthenticated}  from './middlewares';

import events from 'events';
events.EventEmitter.defaultMaxListeners = 20;

const pubsub = new PubSub();
const server = new ApolloServer({
  schema,
  context: ({ req: request }) => ({ 
      request, 
    //   isAuthenticated, 
      pubsub }),
  tracing: true,
  playground:true,
  introspection:true,
  logger,
  debug:true,
});


const app = express();

app.use(cors());
app.use(logger('dev'));
// app.use(authenticateJwt);

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`Server Start http://localhost:${process.env.PORT || 4000}/graphql`)
);
