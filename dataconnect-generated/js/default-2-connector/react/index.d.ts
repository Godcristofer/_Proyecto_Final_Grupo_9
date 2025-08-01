import { CreateUserData, CreateUserVariables, UpdateUserRoleData, UpdateUserRoleVariables, CreateSaleData, CreateSaleVariables, CreateSaleDetailData, CreateSaleDetailVariables, CreateShipmentData, CreateShipmentVariables, UpdateShipmentStatusData, UpdateShipmentStatusVariables, ListProductsData, GetProductData, ListProductsByCategoryData, ListUsersData, GetUserByIdData, GetUserByIdVariables, ListSalesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUserRole(options?: useDataConnectMutationOptions<UpdateUserRoleData, FirebaseError, UpdateUserRoleVariables>): UseDataConnectMutationResult<UpdateUserRoleData, UpdateUserRoleVariables>;
export function useUpdateUserRole(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserRoleData, FirebaseError, UpdateUserRoleVariables>): UseDataConnectMutationResult<UpdateUserRoleData, UpdateUserRoleVariables>;

export function useCreateSale(options?: useDataConnectMutationOptions<CreateSaleData, FirebaseError, CreateSaleVariables>): UseDataConnectMutationResult<CreateSaleData, CreateSaleVariables>;
export function useCreateSale(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSaleData, FirebaseError, CreateSaleVariables>): UseDataConnectMutationResult<CreateSaleData, CreateSaleVariables>;

export function useCreateSaleDetail(options?: useDataConnectMutationOptions<CreateSaleDetailData, FirebaseError, CreateSaleDetailVariables>): UseDataConnectMutationResult<CreateSaleDetailData, CreateSaleDetailVariables>;
export function useCreateSaleDetail(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSaleDetailData, FirebaseError, CreateSaleDetailVariables>): UseDataConnectMutationResult<CreateSaleDetailData, CreateSaleDetailVariables>;

export function useCreateShipment(options?: useDataConnectMutationOptions<CreateShipmentData, FirebaseError, CreateShipmentVariables>): UseDataConnectMutationResult<CreateShipmentData, CreateShipmentVariables>;
export function useCreateShipment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateShipmentData, FirebaseError, CreateShipmentVariables>): UseDataConnectMutationResult<CreateShipmentData, CreateShipmentVariables>;

export function useUpdateShipmentStatus(options?: useDataConnectMutationOptions<UpdateShipmentStatusData, FirebaseError, UpdateShipmentStatusVariables>): UseDataConnectMutationResult<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
export function useUpdateShipmentStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateShipmentStatusData, FirebaseError, UpdateShipmentStatusVariables>): UseDataConnectMutationResult<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

export function useListProducts(options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;
export function useListProducts(dc: DataConnect, options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;

export function useGetProduct(options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, undefined>;
export function useGetProduct(dc: DataConnect, options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, undefined>;

export function useListProductsByCategory(options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, undefined>;
export function useListProductsByCategory(dc: DataConnect, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useGetUserById(vars: GetUserByIdVariables, options?: useDataConnectQueryOptions<GetUserByIdData>): UseDataConnectQueryResult<GetUserByIdData, GetUserByIdVariables>;
export function useGetUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: useDataConnectQueryOptions<GetUserByIdData>): UseDataConnectQueryResult<GetUserByIdData, GetUserByIdVariables>;

export function useListSales(options?: useDataConnectQueryOptions<ListSalesData>): UseDataConnectQueryResult<ListSalesData, undefined>;
export function useListSales(dc: DataConnect, options?: useDataConnectQueryOptions<ListSalesData>): UseDataConnectQueryResult<ListSalesData, undefined>;
