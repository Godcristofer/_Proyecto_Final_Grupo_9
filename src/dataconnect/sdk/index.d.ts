import { ConnectorConfig, DataConnect, MutationRef, MutationPromise, QueryRef, QueryPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ListProductsData {
  productss: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    image?: string | null;
    category?: string | null;
  } & products_Key)[];
}
export interface CreateUserVariables {
  id: UUIDString;
  email: string;
  name?: string | null;
}
export interface CreateUserData {
  users_insert?: (products_Key & users_Key) | null;
}

export interface products_Key {
  id: UUIDString;
  __typename?: 'products_Key';
}

export interface users_Key {
  id: UUIDString;
  __typename?: 'users_Key';
}

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

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const CreateUserRef: CreateUserRef;
export function CreateUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function CreateUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;


