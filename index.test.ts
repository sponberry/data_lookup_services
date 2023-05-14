import {expect, test} from '@jest/globals';
const { ApolloServer } = require('@apollo/server');
import { resolvers } from './Resolvers/resolvers';
import { readFileSync } from 'fs';
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const queries = {
  GetCustomers: `query GetCustomers {
    allCustomers {
      forename
      surname
      contact_number
      email
      postcode
    }
  }`,
  GetProducts: `query GetProducts {
    allProducts {
      vin
      colour
      make
      model
      price
    }
  }`
}

test("respond to customer data query with correct data", async function() {
    const result = await server.executeOperation({
        query: queries.GetCustomers,
      });
      
      expect(result.errors).toBeUndefined();
      expect(result.body).toHaveProperty('singleResult');
      expect(result.body?.singleResult).toHaveProperty('data');
      expect(result.body?.singleResult?.data?.allCustomers[0].email).toBe('tom.harding1974@gmail.co.uk');
});

test("respond to product data query with correct data", async function() {
    const result = await server.executeOperation({
        query: queries.GetProducts,
      });
      
      expect(result.errors).toBeUndefined();
      expect(result.body).toHaveProperty('singleResult');
      expect(result.body?.singleResult).toHaveProperty('data');
      expect(result.body?.singleResult?.data?.allProducts[0].vin).toBe('WVGCV7AX7AW000784');
});
