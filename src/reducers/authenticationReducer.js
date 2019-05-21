import { clearAllNotifications, errorMessage } from './notificationReducer';
import { getCategories, getProducts, resetCategories, resetProducts } from './productReducer';
import { push } from 'connected-react-router';
import { reset } from 'redux-form';
import { resetUserData, setUserData } from '../reducers/userReducer';
import userService from '../services/userService';

export const authenticationActions = {
    LOGOUT: 'LOGOUT',
    LOGGING_IN: 'LOGGING_IN',
    LOGGED_IN: 'LOGGED_IN',
    LOGIN_FAILED: 'LOGIN_FAILED'
};

export const initialState = {
    isLoggingIn: false,
    loggedIn: false,
    access_token: ''
};

export const doLogout = () => {
    return (dispatch) => {
        dispatch(doLogoutWithoutRedirect());
        dispatch(push('/login'));
    };
};

export const doLogoutWithoutRedirect = () => {
    return (dispatch) => {
        dispatch(resetUserData());
        dispatch(resetProducts());
        dispatch(resetCategories());
        dispatch(clearAllNotifications());
        dispatch(logout());
    };
};

export const logout = () => {
    return {
        type: authenticationActions.LOGOUT
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

export const loggedIn = (token) => {
    return {
        type: authenticationActions.LOGGED_IN,
        token: token
    };
};

export const tryLogin = (username, password) => {
    return async (dispatch) => {
        // Set loggingIn
        dispatch(loggingIn());
        // Try to login
        try {
            const accessToken = await userService.authenticate({
                username,
                password
            });
            // If access token is found, set it and login
            if (accessToken) {
                /* Start loading products and categories immediately after authentication. */
                dispatch(getProducts(accessToken));
                dispatch(getCategories(accessToken));

                /* Only move on to the main page after user data has been loaded. */
                const userData = await userService.getUser(accessToken);
                dispatch(
                    setUserData({
                        username: userData.username,
                        fullName: userData.fullName,
                        email: userData.email,
                        moneyBalance: userData.moneyBalance
                    })
                );
                dispatch(loggedIn(accessToken));
                /* Redirect to main page */
                dispatch(push('/'));
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
            if (err.response) {
                if (err.response.status === 500 || err.response.status === 404) {
                    // Server error
                    dispatch(errorMessage('Server error', 2500));
                } else if (err.response.status === 401 || err.response.status === 400) {
                    // Validation error
                    dispatch(errorMessage(err.response.data.message, 2500));
                }
            } else {
                dispatch(errorMessage(err.message, 2500));
            }
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
            return { ...state, isLoggingIn: true };
        case authenticationActions.LOGGED_IN:
            return { ...state, loggedIn: true, access_token: action.token, isLoggingIn: false };
        case authenticationActions.LOGIN_FAILED:
            return { ...state, loggedIn: false, access_token: '', isLoggingIn: false };
        case authenticationActions.LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authenticationReducer;
