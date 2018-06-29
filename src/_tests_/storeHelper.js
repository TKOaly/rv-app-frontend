// NOT TO BE USED

import notificationReducer from '../reducers/notificationReducer';
import authenticationReducer from '../reducers/authenticationReducer';
import shoppingCartReducer from '../reducers/shoppingCartReducer';
import registerReducer from '../reducers/registerReducer';
import loginReducer from '../reducers/loginReducer';
import terminalReducer from '../reducers/terminalReducer';
import userReducer from '../reducers/userReducer';
import { createStore, combineReducers } from 'redux';

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
