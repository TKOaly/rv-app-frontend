export const COFFEE = 54;
export const filterWhiteList = [COFFEE];
export const isAvailableProduct = (p) => p.stock > 0 || filterWhiteList.includes(p.productId);
