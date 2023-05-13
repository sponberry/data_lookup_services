export type DataObject = Customer | Product;
export type DataObjectArray = Customer[] | Product[];
export type Lookup = Customer["email"] | Product["vin"];
 
export interface Customer {
    email: string;
    forename: string;
    surname: string;
    contact_number: string;
    postcode: string;
}

export interface Product {
  vin: string;
  colour: string;
  make: string;
  model: string;
  price: number;
}
    
export interface Query {
    customerCount: number;
    allCustomers: [Customer];
    findCustomer(name: string): Customer;
}
