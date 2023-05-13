import { Product, Customer } from "./types";

export const isString = (text:unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isArrayofArrays = (data:unknown): data is string[][] => {
    return Array.isArray(data) && data.every(isStringArray);
};

export const isStringArray = (data:unknown): data is string[] => {
    return Array.isArray(data) && data.every(isString);
};

export const convertTextToNumber = (text:unknown): number => {
    if (!isString(text)) throw new Error('Data must be string to convert');
    const converted = Number(text);
    return converted;
}

export const parseArrayData = (data: unknown): string[][] => {
    if (!isArrayofArrays(data)) {
        throw new Error('Data in incorrect format, must be array of strings: ' + data);
    }

    return data;
};

// Type conversions for all objects below. Follow format for new data objects to be added.
export const toCustomer = (fieldsArray: string[]): Customer => {
    return {
        email: fieldsArray[0],
        forename: fieldsArray[1],
        surname: fieldsArray[2],
        contact_number: fieldsArray[3],
        postcode: fieldsArray[4]
    };
  };

export const toProduct = (fieldsArray: string[]): Product => {
    return {
        vin: fieldsArray[0],
        colour: fieldsArray[1],
        make: fieldsArray[2],
        model: fieldsArray[3],
        price: convertTextToNumber(fieldsArray[4])
    }
};