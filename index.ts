const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
import { resolvers } from './Resolvers/resolvers';
import { readFileSync } from 'fs';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

// const mongoose = require("mongoose")

// const JWT_SECRET = process.env.JWT_SECRET
// const MONGODB_URI = process.env.DB_API_KEY
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//   .then(() => {
//     console.log("connected to MongoDB")
//   })
//   .catch((error) => {
//     console.log("error connection to MongoDB:", error.message)
//   })
// mongoose.set('debug', true)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(() => {
  console.log(`Server ready`)
})