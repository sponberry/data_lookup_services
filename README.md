## Table of Contents

- [Background / Overview](#background--overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Authors](#authors)
- [Extension - Data Types](#extension---data-types)
- [Extension - Data Sources](#extension---data-sources)

## Background / Overview

This project sets up a simple GraphQl server that can be used to query on one or more data points. It is intially set up to query on products and customers, but can be extended to more data types if required following the instructions in [Extension - Data Types](#extension---data-types)

## Features

- Data Types
  - Products
  - Customers
  - Can be extended through creation of further types and queries (see [Extension - Data Types](#extension---data-types))
- Data Sources
  - CSV
  - MongoDB Document Database
  - Can be extended as required by changing .env file (see [Extension - Data Sources](#extension---data-sources))

## Prerequisites

You will need the following installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

### Installation

Install all the packages

```sh
$ npm install
```

## Authors

- [**Abigail Nottingham**](https://github.com/sponberry)

## Extension - Data Types

Currently queries can be made on customers and products, either from a CSV or DB. Types and queries are pre-defined for these data types.
Further data types can be set up with the existing server functionality if required. New types will need to be defined, as well as queries and changes to resolvers and services. You can do so following these steps:

- [ ] Add your new data object to ./schema.graphql, Customer and Product can be used as examples
- [ ] Add a corresponding type to ./types.ts
- [ ] Extend the existing generic data types in ./types.ts to include your new data object. DataObject, DataObjectArray and Lookup types will all need to be extended. Lookup will need to use an appropriate, unique property on your data object. If no such unique propert exists, it is advisable to add an ID to your data records.
- [ ] Create a type checking function in ./utils.ts. Customer and Product can be used as examples. All properties should be typed to match your defined schema and types on the returned object.
- [ ] Add appropriate queries for your data in ./Resolvers/resolvers.ts. The ObjectHandler class can be used by passing a new string argument matching the data type to be added.
- [ ] Both CsvAdaptor and DbAdaptor in ./Services/services.ts will need to have new data types added to a case in switch statements to ensure the appropriate checks and data return can happen in the resolver. Use the string argument passed to ObjectHandler to match against.

## Extension - Data Sources

Data can be sourced from CSV files in the ./Data folder or from a DB. Modules are installed to use MongoDB document database which works well alongside a typed GraphQL server, where GraphQL and MongoDB schemas can be matched up. An example of this is provided in ./Models/product.ts.

To finish set up of MongoDB:

- [ ] Create your MongoDB database and obtain the DB URL, JWT secret and API key. Enter these details into the .env file.
- [ ] Uncomment MongoDB code in both ./index.ts and ./Services/services.ts
- [ ] Create all MongoDB schemas required in the ./Models folder. [MongoDB Schema Documentation](https://)
- [ ] Add appropriate function calls on these in ./Services/services, an example has been provided for Product.

To add further data sources:

- [ ] Define your data source in the .env file
- [ ] DB URLs should be added to the .env file
- [ ] If one of the existing data handlers (DbAdaptor or CsvAdaptor) do not fit the needs of the new data source, follow the next steps
- [ ] In ./Resolvers/resolvers/ts add a new case in the switch statement for defining adaptors
- [ ] A matching adaptor type will need to be created in ./Services/services.ts that extends the DataHandler class and implements the same functions as DbAdaptor and CsvAdaptor
- [ ] Run tests to ensure data is still being returned in the correct format
