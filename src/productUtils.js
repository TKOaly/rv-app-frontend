export const PRODUCT_COFFEE = 54;
export const filterWhiteList = [PRODUCT_COFFEE];
export const filterByPositiveStock = (p) => p.stock > 0 || filterWhiteList.indexOf(p.productId) > -1;