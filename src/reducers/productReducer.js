import { addProductToNotification, errorMessage } from './notificationReducer';
import { setBalance } from './userReducer';
import productService from '../services/productService';

export const productActions = {
    SET_GETTING_PRODUCTS: 'GETTING_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_FILTER: 'SET_FILTER',
    SET_GETTING_CATEGORIES: 'GETTING_CATEGORIES',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
    SET_BUY_AMOUNT: 'SET_BUY_AMOUNT'
};

export const initialState = {
    products: [],
    gettingProducts: false,
    gettingCategories: false,
    categories: [],
    filter: '',
    selectedCategory: -1,
    buyAmount: 1
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

export const setBuyAmount = (amount) => {
    return {
        type: productActions.SET_BUY_AMOUNT,
        amount
    };
};

export const getProducts = (token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productActions.SET_GETTING_PRODUCTS });
            const products = await productService.getAllProducts(token);
            dispatch({
                type: productActions.SET_PRODUCTS,
                products: products.filter((product) => product.category.categoryId !== 65535)
            });
        } catch (err) {
            dispatch(errorMessage('Failed to fetch products'));
        }
    };
};

export const getCategories = (token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productActions.SET_GETTING_CATEGORIES });
            const categories = await productService.getAllCategories(token);
            dispatch({
                type: productActions.SET_CATEGORIES,
                categories
            });
        } catch (err) {
            dispatch(errorMessage('Failed to fetch categories'));
        }
    };
};

export const buyProduct = (product, quantity) => {
    return async (dispatch, getState) => {
        const token = getState().authentication.access_token;

        try {
            const res = await productService.buyProduct(product.barcode, quantity, token);

            dispatch(setBalance(res.accountBalance));

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
            return { ...state, categories: action.categories, gettingCategories: false };
        case productActions.SET_FILTER:
            return { ...state, filter: action.filter };
        case productActions.SET_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.category };
        case productActions.SET_BUY_AMOUNT:
            return { ...state, buyAmount: action.amount };
        default:
            return state;
    }
};

export default productReducer;
