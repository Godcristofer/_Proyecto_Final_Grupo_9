import { CreateCartData, CreateCartVariables, AddItemToCartData, AddItemToCartVariables, UpdateCartItemQuantityData, UpdateCartItemQuantityVariables, DeleteCartItemData, DeleteCartItemVariables, ListProductsData, GetProductData, ListProductsByCategoryData, ListUsersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateCart(options?: useDataConnectMutationOptions<CreateCartData, FirebaseError, CreateCartVariables>): UseDataConnectMutationResult<CreateCartData, CreateCartVariables>;
export function useCreateCart(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCartData, FirebaseError, CreateCartVariables>): UseDataConnectMutationResult<CreateCartData, CreateCartVariables>;

export function useAddItemToCart(options?: useDataConnectMutationOptions<AddItemToCartData, FirebaseError, AddItemToCartVariables>): UseDataConnectMutationResult<AddItemToCartData, AddItemToCartVariables>;
export function useAddItemToCart(dc: DataConnect, options?: useDataConnectMutationOptions<AddItemToCartData, FirebaseError, AddItemToCartVariables>): UseDataConnectMutationResult<AddItemToCartData, AddItemToCartVariables>;

export function useUpdateCartItemQuantity(options?: useDataConnectMutationOptions<UpdateCartItemQuantityData, FirebaseError, UpdateCartItemQuantityVariables>): UseDataConnectMutationResult<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;
export function useUpdateCartItemQuantity(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCartItemQuantityData, FirebaseError, UpdateCartItemQuantityVariables>): UseDataConnectMutationResult<UpdateCartItemQuantityData, UpdateCartItemQuantityVariables>;

export function useDeleteCartItem(options?: useDataConnectMutationOptions<DeleteCartItemData, FirebaseError, DeleteCartItemVariables>): UseDataConnectMutationResult<DeleteCartItemData, DeleteCartItemVariables>;
export function useDeleteCartItem(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCartItemData, FirebaseError, DeleteCartItemVariables>): UseDataConnectMutationResult<DeleteCartItemData, DeleteCartItemVariables>;

export function useListProducts(options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;
export function useListProducts(dc: DataConnect, options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;

export function useGetProduct(options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, undefined>;
export function useGetProduct(dc: DataConnect, options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, undefined>;

export function useListProductsByCategory(options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, undefined>;
export function useListProductsByCategory(dc: DataConnect, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
