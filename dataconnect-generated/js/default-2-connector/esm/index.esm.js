import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default-2',
  service: 'comcorp-store-service',
  location: 'us-central1'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const updateUserRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateUserRole', inputVars);
}
updateUserRoleRef.operationName = 'updateUserRole';

export function updateUserRole(dcOrVars, vars) {
  return executeMutation(updateUserRoleRef(dcOrVars, vars));
}

export const createSaleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSale', inputVars);
}
createSaleRef.operationName = 'CreateSale';

export function createSale(dcOrVars, vars) {
  return executeMutation(createSaleRef(dcOrVars, vars));
}

export const createSaleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSaleDetail', inputVars);
}
createSaleDetailRef.operationName = 'CreateSaleDetail';

export function createSaleDetail(dcOrVars, vars) {
  return executeMutation(createSaleDetailRef(dcOrVars, vars));
}

export const createShipmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateShipment', inputVars);
}
createShipmentRef.operationName = 'CreateShipment';

export function createShipment(dcOrVars, vars) {
  return executeMutation(createShipmentRef(dcOrVars, vars));
}

export const updateShipmentStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateShipmentStatus', inputVars);
}
updateShipmentStatusRef.operationName = 'updateShipmentStatus';

export function updateShipmentStatus(dcOrVars, vars) {
  return executeMutation(updateShipmentStatusRef(dcOrVars, vars));
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

export const getUserByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getUserById', inputVars);
}
getUserByIdRef.operationName = 'getUserById';

export function getUserById(dcOrVars, vars) {
  return executeQuery(getUserByIdRef(dcOrVars, vars));
}

export const listSalesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSales');
}
listSalesRef.operationName = 'ListSales';

export function listSales(dc) {
  return executeQuery(listSalesRef(dc));
}

