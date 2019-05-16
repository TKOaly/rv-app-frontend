import './components/animations/animations.scss';
import './index.scss';
import './reset.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { logger } from './reducers/middleware';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

// Import reducers
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './reducers/authenticationReducer';
import depositReducer from './reducers/depositReducer';
import modalReducer from './reducers/modalReducer';
import notificationReducer from './reducers/notificationReducer';
import productReducer from './reducers/productReducer';
import registerReducer from './reducers/registerReducer';
import terminalReducer from './reducers/terminalReducer';
import userReducer from './reducers/userReducer';

const history = createBrowserHistory();

const routerReducer = connectRouter(history);

// Combine reducers
const rootReducer = combineReducers({
    notification: notificationReducer,
    authentication: authenticationReducer,
    register: registerReducer,
    terminal: terminalReducer,
    user: userReducer,
    products: productReducer,
    deposit: depositReducer,
    modal: modalReducer,
    form: formReducer,
    router: routerReducer
});

const router = routerMiddleware(history);
const middleware = process.env.NODE_ENV !== 'production' ? [thunk, router, logger] : [thunk, router];

// Create store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

// Load config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    // Log initial state
    console.log(store.getState());
    console.log('Back-end url: %s', process.env.REACT_APP_BACKEND_URL);
}

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);
