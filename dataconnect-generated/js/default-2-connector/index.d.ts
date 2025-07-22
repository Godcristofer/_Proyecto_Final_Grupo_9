import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateSaleData {
  sales_insert: Sales_Key;
}

export interface CreateSaleDetailData {
  saleDetails_insert: SaleDetails_Key;
}

export interface CreateSaleDetailVariables {
  saleId: UUIDString;
  productId: UUIDString;
  quantity: number;
  subtotal: number;
}

export interface CreateSaleVariables {
  userId: string;
  saleDate: DateString;
  total: number;
}

export interface CreateShipmentData {
  shipments_insert: Shipments_Key;
}

export interface CreateShipmentVariables {
  saleId: UUIDString;
  address: string;
  city: string;
}

export interface CreateUserData {
  users_insert: Users_Key;
}

export interface CreateUserVariables {
  id: string;
  email: string;
  name?: string | null;
  dni?: string | null;
  phone?: string | null;
  role?: string | null;
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

export interface GetUserByIdVariables {
  id: string;
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
        product: {
          name: string;
          price: number;
        };
          quantity: number;
          subtotal: number;
      })[];
        shipments_on_sale?: {
          address: string;
          city: string;
          status: string;
          shippedAt?: TimestampString | null;
          deliveredAt?: TimestampString | null;
        };
  } & Sales_Key)[];
}

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

export interface Products_Key {
  id: UUIDString;
  __typename?: 'Products_Key';
}

export interface SaleDetails_Key {
  id: UUIDString;
  __typename?: 'SaleDetails_Key';
}

export interface Sales_Key {
  id: UUIDString;
  __typename?: 'Sales_Key';
}

export interface Shipments_Key {
  id: UUIDString;
  __typename?: 'Shipments_Key';
}

export interface UpdateShipmentStatusData {
  shipments_upsert: Shipments_Key;
}

export interface UpdateShipmentStatusVariables {
  saleId: UUIDString;
  status: string;
}

export interface UpdateUserRoleData {
  users_update?: Users_Key | null;
}

export interface UpdateUserRoleVariables {
  id: string;
  role: string;
}

export interface Users_Key {
  id: string;
  __typename?: 'Users_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface CreateSaleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
  operationName: string;
}
export const createSaleRef: CreateSaleRef;

export function createSale(vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;
export function createSale(dc: DataConnect, vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;

interface CreateSaleDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSaleDetailVariables): MutationRef<CreateSaleDetailData, CreateSaleDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSaleDetailVariables): MutationRef<CreateSaleDetailData, CreateSaleDetailVariables>;
  operationName: string;
}
export const createSaleDetailRef: CreateSaleDetailRef;

export function createSaleDetail(vars: CreateSaleDetailVariables): MutationPromise<CreateSaleDetailData, CreateSaleDetailVariables>;
export function createSaleDetail(dc: DataConnect, vars: CreateSaleDetailVariables): MutationPromise<CreateSaleDetailData, CreateSaleDetailVariables>;

interface CreateShipmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateShipmentVariables): MutationRef<CreateShipmentData, CreateShipmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateShipmentVariables): MutationRef<CreateShipmentData, CreateShipmentVariables>;
  operationName: string;
}
export const createShipmentRef: CreateShipmentRef;

export function createShipment(vars: CreateShipmentVariables): MutationPromise<CreateShipmentData, CreateShipmentVariables>;
export function createShipment(dc: DataConnect, vars: CreateShipmentVariables): MutationPromise<CreateShipmentData, CreateShipmentVariables>;

interface UpdateShipmentStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
  operationName: string;
}
export const updateShipmentStatusRef: UpdateShipmentStatusRef;

export function updateShipmentStatus(vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
export function updateShipmentStatus(dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

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

interface GetUserByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  operationName: string;
}
export const getUserByIdRef: GetUserByIdRef;

export function getUserById(vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;
export function getUserById(dc: DataConnect, vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface ListSalesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSalesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSalesData, undefined>;
  operationName: string;
}
export const listSalesRef: ListSalesRef;

export function listSales(): QueryPromise<ListSalesData, undefined>;
export function listSales(dc: DataConnect): QueryPromise<ListSalesData, undefined>;

