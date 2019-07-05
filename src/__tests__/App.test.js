import { Provider } from 'react-redux';
import { history } from '../reducers/store';
import App from '../App';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import initialState from '../__testutils__/initialState';

describe('<App/>', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <App history={history} />
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
