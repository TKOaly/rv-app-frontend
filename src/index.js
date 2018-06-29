import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './components/animations/animations.css';
import './index.css';

import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from './reducers/middleware';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import reducers
import notificationReducer from './reducers/notificationReducer';
import authenticationReducer, { authenticationActions } from './reducers/authenticationReducer';
import registerReducer from './reducers/registerReducer';
import loginReducer from './reducers/loginReducer';
import terminalReducer from './reducers/terminalReducer';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import depositReducer from './reducers/depositReducer';
import modalReducer from './reducers/modalReducer';
import { reducer as formReducer } from 'redux-form';

// Combine reducers
const reducer = combineReducers({
    notification: notificationReducer,
    authentication: authenticationReducer,
    register: registerReducer,
    login: loginReducer,
    terminal: terminalReducer,
    user: userReducer,
    products: productReducer,
    deposit: depositReducer,
    modal: modalReducer,
    form: formReducer
});

const rootReducer = (state, action) => {
    if (action.type === authenticationActions.LOGOUT_SUCCESS) {
        state = undefined;
    }

    return reducer(state, action);
};

const middleware =
    process.env.NODE_ENV !== 'production'
        ? [require('redux-immutable-state-invariant').default(), thunk, logger]
        : [thunk];

// Create store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

// Load config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    // Log initial state
    console.log(store.getState());
    console.log('Back-end url: %s', process.env.REACT_APP_BACKEND_URL);
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
