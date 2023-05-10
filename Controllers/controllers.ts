import { CsvAdaptor, DbAdaptor, DataHandler } from "../Services/services";
import { Customer, Product } from "../types";
// export class Product extends ObjectAbstract {
//     let type = "product";
// };

// export class Customer extends ObjectAbstract {
//     let type = "customer"
// };

export class ObjectHandler {
    adaptor: DataHandler;
    constructor(type: string) {
        this.adaptor = this.assignDataHandler(type);
    }

    assignDataHandler(type: string) {
        switch(process.env.DATA_SOURCE) {
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
