import { log, warn } from './../debug';
import { mockedCategories, mockedProducts } from './mockData';
import productService from '../services/productService';
import sinon from 'sinon';

let stubs = [];

const resetStubs = () => {
    log('Resetting stubs');
    // Reset stubs
    if (stubs.length > 0) {
        stubs.forEach((stub) => {
            stub.restore();
        });
        stubs = [];
        log('Stubs have been reset');
    } else {
        warn('No stubs to reset');
    }
};

const addStub = (stub) => {
    log('Adding stub', stub);
    stubs = [...stubs, stub];
};

export const stubProductAndCategoryApis = () => {
    resetStubs();
    const getAllProductsStub = sinon.stub(productService, 'getAllProducts').returns([...mockedProducts]);
    const getAllCategoriesStub = sinon.stub(productService, 'getAllCategories').returns([...mockedCategories]);
    addStub(getAllCategoriesStub);
    addStub(getAllProductsStub);
};
