import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { DataObject, DataObjectArray, Customer, Product } from '../types';
import { parseArrayData, toCustomer, toProduct } from '../utils';
// const ProductEntry = require('./Models/product');

export class DataHandler {
    type: string;
    constructor(type: string) {
        this.type = type;
    }

    read() {}

    findEntry(_lookup: string) {}

    write(_newEntry: DataObject) {}

    parseFromCSVFile = function (filename: string) {
        return new Promise(function (resolve, reject) {
            let dataArray: any = []
            createReadStream(filename)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                    dataArray.push(row);
                })
                .on('end', () => {
                    resolve(dataArray);                    
                })
                .on("error", (error) => {
                    reject({message: error.message})
                })
        });
    }
    
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

    convertData(parsedArrays: string[][]) {
        switch (this.type) {
            case 'customer': 
                return parsedArrays.map((objectArray): Customer => {
                    return toCustomer(objectArray);
                })
            case 'product': 
                return parsedArrays.map((objectArray): Product => {
                    return toProduct(objectArray);
                })
            default:
                return parsedArrays.map((objectArray): Customer => {
                    return toCustomer(objectArray);
                })
        }
    }

    async read(): Promise<DataObjectArray> {
        // returns promise
        const dataPromise = this.parseFromCSVFile(this.dataFile);
        // returns array of arrays
        const dataArrays = await Promise.resolve(dataPromise);
        // validates an array of arrays
        const parsedArrays = parseArrayData(dataArrays);
        // returns array of type-validated data objects of same type
        const queryDataObjects : DataObjectArray =  this.convertData(parsedArrays);
                
        console.log(queryDataObjects);
        return queryDataObjects;
    }

    findEntry(_lookup: string) {
        // could be written if needed in the future
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
        switch (this.type) {
            case "customer":
                 // CustomerEntry.find({});
            case "product":
                 // return ProductEntry.find({});
            default:
                 // return ProductEntry.find({});
        }
    }

    findEntry(_lookup: string) {
        // could be written if needed in the future
    }

    write(_newEntry: DataObject) {
        // could be written if needed in the future
    }
}