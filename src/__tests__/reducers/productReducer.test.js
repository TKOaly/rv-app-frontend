import {
    buyProduct,
    getCategories,
    getProducts,
    initialState,
    productActions,
    setCategories,
    setCategorySelected,
    setFilter,
    setProducts
} from '../../reducers/productReducer';
import { mockStore } from '../../mockStore';
import { notificationActions } from '../../reducers/notificationReducer';
import { userActions } from '../../reducers/userReducer';
import axios from 'axios';
import productReducer from '../../reducers/productReducer';
jest.mock('axios');

describe('productReducer', () => {
    it('setFilter action changes state', () => {
        const state = {
            ...initialState
        };
        const action = setFilter('TEST_FILTER');

        const newState = productReducer(state, action);

        expect(newState.filter).toBe('TEST_FILTER');
    });

    it('setCategorySelected action changes state', () => {
        const state = {
            ...initialState
        };
        const action = setCategorySelected(999);

        const newState = productReducer(state, action);

        expect(newState.selectedCategory).toBe(999);
    });

    it('setProducts action changes state', () => {
        const state = {
            ...initialState
        };

        const action = setProducts([
            { name: 'Test product 1', category: { categoryId: 1 } },
            { name: 'Test product 2', category: { categoryId: 2 } }
        ]);

        const newState = productReducer(state, action);

        expect(newState.products.length).toBe(2);
    });

    it('getProducts action dispatches correct actions', async () => {
        const response = {
            data: {
                products: [
                    { name: 'Test product 1', category: { categoryId: 1 } },
                    { name: 'Test product 2', category: { categoryId: 2 } }
                ]
            }
        };
        axios.get.mockReturnValueOnce(response);

        const state = {
            ...initialState
        };
        const store = mockStore(state);

        await store.dispatch(getProducts('TOKEN'));

        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(productActions.SET_GETTING_PRODUCTS);
        expect(actions[1].type).toBe(productActions.SET_PRODUCTS);
        expect(actions[1].products.length).toBe(2);
        expect(actions[1].products[0].name).toBe('Test product 1');
        expect(actions[1].products[1].name).toBe('Test product 2');
    });

    it('setCategories action changes state', () => {
        const state = {
            ...initialState
        };

        const action = setCategories([{ categoryId: 1 }, { categoryId: 3 }]);

        const newState = productReducer(state, action);

        expect(newState.categories.length).toBe(2);
    });
    it('getCategories action dispatches correct actions', async () => {
        const response = {
            data: {
                categories: [{ categoryId: 1 }, { categoryId: 3 }]
            }
        };
        axios.get.mockReturnValueOnce(response);

        const state = {
            ...initialState
        };
        const store = mockStore(state);

        await store.dispatch(getCategories('TOKEN'));

        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(productActions.SET_GETTING_CATEGORIES);
        expect(actions[1].type).toBe(productActions.SET_CATEGORIES);
        expect(actions[1].categories.length).toBe(2);
        expect(actions[1].categories[0].categoryId).toBe(1);
        expect(actions[1].categories[1].categoryId).toBe(3);
    });

    it('buyProduct action dispatches correct actions', async () => {
        const response = {
            data: {
                productStock: 99,
                accountBalance: 1000,
                purchases: []
            }
        };
        axios.post.mockReturnValueOnce(response);

        const state = {
            product: {
                ...initialState
            },
            authentication: {
                access_token: ''
            }
        };
        const store = mockStore(state);

        await store.dispatch(buyProduct({productId: 1}, 20));

        const actions = store.getActions();

        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe(userActions.SET_BALANCE);
        expect(actions[0].balance).toBe(1000);
        expect(actions[1].type).toBe(productActions.SET_PRODUCT_STOCK);
        expect(actions[1].productId).toBe(1);
        expect(actions[1].stock).toBe(99);
        expect(actions[2].type).toBe(notificationActions.ADD_PRODUCT_TO_PURCHASE);
        expect(actions[2].data.count).toBe(20);
        expect(actions[2].data.product.productId).toBe(1);
    });
});
