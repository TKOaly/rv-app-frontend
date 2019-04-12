// Import reducers
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import { logger } from './reducers/middleware';
import authenticationReducer, { authenticationActions } from './reducers/authenticationReducer';
import depositReducer from './reducers/depositReducer';
import modalReducer from './reducers/modalReducer';
import notificationReducer from './reducers/notificationReducer';
import productReducer from './reducers/productReducer';
import registerReducer from './reducers/registerReducer';
import terminalReducer from './reducers/terminalReducer';
import thunk from 'redux-thunk';
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

const middleware = process.env.NODE_ENV !== 'production' ? [thunk, logger] : [thunk];

// Create store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
