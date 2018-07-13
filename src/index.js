import './components/animations/animations.css';
import './index.css';
import './reset.css';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { logger } from './reducers/middleware';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

// Import reducers
import { reducer as formReducer } from 'redux-form';
import authenticationReducer, { authenticationActions } from './reducers/authenticationReducer';
import depositReducer from './reducers/depositReducer';
import modalReducer from './reducers/modalReducer';
import notificationReducer from './reducers/notificationReducer';
import productReducer from './reducers/productReducer';
import registerReducer from './reducers/registerReducer';
import terminalReducer from './reducers/terminalReducer';
import userReducer from './reducers/userReducer';

// Combine reducers
const reducer = combineReducers({
    notification: notificationReducer,
    authentication: authenticationReducer,
    register: registerReducer,
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
