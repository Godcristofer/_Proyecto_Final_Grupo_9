const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default-2',
  service: 'comcorp-store-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const createCartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCart', inputVars);
}
createCartRef.operationName = 'CreateCart';
exports.createCartRef = createCartRef;

exports.createCart = function createCart(dcOrVars, vars) {
  return executeMutation(createCartRef(dcOrVars, vars));
};

const addItemToCartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddItemToCart', inputVars);
}
addItemToCartRef.operationName = 'AddItemToCart';
exports.addItemToCartRef = addItemToCartRef;

exports.addItemToCart = function addItemToCart(dcOrVars, vars) {
  return executeMutation(addItemToCartRef(dcOrVars, vars));
};

const updateCartItemQuantityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCartItemQuantity', inputVars);
}
updateCartItemQuantityRef.operationName = 'UpdateCartItemQuantity';
exports.updateCartItemQuantityRef = updateCartItemQuantityRef;

exports.updateCartItemQuantity = function updateCartItemQuantity(dcOrVars, vars) {
  return executeMutation(updateCartItemQuantityRef(dcOrVars, vars));
};

const deleteCartItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCartItem', inputVars);
}
deleteCartItemRef.operationName = 'DeleteCartItem';
exports.deleteCartItemRef = deleteCartItemRef;

exports.deleteCartItem = function deleteCartItem(dcOrVars, vars) {
  return executeMutation(deleteCartItemRef(dcOrVars, vars));
};

const listProductsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProducts');
}
listProductsRef.operationName = 'ListProducts';
exports.listProductsRef = listProductsRef;

exports.listProducts = function listProducts(dc) {
  return executeQuery(listProductsRef(dc));
};

const getProductRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProduct');
}
getProductRef.operationName = 'GetProduct';
exports.getProductRef = getProductRef;

exports.getProduct = function getProduct(dc) {
  return executeQuery(getProductRef(dc));
};

const listProductsByCategoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductsByCategory');
}
listProductsByCategoryRef.operationName = 'ListProductsByCategory';
exports.listProductsByCategoryRef = listProductsByCategoryRef;

exports.listProductsByCategory = function listProductsByCategory(dc) {
  return executeQuery(listProductsByCategoryRef(dc));
};

const listUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers');
}
listUsersRef.operationName = 'ListUsers';
exports.listUsersRef = listUsersRef;

exports.listUsers = function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
};
