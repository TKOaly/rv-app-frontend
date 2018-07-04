// NOT TO BE USED

import { combineReducers, createStore } from 'redux';
import authenticationReducer from '../reducers/authenticationReducer';
import loginReducer from '../reducers/loginReducer';
import notificationReducer from '../reducers/notificationReducer';
import registerReducer from '../reducers/registerReducer';
import shoppingCartReducer from '../reducers/shoppingCartReducer';
import terminalReducer from '../reducers/terminalReducer';
import userReducer from '../reducers/userReducer';

// Combine reducers
const reducer = combineReducers({
    notification: notificationReducer,
    authentication: authenticationReducer,
    shoppingCart: shoppingCartReducer,
    register: registerReducer,
    login: loginReducer,
    terminal: terminalReducer,
    user: userReducer
});

const store = createStore(reducer);

export default store;
