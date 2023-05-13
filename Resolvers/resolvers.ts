import { CsvAdaptor, DbAdaptor, DataHandler } from "../Services/services";
import {DataObject, Lookup } from "../types";

export const resolvers = {
    Query: {
      allCustomers: () => {
        const customerResolver = new ObjectHandler('customer');
        return customerResolver.fetchAllEntries();
      },
      allProducts: () => {
        const productResolver = new ObjectHandler('product');
        return productResolver.fetchAllEntries();
      }
    }
  }

class ObjectHandler {
    adaptor: DataHandler;
    type: string;
    constructor(type: string) {
        this.adaptor = this.assignDataHandler(type);
        this.type = type;
    }

    assignDataHandler(type: string) {
        switch(process.env.DATA_SRC) {
            case "csv": 
                return new CsvAdaptor(type);
            case "db":
                return new DbAdaptor(type);
            default:
                return new CsvAdaptor(type);
        }
    }

    async fetchAllEntries() {
        return await this.adaptor.read();
    }

    async fetchSingleEntry(lookup: Lookup ) {
        await this.adaptor.findEntry(lookup);
    }

    async createNewEntry(newEntry: DataObject) {
        await this.adaptor.write(newEntry);
    }
};
