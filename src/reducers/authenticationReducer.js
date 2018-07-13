import { errorMessage } from './notificationReducer';
import { reset } from 'redux-form';
import { setUserData } from '../reducers/userReducer';
import userService from '../services/userService';

export const authenticationActions = {
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGGING_IN: 'LOGGING_IN',
    LOGGED_IN: 'LOGGED_IN',
    LOGIN_FAILED: 'LOGIN_FAILED'
};

export const initialState = {
    isLoggingIn: false,
    loggedIn: false,
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

export const loginFailed = () => {
    return {
        type: authenticationActions.LOGIN_FAILED
    };
};

export const tryLogin = (username, password) => {
    return async (dispatch) => {
        // Set loggingIn
        dispatch(loggingIn());
        // Try to login
        try {
            const res = await userService.authenticate({
                username,
                password
            });
            // If access token is found, set it and login
            if (res.data.access_token) {
                dispatch(loggedIn(res.data.access_token));
            } else {
                // Login has failed
                dispatch(loginFailed());
                // Reset form
                dispatch(reset('login'));
                // Send error message
                dispatch(errorMessage('Unknown error while logging in.', 2500));
            }
        } catch (err) {
            // Send login failed
            dispatch(loginFailed());
            // Reset form
            dispatch(reset('login'));
            // Send error message
            const errorResponse = err.response;
            if (errorResponse.status === 500 || errorResponse.status === 404) {
                // Server error
                dispatch(errorMessage('Server error', 2500));
            } else if (errorResponse.status === 403 || errorResponse.status === 400) {
                // Validation error
                dispatch(errorMessage(errorResponse.data.message, 2500));
            }
        }
    };
};

export const loggedIn = (token) => {
    return async (dispatch) => {
        try {
            const userData = await userService.getUser(token);
            dispatch(setUserData(userData));
            dispatch({
                type: authenticationActions.LOGGED_IN,
                token
            });
        } catch (err) {
            dispatch(errorMessage('Failed to fetch user data from server'));
        }
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
            return Object.assign({}, state, {
                isLoggingIn: true
            });
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
