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
            const registerRequest = await userService.registerUser({
                username: userData.username,
                password: userData.password,
                email: userData.email,
                realname: userData.realname
            });
            dispatch(endRegistering());
            if (registerRequest.status === 201) {
                dispatch(successMessage('User registered'));
            } else {
                dispatch(errorMessage('Error registering user'));
            }
        } catch (err) {
            dispatch(endRegistering());
            dispatch(errorMessage('Error registering user'));
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
            return Object.assign({}, state, {
                registering: true
            });
        case registerActions.END_REGISTERING:
            return Object.assign({}, state, {
                registering: false
            });
        default:
            return state;
    }
};

export default registerReducer;
