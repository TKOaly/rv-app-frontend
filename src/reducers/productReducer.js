import { addProductToNotification, errorMessage } from './notificationReducer';
import { setBalance } from './userReducer';
import productService from '../services/productService';

export const productActions = {
    SET_GETTING_PRODUCTS: 'GETTING_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_FILTER: 'SET_FILTER',
    SET_GETTING_CATEGORIES: 'GETTING_CATEGORIES',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY'
};

export const initialState = {
    products: [],
    gettingProducts: false,
    gettingCategories: false,
    categories: [],
    filter: '',
    selectedCategory: -1
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

export const getProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: productActions.SET_GETTING_PRODUCTS });
            const products = await productService.getAllProducts();
            dispatch({
                type: productActions.SET_PRODUCTS,
                products
            });
        } catch (err) {
            dispatch(errorMessage('Failed to fetch products'));
        }
    };
};

export const getCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: productActions.SET_GETTING_CATEGORIES });
            const categories = await productService.getAllCategories();
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
            const res = await productService.buyProduct(product.product_barcode, quantity, token);

            dispatch(setBalance(res.data.account_balance));

            dispatch(
                addProductToNotification({
                    product_name: product.product_name,
                    barcode: product.product_barcode,
                    quantity: quantity,
                    price: product.sellprice
                })
            );
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
            return Object.assign({}, state, {
                gettingProducts: true
            });
        case productActions.SET_GETTING_CATEGORIES:
            return Object.assign({}, state, {
                gettingCategories: true
            });
        case productActions.SET_PRODUCTS:
            return Object.assign({}, state, {
                products: action.products,
                gettingProducts: false
            });
        case productActions.SET_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories,
                gettingCategories: false
            });
        case productActions.SET_FILTER:
            return Object.assign({}, state, {
                filter: action.filter
            });
        case productActions.SET_SELECTED_CATEGORY:
            return Object.assign({}, state, {
                selectedCategory: action.category
            });
        default:
            return state;
    }
};

export default productReducer;
