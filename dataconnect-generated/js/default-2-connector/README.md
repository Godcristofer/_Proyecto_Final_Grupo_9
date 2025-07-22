# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default-2`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`default-2-connector/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListProducts*](#listproducts)
  - [*GetProduct*](#getproduct)
  - [*ListProductsByCategory*](#listproductsbycategory)
  - [*ListUsers*](#listusers)
  - [*getUserById*](#getuserbyid)
  - [*ListSales*](#listsales)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*updateUserRole*](#updateuserrole)
  - [*CreateSale*](#createsale)
  - [*CreateSaleDetail*](#createsaledetail)
  - [*CreateShipment*](#createshipment)
  - [*updateShipmentStatus*](#updateshipmentstatus)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default-2`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-2-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-2-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-2-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default-2` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListProducts
You can execute the `ListProducts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
listProducts(): QueryPromise<ListProductsData, undefined>;

interface ListProductsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsData, undefined>;
}
export const listProductsRef: ListProductsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProducts(dc: DataConnect): QueryPromise<ListProductsData, undefined>;

interface ListProductsRef {
  ...
  (dc: DataConnect): QueryRef<ListProductsData, undefined>;
}
export const listProductsRef: ListProductsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProductsRef:
```typescript
const name = listProductsRef.operationName;
console.log(name);
```

### Variables
The `ListProducts` query has no variables.
### Return Type
Recall that executing the `ListProducts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProductsData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProductsData {
  productss: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    image?: string | null;
    category?: string | null;
  } & Products_Key)[];
}
```
### Using `ListProducts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProducts } from '@firebasegen/default-2-connector';


// Call the `listProducts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProducts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProducts(dataConnect);

console.log(data.productss);

// Or, you can use the `Promise` API.
listProducts().then((response) => {
  const data = response.data;
  console.log(data.productss);
});
```

### Using `ListProducts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProductsRef } from '@firebasegen/default-2-connector';


// Call the `listProductsRef()` function to get a reference to the query.
const ref = listProductsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProductsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.productss);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.productss);
});
```

## GetProduct
You can execute the `GetProduct` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
getProduct(): QueryPromise<GetProductData, undefined>;

interface GetProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetProductData, undefined>;
}
export const getProductRef: GetProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProduct(dc: DataConnect): QueryPromise<GetProductData, undefined>;

interface GetProductRef {
  ...
  (dc: DataConnect): QueryRef<GetProductData, undefined>;
}
export const getProductRef: GetProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductRef:
```typescript
const name = getProductRef.operationName;
console.log(name);
```

### Variables
The `GetProduct` query has no variables.
### Return Type
Recall that executing the `GetProduct` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProductData {
  products?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    image?: string | null;
    category?: string | null;
  } & Products_Key;
}
```
### Using `GetProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProduct } from '@firebasegen/default-2-connector';


// Call the `getProduct()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProduct();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProduct(dataConnect);

console.log(data.products);

// Or, you can use the `Promise` API.
getProduct().then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `GetProduct`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductRef } from '@firebasegen/default-2-connector';


// Call the `getProductRef()` function to get a reference to the query.
const ref = getProductRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## ListProductsByCategory
You can execute the `ListProductsByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
listProductsByCategory(): QueryPromise<ListProductsByCategoryData, undefined>;

interface ListProductsByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsByCategoryData, undefined>;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProductsByCategory(dc: DataConnect): QueryPromise<ListProductsByCategoryData, undefined>;

interface ListProductsByCategoryRef {
  ...
  (dc: DataConnect): QueryRef<ListProductsByCategoryData, undefined>;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProductsByCategoryRef:
```typescript
const name = listProductsByCategoryRef.operationName;
console.log(name);
```

### Variables
The `ListProductsByCategory` query has no variables.
### Return Type
Recall that executing the `ListProductsByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProductsByCategoryData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProductsByCategoryData {
  productss: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    image?: string | null;
    category?: string | null;
  } & Products_Key)[];
}
```
### Using `ListProductsByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProductsByCategory } from '@firebasegen/default-2-connector';


// Call the `listProductsByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProductsByCategory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProductsByCategory(dataConnect);

console.log(data.productss);

// Or, you can use the `Promise` API.
listProductsByCategory().then((response) => {
  const data = response.data;
  console.log(data.productss);
});
```

### Using `ListProductsByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProductsByCategoryRef } from '@firebasegen/default-2-connector';


// Call the `listProductsByCategoryRef()` function to get a reference to the query.
const ref = listProductsByCategoryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProductsByCategoryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.productss);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.productss);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
listUsers(): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  userss: ({
    id: string;
    name?: string | null;
    email: string;
    createdAt: TimestampString;
    dni?: string | null;
    phone?: string | null;
  } & Users_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@firebasegen/default-2-connector';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.userss);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.userss);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@firebasegen/default-2-connector';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userss);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userss);
});
```

## getUserById
You can execute the `getUserById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
getUserById(vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserById(dc: DataConnect, vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByIdRef:
```typescript
const name = getUserByIdRef.operationName;
console.log(name);
```

### Variables
The `getUserById` query requires an argument of type `GetUserByIdVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByIdVariables {
  id: string;
}
```
### Return Type
Recall that executing the `getUserById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByIdData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserByIdData {
  users?: {
    id: string;
    name?: string | null;
    email: string;
    role?: string | null;
    createdAt: TimestampString;
    dni?: string | null;
    phone?: string | null;
  } & Users_Key;
}
```
### Using `getUserById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserById, GetUserByIdVariables } from '@firebasegen/default-2-connector';

// The `getUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserById(getUserByIdVars);
// Variables can be defined inline as well.
const { data } = await getUserById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserById(dataConnect, getUserByIdVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserById(getUserByIdVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `getUserById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByIdRef, GetUserByIdVariables } from '@firebasegen/default-2-connector';

// The `getUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserByIdRef()` function to get a reference to the query.
const ref = getUserByIdRef(getUserByIdVars);
// Variables can be defined inline as well.
const ref = getUserByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByIdRef(dataConnect, getUserByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListSales
You can execute the `ListSales` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
listSales(): QueryPromise<ListSalesData, undefined>;

interface ListSalesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSalesData, undefined>;
}
export const listSalesRef: ListSalesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSales(dc: DataConnect): QueryPromise<ListSalesData, undefined>;

interface ListSalesRef {
  ...
  (dc: DataConnect): QueryRef<ListSalesData, undefined>;
}
export const listSalesRef: ListSalesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSalesRef:
```typescript
const name = listSalesRef.operationName;
console.log(name);
```

### Variables
The `ListSales` query has no variables.
### Return Type
Recall that executing the `ListSales` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSalesData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSalesData {
  saless: ({
    id: UUIDString;
    saleDate: DateString;
    total: number;
    user: {
      name?: string | null;
      email: string;
    };
      saleDetailss_on_sale: ({
        id: UUIDString;
        product: {
          name: string;
          price: number;
        };
          quantity: number;
          subtotal: number;
      } & SaleDetails_Key)[];
        shipments_on_sale?: {
          id: UUIDString;
          address: string;
          city: string;
          status: string;
          shippedAt?: TimestampString | null;
          deliveredAt?: TimestampString | null;
        } & Shipments_Key;
  } & Sales_Key)[];
}
```
### Using `ListSales`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSales } from '@firebasegen/default-2-connector';


// Call the `listSales()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSales();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSales(dataConnect);

console.log(data.saless);

// Or, you can use the `Promise` API.
listSales().then((response) => {
  const data = response.data;
  console.log(data.saless);
});
```

### Using `ListSales`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSalesRef } from '@firebasegen/default-2-connector';


// Call the `listSalesRef()` function to get a reference to the query.
const ref = listSalesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSalesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.saless);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.saless);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default-2` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  id: string;
  email: string;
  name?: string | null;
  dni?: string | null;
  phone?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  users_insert: Users_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@firebasegen/default-2-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  id: ..., 
  email: ..., 
  name: ..., // optional
  dni: ..., // optional
  phone: ..., // optional
  role: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ id: ..., email: ..., name: ..., dni: ..., phone: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.users_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.users_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@firebasegen/default-2-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  id: ..., 
  email: ..., 
  name: ..., // optional
  dni: ..., // optional
  phone: ..., // optional
  role: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ id: ..., email: ..., name: ..., dni: ..., phone: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.users_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.users_insert);
});
```

## updateUserRole
You can execute the `updateUserRole` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
}
export const updateUserRoleRef: UpdateUserRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserRoleRef {
  ...
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
}
export const updateUserRoleRef: UpdateUserRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRoleRef:
```typescript
const name = updateUserRoleRef.operationName;
console.log(name);
```

### Variables
The `updateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserRoleVariables {
  id: string;
  role: string;
}
```
### Return Type
Recall that executing the `updateUserRole` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserRoleData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserRoleData {
  users_update?: Users_Key | null;
}
```
### Using `updateUserRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserRole, UpdateUserRoleVariables } from '@firebasegen/default-2-connector';

// The `updateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`:
const updateUserRoleVars: UpdateUserRoleVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateUserRole()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserRole(updateUserRoleVars);
// Variables can be defined inline as well.
const { data } = await updateUserRole({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserRole(dataConnect, updateUserRoleVars);

console.log(data.users_update);

// Or, you can use the `Promise` API.
updateUserRole(updateUserRoleVars).then((response) => {
  const data = response.data;
  console.log(data.users_update);
});
```

### Using `updateUserRole`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRoleRef, UpdateUserRoleVariables } from '@firebasegen/default-2-connector';

// The `updateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`:
const updateUserRoleVars: UpdateUserRoleVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateUserRoleRef()` function to get a reference to the mutation.
const ref = updateUserRoleRef(updateUserRoleVars);
// Variables can be defined inline as well.
const ref = updateUserRoleRef({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRoleRef(dataConnect, updateUserRoleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.users_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.users_update);
});
```

## CreateSale
You can execute the `CreateSale` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
createSale(vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;

interface CreateSaleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
}
export const createSaleRef: CreateSaleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSale(dc: DataConnect, vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;

interface CreateSaleRef {
  ...
  (dc: DataConnect, vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
}
export const createSaleRef: CreateSaleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSaleRef:
```typescript
const name = createSaleRef.operationName;
console.log(name);
```

### Variables
The `CreateSale` mutation requires an argument of type `CreateSaleVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSaleVariables {
  userId: string;
  saleDate: DateString;
  total: number;
}
```
### Return Type
Recall that executing the `CreateSale` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSaleData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSaleData {
  sales_insert: Sales_Key;
}
```
### Using `CreateSale`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSale, CreateSaleVariables } from '@firebasegen/default-2-connector';

// The `CreateSale` mutation requires an argument of type `CreateSaleVariables`:
const createSaleVars: CreateSaleVariables = {
  userId: ..., 
  saleDate: ..., 
  total: ..., 
};

// Call the `createSale()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSale(createSaleVars);
// Variables can be defined inline as well.
const { data } = await createSale({ userId: ..., saleDate: ..., total: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSale(dataConnect, createSaleVars);

console.log(data.sales_insert);

// Or, you can use the `Promise` API.
createSale(createSaleVars).then((response) => {
  const data = response.data;
  console.log(data.sales_insert);
});
```

### Using `CreateSale`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSaleRef, CreateSaleVariables } from '@firebasegen/default-2-connector';

// The `CreateSale` mutation requires an argument of type `CreateSaleVariables`:
const createSaleVars: CreateSaleVariables = {
  userId: ..., 
  saleDate: ..., 
  total: ..., 
};

// Call the `createSaleRef()` function to get a reference to the mutation.
const ref = createSaleRef(createSaleVars);
// Variables can be defined inline as well.
const ref = createSaleRef({ userId: ..., saleDate: ..., total: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSaleRef(dataConnect, createSaleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sales_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sales_insert);
});
```

## CreateSaleDetail
You can execute the `CreateSaleDetail` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
createSaleDetail(vars: CreateSaleDetailVariables): MutationPromise<CreateSaleDetailData, CreateSaleDetailVariables>;

interface CreateSaleDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSaleDetailVariables): MutationRef<CreateSaleDetailData, CreateSaleDetailVariables>;
}
export const createSaleDetailRef: CreateSaleDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSaleDetail(dc: DataConnect, vars: CreateSaleDetailVariables): MutationPromise<CreateSaleDetailData, CreateSaleDetailVariables>;

interface CreateSaleDetailRef {
  ...
  (dc: DataConnect, vars: CreateSaleDetailVariables): MutationRef<CreateSaleDetailData, CreateSaleDetailVariables>;
}
export const createSaleDetailRef: CreateSaleDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSaleDetailRef:
```typescript
const name = createSaleDetailRef.operationName;
console.log(name);
```

### Variables
The `CreateSaleDetail` mutation requires an argument of type `CreateSaleDetailVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSaleDetailVariables {
  saleId: UUIDString;
  productId: UUIDString;
  quantity: number;
  subtotal: number;
}
```
### Return Type
Recall that executing the `CreateSaleDetail` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSaleDetailData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSaleDetailData {
  saleDetails_insert: SaleDetails_Key;
}
```
### Using `CreateSaleDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSaleDetail, CreateSaleDetailVariables } from '@firebasegen/default-2-connector';

// The `CreateSaleDetail` mutation requires an argument of type `CreateSaleDetailVariables`:
const createSaleDetailVars: CreateSaleDetailVariables = {
  saleId: ..., 
  productId: ..., 
  quantity: ..., 
  subtotal: ..., 
};

// Call the `createSaleDetail()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSaleDetail(createSaleDetailVars);
// Variables can be defined inline as well.
const { data } = await createSaleDetail({ saleId: ..., productId: ..., quantity: ..., subtotal: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSaleDetail(dataConnect, createSaleDetailVars);

console.log(data.saleDetails_insert);

// Or, you can use the `Promise` API.
createSaleDetail(createSaleDetailVars).then((response) => {
  const data = response.data;
  console.log(data.saleDetails_insert);
});
```

### Using `CreateSaleDetail`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSaleDetailRef, CreateSaleDetailVariables } from '@firebasegen/default-2-connector';

// The `CreateSaleDetail` mutation requires an argument of type `CreateSaleDetailVariables`:
const createSaleDetailVars: CreateSaleDetailVariables = {
  saleId: ..., 
  productId: ..., 
  quantity: ..., 
  subtotal: ..., 
};

// Call the `createSaleDetailRef()` function to get a reference to the mutation.
const ref = createSaleDetailRef(createSaleDetailVars);
// Variables can be defined inline as well.
const ref = createSaleDetailRef({ saleId: ..., productId: ..., quantity: ..., subtotal: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSaleDetailRef(dataConnect, createSaleDetailVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.saleDetails_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.saleDetails_insert);
});
```

## CreateShipment
You can execute the `CreateShipment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
createShipment(vars: CreateShipmentVariables): MutationPromise<CreateShipmentData, CreateShipmentVariables>;

interface CreateShipmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateShipmentVariables): MutationRef<CreateShipmentData, CreateShipmentVariables>;
}
export const createShipmentRef: CreateShipmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createShipment(dc: DataConnect, vars: CreateShipmentVariables): MutationPromise<CreateShipmentData, CreateShipmentVariables>;

interface CreateShipmentRef {
  ...
  (dc: DataConnect, vars: CreateShipmentVariables): MutationRef<CreateShipmentData, CreateShipmentVariables>;
}
export const createShipmentRef: CreateShipmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createShipmentRef:
```typescript
const name = createShipmentRef.operationName;
console.log(name);
```

### Variables
The `CreateShipment` mutation requires an argument of type `CreateShipmentVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateShipmentVariables {
  saleId: UUIDString;
  address: string;
  city: string;
}
```
### Return Type
Recall that executing the `CreateShipment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateShipmentData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateShipmentData {
  shipments_insert: Shipments_Key;
}
```
### Using `CreateShipment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createShipment, CreateShipmentVariables } from '@firebasegen/default-2-connector';

// The `CreateShipment` mutation requires an argument of type `CreateShipmentVariables`:
const createShipmentVars: CreateShipmentVariables = {
  saleId: ..., 
  address: ..., 
  city: ..., 
};

// Call the `createShipment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createShipment(createShipmentVars);
// Variables can be defined inline as well.
const { data } = await createShipment({ saleId: ..., address: ..., city: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createShipment(dataConnect, createShipmentVars);

console.log(data.shipments_insert);

// Or, you can use the `Promise` API.
createShipment(createShipmentVars).then((response) => {
  const data = response.data;
  console.log(data.shipments_insert);
});
```

### Using `CreateShipment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createShipmentRef, CreateShipmentVariables } from '@firebasegen/default-2-connector';

// The `CreateShipment` mutation requires an argument of type `CreateShipmentVariables`:
const createShipmentVars: CreateShipmentVariables = {
  saleId: ..., 
  address: ..., 
  city: ..., 
};

// Call the `createShipmentRef()` function to get a reference to the mutation.
const ref = createShipmentRef(createShipmentVars);
// Variables can be defined inline as well.
const ref = createShipmentRef({ saleId: ..., address: ..., city: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createShipmentRef(dataConnect, createShipmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shipments_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shipments_insert);
});
```

## updateShipmentStatus
You can execute the `updateShipmentStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
updateShipmentStatus(vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

interface UpdateShipmentStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
}
export const updateShipmentStatusRef: UpdateShipmentStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateShipmentStatus(dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

interface UpdateShipmentStatusRef {
  ...
  (dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
}
export const updateShipmentStatusRef: UpdateShipmentStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateShipmentStatusRef:
```typescript
const name = updateShipmentStatusRef.operationName;
console.log(name);
```

### Variables
The `updateShipmentStatus` mutation requires an argument of type `UpdateShipmentStatusVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateShipmentStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `updateShipmentStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateShipmentStatusData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateShipmentStatusData {
  shipments_update?: Shipments_Key | null;
}
```
### Using `updateShipmentStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateShipmentStatus, UpdateShipmentStatusVariables } from '@firebasegen/default-2-connector';

// The `updateShipmentStatus` mutation requires an argument of type `UpdateShipmentStatusVariables`:
const updateShipmentStatusVars: UpdateShipmentStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateShipmentStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateShipmentStatus(updateShipmentStatusVars);
// Variables can be defined inline as well.
const { data } = await updateShipmentStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateShipmentStatus(dataConnect, updateShipmentStatusVars);

console.log(data.shipments_update);

// Or, you can use the `Promise` API.
updateShipmentStatus(updateShipmentStatusVars).then((response) => {
  const data = response.data;
  console.log(data.shipments_update);
});
```

### Using `updateShipmentStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateShipmentStatusRef, UpdateShipmentStatusVariables } from '@firebasegen/default-2-connector';

// The `updateShipmentStatus` mutation requires an argument of type `UpdateShipmentStatusVariables`:
const updateShipmentStatusVars: UpdateShipmentStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateShipmentStatusRef()` function to get a reference to the mutation.
const ref = updateShipmentStatusRef(updateShipmentStatusVars);
// Variables can be defined inline as well.
const ref = updateShipmentStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateShipmentStatusRef(dataConnect, updateShipmentStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shipments_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shipments_update);
});
```

