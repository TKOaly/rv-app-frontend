import userService from './../services/userService';

import { setUserData } from './../reducers/userReducer';

export const authenticationActions = {
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGGING_IN: 'LOGGING_IN',
    LOGGED_IN: 'LOGGED_IN',
    LOGIN_FAILED: 'LOGIN_FAILED'
};

export const initialState = {
    isLoggingIn: false,
    loggedIn: true,
    access_token: ''
};

export const logout = () => {
    return {
        type: authenticationActions.LOGOUT_SUCCESS
    };
};

export const loggingIn = () => {
    return {
        type: authenticationActions.LOGGING_IN
    };
};

export const loggedIn = token => {
    return async dispatch => {
        try {
            const userData = await userService.getUser(token);
            dispatch(setUserData(userData));
            dispatch({
                type: authenticationActions.LOGGED_IN,
                token
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const loginFailed = () => {
    return {
        type: authenticationActions.LOGIN_FAILED
    };
};

/**
 * Authentication reducer.
 * @param {object} state
 * @param {object} action
 */
const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
    case authenticationActions.LOGGING_IN:
        return Object.assign({}, state, { isLoggingIn: true });
    case authenticationActions.LOGGED_IN:
        return Object.assign({}, state, {
            loggedIn: true,
            access_token: action.token,
            isLoggingIn: false
        });
    case authenticationActions.LOGIN_FAILED:
        return Object.assign({}, state, {
            loggedIn: false,
            access_token: '',
            isLoggingIn: false
        });
    case authenticationActions.LOGOUT_SUCCESS:
        return Object.assign({}, state, {
            loggedIn: false,
            access_token: ''
        });
    default:
        return state;
    }
};

export default authenticationReducer;
