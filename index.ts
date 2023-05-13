const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
import { resolvers } from './Resolvers/resolvers';
import { readFileSync } from 'fs';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((url: Object) => {
  console.log(`Server ready at ${url}`)
})