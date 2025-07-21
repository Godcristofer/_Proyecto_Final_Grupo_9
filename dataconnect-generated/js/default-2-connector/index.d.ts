import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddItemToCartData {
  shoppingCartItems_insert: ShoppingCartItems_Key;
}

export interface AddItemToCartVariables {
  cartId: UUIDString;
  productId: UUIDString;
  quantity: number;
}

export interface CreateCartData {
  shoppingCarts_insert: ShoppingCarts_Key;
}

export interface CreateCartVariables {
  userId: UUIDString;
}

export interface DeleteCartItemData {
  shoppingCartItems_delete?: ShoppingCartItems_Key | null;
}

export interface DeleteCartItemVariables {
  itemId: UUIDString;
}

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

export interface ListUsersData {
  userss: ({
    id: UUIDString;
    name?: string | null;
    email: string;
    createdAt: TimestampString;
  } & Users_Key)[];
}

export interface Products_Key {
  id: UUIDString;
  __typename?: 'Products_Key';
}

export interface ShoppingCartItems_Key {
  id: UUIDString;
  __typename?: 'ShoppingCartItems_Key';
}

export interface ShoppingCarts_Key {
  id: UUIDString;
  __typename?: 'ShoppingCarts_Key';
}

export interface UpdateCartItemQuantityData {
  shoppingCartItems_update?: ShoppingCartItems_Key | null;
}

export interface UpdateCartItemQuantityVariables {
  itemId: UUIDString;
  quantity: number;
}

export interface Users_Key {
  id: UUIDString;
  __typename?: 'Users_Key';
}

interface CreateCartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCartVariables): MutationRef<CreateCartData, CreateCartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCartVariables): MutationRef<CreateCartData, CreateCartVariables>;
  operationName: string;
}
export const createCartRef: CreateCartRef;

export function createCart(vars: CreateCartVariables): MutationPromise<CreateCartData, CreateCartVariables>;
export function createCart(dc: DataConnect, vars: CreateCartVariables): MutationPromise<CreateCartData, CreateCartVariables>;

interface AddItemToCartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddItemToCartVariables): MutationRef<AddItemToCartData, AddItemToCartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddItemToCartVariables): MutationRef<AddItemToCartData, AddItemToCartVariables>;
  operationName: string;
}
export const addItemToCartRef: AddItemToCartRef;

export function addItemToCart(vars: AddItemToCartVariables): MutationPromise<AddItemToCartData, AddItemToCartVariables>;
export function addItemToCart(dc: DataConnect, vars: AddItemToCartVariables): MutationPromise<AddItemToCartData, AddItemToCartVariables>;

interface UpdateCartItemQuantityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCartItemQuantityVariables): MutationRef<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCartItemQuantityVariables): MutationRef<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;
  operationName: string;
}
export const updateCartItemQuantityRef: UpdateCartItemQuantityRef;

export function updateCartItemQuantity(vars: UpdateCartItemQuantityVariables): MutationPromise<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;
export function updateCartItemQuantity(dc: DataConnect, vars: UpdateCartItemQuantityVariables): MutationPromise<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;

interface DeleteCartItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCartItemVariables): MutationRef<DeleteCartItemData, DeleteCartItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCartItemVariables): MutationRef<DeleteCartItemData, DeleteCartItemVariables>;
  operationName: string;
}
export const deleteCartItemRef: DeleteCartItemRef;

export function deleteCartItem(vars: DeleteCartItemVariables): MutationPromise<DeleteCartItemData, DeleteCartItemVariables>;
export function deleteCartItem(dc: DataConnect, vars: DeleteCartItemVariables): MutationPromise<DeleteCartItemData, DeleteCartItemVariables>;

interface ListProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProductsData, undefined>;
  operationName: string;
}
export const listProductsRef: ListProductsRef;

export function listProducts(): QueryPromise<ListProductsData, undefined>;
export function listProducts(dc: DataConnect): QueryPromise<ListProductsData, undefined>;

interface GetProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetProductData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetProductData, undefined>;
  operationName: string;
}
export const getProductRef: GetProductRef;

export function getProduct(): QueryPromise<GetProductData, undefined>;
export function getProduct(dc: DataConnect): QueryPromise<GetProductData, undefined>;

interface ListProductsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsByCategoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProductsByCategoryData, undefined>;
  operationName: string;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;

export function listProductsByCategory(): QueryPromise<ListProductsByCategoryData, undefined>;
export function listProductsByCategory(dc: DataConnect): QueryPromise<ListProductsByCategoryData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect): QueryPromise<ListUsersData, undefined>;

