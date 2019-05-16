import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { logger } from './middleware';
import thunk from 'redux-thunk';
// Import reducers
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './authenticationReducer';
import depositReducer from './depositReducer';
import modalReducer from './modalReducer';
import notificationReducer from './notificationReducer';
import productReducer from './productReducer';
import registerReducer from './registerReducer';
import terminalReducer from './terminalReducer';
import userReducer from './userReducer';

// If we are in a test environment, use memory history
export const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createBrowserHistory();

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
    router: connectRouter(history)
});

const router = routerMiddleware(history);
const middleware = process.env.NODE_ENV !== 'production' ? [thunk, router, logger] : [thunk, router];

// Create store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
