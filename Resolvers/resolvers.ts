import { CsvAdaptor, DbAdaptor, DataHandler } from "../Services/services";
import { Customer, Product } from "../types";

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
    constructor(type: string) {
        this.adaptor = this.assignDataHandler(type);
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
        await this.adaptor.read();
    }

    async fetchSingleEntry(lookup: Customer["email"] | Product["vin"] ) {
        await this.adaptor.findEntry(lookup);
    }

    async createNewEntry(newEntry: Customer | Product) {
        await this.adaptor.write(newEntry);
    }
};
