import { buyProduct, getCategories, getProducts, setCategorySelected, setFilter } from '../reducers/productReducer';
import productReducer from '../reducers/productReducer';

describe('productReducer', () => {
    it('setFilter-action changes state', () => {
        const state = [];
        const action = setFilter();

        const newState = productReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('setCategorySelected-action changes state', () => {
        const state = [];
        const action = setCategorySelected();

        const newState = productReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('getProducts-action changes state', () => {
        const state = [];
        const action = getProducts();

        const newState = productReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });

    it('getCategories-action changes state', () => {
        const state = [];
        const action = getCategories();

        const newState = productReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });

    it('buyProduct-action changes state', () => {
        const state = [];
        const action = buyProduct();

        const newState = productReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });
});
