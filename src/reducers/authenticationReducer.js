import { clearAllNotifications, errorMessage } from './notificationReducer';
import {
    fetchDeposits,
    fetchPurchases,
    resetDeposits,
    resetPurchases
} from './historyReducer';
import {
    getCategories,
    getProducts,
    resetCategories,
    resetProducts
} from './productReducer';
import { push } from 'connected-react-router';
import { resetUserData, setUserData } from '../reducers/userReducer';
import userService from '../services/userService';

export const authenticationActions = {
    LOGOUT: 'LOGOUT',
    LOGGING_IN: 'LOGGING_IN',
    LOGGED_IN: 'LOGGED_IN',
    LOGIN_FAILED: 'LOGIN_FAILED',
    SET_FORM_USERNAME: 'SET_FORM_USERNAME',
    SET_FORM_PASSWORD: 'SET_FORM_PASSWORD'
};

export const initialState = {
    isLoggingIn: false,
    loggedIn: false,
    access_token: '',
    formUsername: '',
    formPassword: ''
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
        dispatch(resetPurchases());
        dispatch(resetDeposits());
        dispatch(clearAllNotifications());
        dispatch(logout());
    };
};

export const logout = () => {
    return {
        type: authenticationActions.LOGOUT
    };
};

export const setFormUsername = (username) => {
    return {
        type: authenticationActions.SET_FORM_USERNAME,
        username
    };
};

export const setFormPassword = (password) => {
    return {
        type: authenticationActions.SET_FORM_PASSWORD,
        password
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
                /* Start loading products, categories and histories immediately after authentication. */
                dispatch(getProducts(accessToken));
                dispatch(getCategories(accessToken));
                dispatch(fetchPurchases(accessToken));
                dispatch(fetchDeposits(accessToken));

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
                dispatch(resetLoginForm());
                // Send error message
                dispatch(errorMessage('Unknown error while logging in.', 2500));
            }
        } catch (err) {
            // Send login failed
            dispatch(loginFailed());
            // Reset form
            dispatch(resetLoginForm());
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

const resetLoginForm = () => {
    return (dispatch) => {
        dispatch(setFormUsername(''));
        dispatch(setFormPassword(''));
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
            return {
                ...state,
                loggedIn: true,
                access_token: action.token,
                isLoggingIn: false
            };
        case authenticationActions.LOGIN_FAILED:
            return {
                ...state,
                loggedIn: false,
                access_token: '',
                isLoggingIn: false
            };
        case authenticationActions.SET_FORM_USERNAME:
            return {
                ...state,
                formUsername: action.username
            };
        case authenticationActions.SET_FORM_PASSWORD:
            return {
                ...state,
                formPassword: action.password
            };
        case authenticationActions.LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authenticationReducer;
