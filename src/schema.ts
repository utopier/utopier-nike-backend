import path from 'path';
import { makeExecutableSchema } from 'apollo-server-express';
import {
  fileLoader,
  mergeResolvers,
  mergeTypes,
} from 'merge-graphql-schemas';

const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers = fileLoader(path.join(__dirname, '/api/**/*.resolvers.*'));

const schema =  makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;