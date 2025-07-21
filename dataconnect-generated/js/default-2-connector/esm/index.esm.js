import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default-2',
  service: 'comcorp-store-service',
  location: 'us-central1'
};

export const createCartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCart', inputVars);
}
createCartRef.operationName = 'CreateCart';

export function createCart(dcOrVars, vars) {
  return executeMutation(createCartRef(dcOrVars, vars));
}

export const addItemToCartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddItemToCart', inputVars);
}
addItemToCartRef.operationName = 'AddItemToCart';

export function addItemToCart(dcOrVars, vars) {
  return executeMutation(addItemToCartRef(dcOrVars, vars));
}

export const updateCartItemQuantityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCartItemQuantity', inputVars);
}
updateCartItemQuantityRef.operationName = 'UpdateCartItemQuantity';

export function updateCartItemQuantity(dcOrVars, vars) {
  return executeMutation(updateCartItemQuantityRef(dcOrVars, vars));
}

export const deleteCartItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCartItem', inputVars);
}
deleteCartItemRef.operationName = 'DeleteCartItem';

export function deleteCartItem(dcOrVars, vars) {
  return executeMutation(deleteCartItemRef(dcOrVars, vars));
}

export const listProductsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProducts');
}
listProductsRef.operationName = 'ListProducts';

export function listProducts(dc) {
  return executeQuery(listProductsRef(dc));
}

export const getProductRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProduct');
}
getProductRef.operationName = 'GetProduct';

export function getProduct(dc) {
  return executeQuery(getProductRef(dc));
}

export const listProductsByCategoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductsByCategory');
}
listProductsByCategoryRef.operationName = 'ListProductsByCategory';

export function listProductsByCategory(dc) {
  return executeQuery(listProductsByCategoryRef(dc));
}

export const listUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers');
}
listUsersRef.operationName = 'ListUsers';

export function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
}

