export const COFFEE = '42615374';
export const filterWhiteList = [COFFEE];
export const isAvailableProduct = (p) => p.stock > 0 || filterWhiteList.includes(p.barcode);
