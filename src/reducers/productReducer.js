import { addProductToNotification, errorMessage } from './notificationReducer';
import { addPurchase } from './historyReducer';
import { setBalance } from './userReducer';
import productService from '../services/productService';

export const productActions = {
    SET_GETTING_PRODUCTS: 'GETTING_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_FILTER: 'SET_FILTER',
    SET_GETTING_CATEGORIES: 'GETTING_CATEGORIES',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
    SET_BUY_AMOUNT: 'SET_BUY_AMOUNT',
    RESET_PRODUCTS: 'RESET_PRODUCTS',
    RESET_CATEGORIES: 'RESET_CATEGORIES',
    SET_PRODUCT_STOCK: 'SET_PRODUCT_STOCK',
    SET_FEATURED_PRODUCTS: 'SET_FEATURED_PRODUCTS',
    RESET_FEATURED_PRODUCTS: 'RESET_FEATURED_PRODUCTS',
    SET_SHOW_ONLY_PRODUCTS_WITH_POSITIVE_STOCK: 'SET_SHOW_ONLY_PRODUCTS_WITH_POSITIVE_STOCK'
};

export const initialState = {
    products: [],
    gettingProducts: false,
    gettingCategories: false,
    categories: [],
    filter: '',
    showOnlyPositiveStock: true,
    selectedCategory: -1,
    buyAmount: 1,
    featuredProducts: [],
    featuredProductsLoaded: false
};

export const setFilter = (filter) => {
    return {
        type: productActions.SET_FILTER,
        filter
    };
};

export const setCategorySelected = (category) => {
    return {
        type: productActions.SET_SELECTED_CATEGORY,
        category
    };
};

export const setShowOnlyAvailableProducts = (value) => {
    return {
        type: productActions.SET_SHOW_ONLY_PRODUCTS_WITH_POSITIVE_STOCK,
        value
    };
};

export const setBuyAmount = (amount) => {
    return {
        type: productActions.SET_BUY_AMOUNT,
        amount
    };
};

export const resetProducts = () => {
    return {
        type: productActions.RESET_PRODUCTS
    };
};

export const resetCategories = () => {
    return {
        type: productActions.RESET_CATEGORIES
    };
};

export const setProductStock = (productId, stock) => {
    return {
        type: productActions.SET_PRODUCT_STOCK,
        productId,
        stock
    };
};

export const setFeaturedProducts = (featuredProducts) => {
    return {
        type: productActions.SET_FEATURED_PRODUCTS,
        featuredProducts
    };
};

export const resetFeaturedProducts = () => {
    return {
        type: productActions.RESET_FEATURED_PRODUCTS
    };
};

export const setCategories = (categories) => ({
    type: productActions.SET_CATEGORIES,
    categories
});

export const setProducts = (products) => ({
    type: productActions.SET_PRODUCTS,
    products
});

export const setGettingProducts = () => ({
    type: productActions.SET_GETTING_PRODUCTS
});

export const setGettingCategories = () => ({
    type: productActions.SET_GETTING_CATEGORIES
});

export const getProducts = (token) => {
    return async (dispatch) => {
        try {
            dispatch(setGettingProducts());
            const products = await productService.getAllProducts(token);
            dispatch(setProducts(products.filter(
                (product) => product.category.categoryId !== 65535
            )
            ));
        } catch (err) {
            dispatch(errorMessage('Failed to fetch products'));
        }
    };
};

export const getCategories = (token) => {
    return async (dispatch) => {
        try {
            dispatch(setGettingCategories());
            const categories = await productService.getAllCategories(token);
            dispatch(setCategories(categories));
        } catch (err) {
            dispatch(errorMessage('Failed to fetch categories'));
        }
    };
};

export const buyProduct = (product, quantity) => {
    return async (dispatch, getState) => {
        const token = getState().authentication.access_token;

        try {
            const res = await productService.buyProduct(
                product.barcode,
                quantity,
                token
            );

            dispatch(setBalance(res.accountBalance));
            dispatch(setProductStock(product.productId, res.productStock));
            for (const purchase of res.purchases) {
                dispatch(addPurchase(purchase));
            }

            dispatch(addProductToNotification(product, quantity));
        } catch (err) {
            if (err.response) {
                dispatch(errorMessage(err.response.data.message));
            } else {
                dispatch(errorMessage('Error buying product'));
            }
        }
    };
};

/**
 * Product reducer.
 * @param {object} state
 * @param {object} action
 */
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productActions.SET_GETTING_PRODUCTS:
            return { ...state, gettingProducts: true };
        case productActions.SET_GETTING_CATEGORIES:
            return { ...state, gettingCategories: true };
        case productActions.SET_PRODUCTS:
            return { ...state, products: action.products, gettingProducts: false };
        case productActions.SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
                gettingCategories: false
            };
        case productActions.SET_FILTER:
            return { ...state, filter: action.filter };
        case productActions.SET_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.category };
        case productActions.SET_BUY_AMOUNT:
            return { ...state, buyAmount: action.amount };
        case productActions.RESET_PRODUCTS:
            return { ...state, products: [], gettingProducts: false };
        case productActions.RESET_CATEGORIES:
            return { ...state, categories: [], gettingCategories: false };
        case productActions.SET_PRODUCT_STOCK: {
            return {
                ...state,
                products: state.products.map((product) => {
                    if (product.productId === action.productId) {
                        return { ...product, stock: action.stock };
                    } else {
                        return product;
                    }
                })
            };
        }
        case productActions.SET_FEATURED_PRODUCTS:
            return {
                ...state,
                featuredProducts: action.featuredProducts,
                featuredProductsLoaded: true
            };
        case productActions.RESET_FEATURED_PRODUCTS:
            return { ...state, featuredProducts: [], featuredProductsLoaded: false };
        case productActions.SET_SHOW_ONLY_PRODUCTS_WITH_POSITIVE_STOCK:
            return { ...state, showOnlyPositiveStock: action.value };
        default:
            return state;
    }
};

export default productReducer;
