import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import schema from './schema';
import { createServer } from 'http';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import './passport';
import  authenticateJwt  from './passport';
import  {isAuthenticated}  from './middlewares';

// import events from 'events';
// events.EventEmitter.defaultMaxListeners = 20;

const pubsub = new PubSub();
const server = new ApolloServer({
  schema,
  context: ({ req: request,res,connection }) => {
    console.log('ApolloServer context res : ', res);
    console.log('ApolloServer context connection connection : ', connection);
    return {
      request, 
      isAuthenticated, 
      pubsub }
    },
  tracing: true,
  playground:true,
  introspection:true,
  logger,
  debug:true,
});

const app = express();

app.use(cors({
  // origin: process.env.NODE_ENV === 'production' ? 'https://utopier.github.io' : true,
  origin: true,
  credentials: true,
}));
// ----- Custom Logger ------ //
// app.use(function(req, res, next){
//   console.log('custom logger req : ', req);
//   console.log('cusotm looger res : ', res);
//   next();
// })
app.use(logger('dev'));
app.use(authenticateJwt);

server.applyMiddleware({ 
  app, 
  path: '/' 
  });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`Server Start http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
);
