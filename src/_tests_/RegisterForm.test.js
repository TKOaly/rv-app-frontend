import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from '../components/forms/RegisterForm';
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';

describe('RegisterForm component', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <RegisterForm />
                </Router>
            </Provider>,
            div
        );
    });
});
