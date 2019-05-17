import { errorMessage, successMessage } from './notificationReducer';
import userService from '../services/userService';

export const initialState = {
    registering: false
};

export const registerActions = {
    REGISTERING: 'REGISTERING',
    END_REGISTERING: 'END_REGISTERING'
};

export const tryRegister = (userData) => {
    return async (dispatch) => {
        dispatch(registering());
        try {
            await userService.registerUser({
                username: userData.username,
                password: userData.password,
                email: userData.email,
                fullName: userData.fullName
            });
            dispatch(endRegistering());
            dispatch(successMessage('User registered'));
        } catch (err) {
            dispatch(endRegistering());
            if (err.response) {
                dispatch(errorMessage(err.response.data.message));
            } else {
                dispatch(errorMessage(err.message));
            }
        }
    };
};

export const registering = () => {
    return {
        type: registerActions.REGISTERING
    };
};

export const endRegistering = () => {
    return {
        type: registerActions.END_REGISTERING
    };
};

/**
 * Registration reducer.
 * @param {object} state
 * @param {object} action
 */
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case registerActions.REGISTERING:
            return { ...state, registering: true };
        case registerActions.END_REGISTERING:
            return { ...state, registering: false };
        default:
            return state;
    }
};

export default registerReducer;
