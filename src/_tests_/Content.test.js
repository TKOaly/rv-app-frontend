/*
import { Provider } from 'react-redux';
import Content from '../components/sections/Content';
import React from 'react';
import ReactDOM from 'react-dom';
*/
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';

describe('Content component', () => {
    const mockStore = configureStore();
    // eslint-disable-next-line no-unused-vars
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        // const div = document.createElement('div');
        /*ReactDOM.render(
            <Provider store={store}>
                <Content deposit={() => {}} />
            </Provider>,
            div
        );
        */
    });
});
