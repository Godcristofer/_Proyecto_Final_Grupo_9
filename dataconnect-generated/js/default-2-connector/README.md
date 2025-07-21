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
- [**Mutations**](#mutations)
  - [*CreateCart*](#createcart)
  - [*AddItemToCart*](#additemtocart)
  - [*UpdateCartItemQuantity*](#updatecartitemquantity)
  - [*DeleteCartItem*](#deletecartitem)

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
    id: UUIDString;
    name?: string | null;
    email: string;
    createdAt: TimestampString;
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

## CreateCart
You can execute the `CreateCart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
createCart(vars: CreateCartVariables): MutationPromise<CreateCartData, CreateCartVariables>;

interface CreateCartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCartVariables): MutationRef<CreateCartData, CreateCartVariables>;
}
export const createCartRef: CreateCartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCart(dc: DataConnect, vars: CreateCartVariables): MutationPromise<CreateCartData, CreateCartVariables>;

interface CreateCartRef {
  ...
  (dc: DataConnect, vars: CreateCartVariables): MutationRef<CreateCartData, CreateCartVariables>;
}
export const createCartRef: CreateCartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCartRef:
```typescript
const name = createCartRef.operationName;
console.log(name);
```

### Variables
The `CreateCart` mutation requires an argument of type `CreateCartVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCartVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateCart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCartData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCartData {
  shoppingCarts_insert: ShoppingCarts_Key;
}
```
### Using `CreateCart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCart, CreateCartVariables } from '@firebasegen/default-2-connector';

// The `CreateCart` mutation requires an argument of type `CreateCartVariables`:
const createCartVars: CreateCartVariables = {
  userId: ..., 
};

// Call the `createCart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCart(createCartVars);
// Variables can be defined inline as well.
const { data } = await createCart({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCart(dataConnect, createCartVars);

console.log(data.shoppingCarts_insert);

// Or, you can use the `Promise` API.
createCart(createCartVars).then((response) => {
  const data = response.data;
  console.log(data.shoppingCarts_insert);
});
```

### Using `CreateCart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCartRef, CreateCartVariables } from '@firebasegen/default-2-connector';

// The `CreateCart` mutation requires an argument of type `CreateCartVariables`:
const createCartVars: CreateCartVariables = {
  userId: ..., 
};

// Call the `createCartRef()` function to get a reference to the mutation.
const ref = createCartRef(createCartVars);
// Variables can be defined inline as well.
const ref = createCartRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCartRef(dataConnect, createCartVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shoppingCarts_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shoppingCarts_insert);
});
```

## AddItemToCart
You can execute the `AddItemToCart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
addItemToCart(vars: AddItemToCartVariables): MutationPromise<AddItemToCartData, AddItemToCartVariables>;

interface AddItemToCartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddItemToCartVariables): MutationRef<AddItemToCartData, AddItemToCartVariables>;
}
export const addItemToCartRef: AddItemToCartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addItemToCart(dc: DataConnect, vars: AddItemToCartVariables): MutationPromise<AddItemToCartData, AddItemToCartVariables>;

interface AddItemToCartRef {
  ...
  (dc: DataConnect, vars: AddItemToCartVariables): MutationRef<AddItemToCartData, AddItemToCartVariables>;
}
export const addItemToCartRef: AddItemToCartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addItemToCartRef:
```typescript
const name = addItemToCartRef.operationName;
console.log(name);
```

### Variables
The `AddItemToCart` mutation requires an argument of type `AddItemToCartVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddItemToCartVariables {
  cartId: UUIDString;
  productId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `AddItemToCart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddItemToCartData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddItemToCartData {
  shoppingCartItems_insert: ShoppingCartItems_Key;
}
```
### Using `AddItemToCart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addItemToCart, AddItemToCartVariables } from '@firebasegen/default-2-connector';

// The `AddItemToCart` mutation requires an argument of type `AddItemToCartVariables`:
const addItemToCartVars: AddItemToCartVariables = {
  cartId: ..., 
  productId: ..., 
  quantity: ..., 
};

// Call the `addItemToCart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addItemToCart(addItemToCartVars);
// Variables can be defined inline as well.
const { data } = await addItemToCart({ cartId: ..., productId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addItemToCart(dataConnect, addItemToCartVars);

console.log(data.shoppingCartItems_insert);

// Or, you can use the `Promise` API.
addItemToCart(addItemToCartVars).then((response) => {
  const data = response.data;
  console.log(data.shoppingCartItems_insert);
});
```

### Using `AddItemToCart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addItemToCartRef, AddItemToCartVariables } from '@firebasegen/default-2-connector';

// The `AddItemToCart` mutation requires an argument of type `AddItemToCartVariables`:
const addItemToCartVars: AddItemToCartVariables = {
  cartId: ..., 
  productId: ..., 
  quantity: ..., 
};

// Call the `addItemToCartRef()` function to get a reference to the mutation.
const ref = addItemToCartRef(addItemToCartVars);
// Variables can be defined inline as well.
const ref = addItemToCartRef({ cartId: ..., productId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addItemToCartRef(dataConnect, addItemToCartVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shoppingCartItems_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shoppingCartItems_insert);
});
```

## UpdateCartItemQuantity
You can execute the `UpdateCartItemQuantity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
updateCartItemQuantity(vars: UpdateCartItemQuantityVariables): MutationPromise<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;

interface UpdateCartItemQuantityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCartItemQuantityVariables): MutationRef<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;
}
export const updateCartItemQuantityRef: UpdateCartItemQuantityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCartItemQuantity(dc: DataConnect, vars: UpdateCartItemQuantityVariables): MutationPromise<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;

interface UpdateCartItemQuantityRef {
  ...
  (dc: DataConnect, vars: UpdateCartItemQuantityVariables): MutationRef<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;
}
export const updateCartItemQuantityRef: UpdateCartItemQuantityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCartItemQuantityRef:
```typescript
const name = updateCartItemQuantityRef.operationName;
console.log(name);
```

### Variables
The `UpdateCartItemQuantity` mutation requires an argument of type `UpdateCartItemQuantityVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCartItemQuantityVariables {
  itemId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `UpdateCartItemQuantity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCartItemQuantityData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCartItemQuantityData {
  shoppingCartItems_update?: ShoppingCartItems_Key | null;
}
```
### Using `UpdateCartItemQuantity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCartItemQuantity, UpdateCartItemQuantityVariables } from '@firebasegen/default-2-connector';

// The `UpdateCartItemQuantity` mutation requires an argument of type `UpdateCartItemQuantityVariables`:
const updateCartItemQuantityVars: UpdateCartItemQuantityVariables = {
  itemId: ..., 
  quantity: ..., 
};

// Call the `updateCartItemQuantity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCartItemQuantity(updateCartItemQuantityVars);
// Variables can be defined inline as well.
const { data } = await updateCartItemQuantity({ itemId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCartItemQuantity(dataConnect, updateCartItemQuantityVars);

console.log(data.shoppingCartItems_update);

// Or, you can use the `Promise` API.
updateCartItemQuantity(updateCartItemQuantityVars).then((response) => {
  const data = response.data;
  console.log(data.shoppingCartItems_update);
});
```

### Using `UpdateCartItemQuantity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCartItemQuantityRef, UpdateCartItemQuantityVariables } from '@firebasegen/default-2-connector';

// The `UpdateCartItemQuantity` mutation requires an argument of type `UpdateCartItemQuantityVariables`:
const updateCartItemQuantityVars: UpdateCartItemQuantityVariables = {
  itemId: ..., 
  quantity: ..., 
};

// Call the `updateCartItemQuantityRef()` function to get a reference to the mutation.
const ref = updateCartItemQuantityRef(updateCartItemQuantityVars);
// Variables can be defined inline as well.
const ref = updateCartItemQuantityRef({ itemId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCartItemQuantityRef(dataConnect, updateCartItemQuantityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shoppingCartItems_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shoppingCartItems_update);
});
```

## DeleteCartItem
You can execute the `DeleteCartItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-2-connector/index.d.ts](./index.d.ts):
```typescript
deleteCartItem(vars: DeleteCartItemVariables): MutationPromise<DeleteCartItemData, DeleteCartItemVariables>;

interface DeleteCartItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCartItemVariables): MutationRef<DeleteCartItemData, DeleteCartItemVariables>;
}
export const deleteCartItemRef: DeleteCartItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCartItem(dc: DataConnect, vars: DeleteCartItemVariables): MutationPromise<DeleteCartItemData, DeleteCartItemVariables>;

interface DeleteCartItemRef {
  ...
  (dc: DataConnect, vars: DeleteCartItemVariables): MutationRef<DeleteCartItemData, DeleteCartItemVariables>;
}
export const deleteCartItemRef: DeleteCartItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCartItemRef:
```typescript
const name = deleteCartItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteCartItem` mutation requires an argument of type `DeleteCartItemVariables`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCartItemVariables {
  itemId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCartItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCartItemData`, which is defined in [default-2-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCartItemData {
  shoppingCartItems_delete?: ShoppingCartItems_Key | null;
}
```
### Using `DeleteCartItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCartItem, DeleteCartItemVariables } from '@firebasegen/default-2-connector';

// The `DeleteCartItem` mutation requires an argument of type `DeleteCartItemVariables`:
const deleteCartItemVars: DeleteCartItemVariables = {
  itemId: ..., 
};

// Call the `deleteCartItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCartItem(deleteCartItemVars);
// Variables can be defined inline as well.
const { data } = await deleteCartItem({ itemId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCartItem(dataConnect, deleteCartItemVars);

console.log(data.shoppingCartItems_delete);

// Or, you can use the `Promise` API.
deleteCartItem(deleteCartItemVars).then((response) => {
  const data = response.data;
  console.log(data.shoppingCartItems_delete);
});
```

### Using `DeleteCartItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCartItemRef, DeleteCartItemVariables } from '@firebasegen/default-2-connector';

// The `DeleteCartItem` mutation requires an argument of type `DeleteCartItemVariables`:
const deleteCartItemVars: DeleteCartItemVariables = {
  itemId: ..., 
};

// Call the `deleteCartItemRef()` function to get a reference to the mutation.
const ref = deleteCartItemRef(deleteCartItemVars);
// Variables can be defined inline as well.
const ref = deleteCartItemRef({ itemId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCartItemRef(dataConnect, deleteCartItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shoppingCartItems_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shoppingCartItems_delete);
});
```

