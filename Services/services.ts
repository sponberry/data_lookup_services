import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { Customer, Product } from '../types';

export class DataHandler {
    type: string;
    constructor(type: string) {
        this.type = type;
    }

    read() {}

    findEntry(_lookup: string) {}

    write(_newEntry: Customer | Product) {}
    
}

export class CsvAdaptor extends DataHandler {
    dataFile: string;
    constructor(type: string) {
        super(type);
        this.dataFile = this.returnFilePath();
    }

    returnFilePath() {
        switch (this.type) {
            case "customer":
                return "./Data/customers.csv";
            case "product":
                return "./Data/products.csv";
            default:
                return "./Data/customers.csv";
        }
    }

    read(): String[] {
        const dataArray: String[] = [];
        createReadStream(this.dataFile)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                console.log(row);
                dataArray.push(row);
            });
        return dataArray;
    }

    findEntry(_lookup: string) {
        // could be written if needed in the future
        // lookup is email for customer or vin for product
    }
 
    write() {
        // could be written if needed in the future
    }
}

export class DbAdaptor extends DataHandler {
    constructor(type: string) {
        super(type);
    }

    read() {

    }

    findEntry(_lookup: string) {
        // could be written if needed in the future
        // lookup is email for customer or vin for product
    }

    write(_newEntry: Customer | Product) {
        // could be written if needed in the future
    }
}