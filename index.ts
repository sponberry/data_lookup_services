const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
import { readFileSync } from 'fs';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

let persons = [
  {
    email: "tom.harding1974@gmail.co.uk",
    forename: "Tom",
    surname: "Harding",
    contact_number: 7938244758,
    postcode: "SS26GH"
  },
  {
    email: "drosmanahmed@pharmaceuticalsglobal.org",
    forename: "Osman",
    surname: "Ahmed",
    contact_number: 91719548839,
    postcode: "396210"
  },
]

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((url: Object) => {
  console.log(`Server ready at ${url}`)
})