export const mockedCategories = [
    {
        categoryId: 1,
        description: 'Test products 1'
    },
    {
        categoryId: 2,
        description: 'Test products 2'
    }
];

export const mockedProducts = [
    {
        barcode: '12345678',
        productId: 1,
        name: 'Test product',
        category: {
            ...mockedCategories[0]
        },
        weight: 180,
        sellPrice: 2000,
        stock: 42
    },
    {
        barcode: '12345679',
        productId: 2,
        name: 'Test product 2',
        category: {
            ...mockedCategories[1]
        },
        weight: 180,
        sellPrice: 155,
        stock: 20
    }
];
