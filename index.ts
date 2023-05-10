const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
import { readFileSync, createReadStream } from 'fs';
import { parse } from 'csv-parse';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
import { Product, Customer } from './Controllers/controllers';

// use string interpolation to create data from correct source
// define what sources are available somewhere (e.g. customers, products)
// how can i match these rows to the graphql types?
// should be a separate file/function
createReadStream("./Data/customers.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
  });

  // define each type in it's own file??
  // documentation to tell you how to extend to more objects
let customers = [
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

let products = [
  {
    vin: "WVGCV7AX7AW000784",
    colour: "Red",
    make: "Ford",
    model: "Fiesta",
    price: 10000
  },
]
// Controllers are part of presentation layer, while services are part of model layer
// MVC

// Entry/presentation => query
// Controller => Class determines action based on request type
// Service => DB or CSV Adapter gathers data and sends it back to frontent based on request and type

// typeDefs are models

// resolver is service - these need to be separate as essentially they are the 'routes' 
const resolvers = {
  Query: {
    customerCount: () => customers.length,
    allCustomers: () => customers,
    allProducts: () => {
      const productResolver = new Product();
      return productResolver.fetchAllEntries();
    }
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