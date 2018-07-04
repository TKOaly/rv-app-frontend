import { errorMessage, successMessage } from './notificationReducer';
import { loggedIn } from './authenticationReducer';
import userService from '../services/userService';

export const initialState = {
    registerVisible: false,
    minUsernameLength: 4,
    minPasswordLength: 4,
    registerUsernameDisabled: false,
    registerPasswordDisabled: true,
    registerEmailDisabled: true,
    registerRealnameDisabled: true,
    submitDisabled: false,
    loader: false,
    registerPasswordConfirmDisabled: true
};

export const registerActions = {
    TOGGLE_REGISTER_VISIBILITY: 'TOGGLE_REGISTER_VISIBILITY',
    RESET_REGISTER: 'RESET_REGISTER',
    REGISTERING: 'REGISTERING',
    FOCUS_PASSWORD_FIELD_REGISTER: 'FOCUS_PASSWORD_FIELD_REGISTER',
    FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER: 'FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER',
    FOCUS_EMAIL_FIELD: 'FOCUS_EMAIL_FIELD',
    FOCUS_REALNAME_FIELD: 'FOCUS_REALNAME_FIELD',
    REGISTER_USER: 'REGISTER_USER'
};

export const registerUser = (userData) => {
    return async (dispatch) => {
        dispatch(setRegistering());
        try {
            const registerRequest = await userService.registerUser({
                username: userData.username,
                password: userData.password,
                email: userData.email,
                realname: userData.realname
            });
            if (registerRequest.status === 201) {
                dispatch(successMessage('User registered'));
                dispatch(reset());
                try {
                    const loginResponse = await userService.authenticate({
                        username: userData.username,
                        password: userData.password
                    });
                    dispatch(loggedIn(loginResponse.data.access_token));
                } catch (err) {
                    dispatch(errorMessage('Error logging user in'));
                }
            } else {
                dispatch(errorMessage('Error registering user'));
            }
        } catch (err) {
            dispatch(reset());
            dispatch(errorMessage('Error registering user'));
        }
    };
};

export const toggleRegisterVisibility = () => {
    return {
        type: registerActions.TOGGLE_REGISTER_VISIBILITY
    };
};

export const reset = () => {
    return {
        type: registerActions.RESET_REGISTER
    };
};

export const setRegistering = (event) => {
    return {
        type: registerActions.REGISTERING,
        registerUsernameDisabled: true,
        registerEmailDisabled: true,
        registerPasswordDisabled: true,
        registerPasswordConfirmDisabled: true,
        registerRealnameDisabled: true,
        submitDisabled: true,
        loader: true
    };
};

export const focusEmailField = () => {
    return {
        type: registerActions.FOCUS_EMAIL_FIELD,
        registerStep: 2,
        registerUsernameDisabled: true
    };
};

export const focusRealnameField = () => {
    return {
        type: registerActions.FOCUS_REALNAME_FIELD,
        registerStep: 3,
        registerUsernameDisabled: true,
        registerEmailDisabled: true,
        registerPasswordDisabled: true
    };
};

export const focusPasswordField = () => {
    return {
        type: registerActions.FOCUS_PASSWORD_FIELD_REGISTER,
        registerStep: 4,
        registerUsernameDisabled: true,
        registerEmailDisabled: true,
        registerRealnameDisabled: true,
        registerRealnamedDisabled: true
    };
};

export const focusPasswordConfirmField = () => {
    return {
        type: registerActions.FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER,
        registerStep: 5,
        registerUsernameDisabled: true,
        registerPasswordDisabled: true,
        registerPasswordConfirmDisabled: false,
        submitDisabled: false
    };
};

/**
 * Registration reducer.
 * @param {object} state
 * @param {object} action
 */
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case registerActions.TOGGLE_REGISTER_VISIBILITY:
            return Object.assign({}, state, {
                registerVisible: !state.registerVisible
            });
        case registerActions.RESET_REGISTER:
            return Object.assign({}, initialState);
        case registerActions.INPUT_EVENT_REGISTER:
            return Object.assign({}, state, { [action.target]: action.value });
        case registerActions.FOCUS_PASSWORD_FIELD_REGISTER:
            return Object.assign({}, state, {
                registerStep: action.registerStep,
                registerUsernameDisabled: action.registerUsernameDisabled,
                registerPasswordDisabled: action.registerPasswordDisabled,
                submitDisabled: action.submitDisabled
            });
        case registerActions.FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER:
            return Object.assign({}, state, {
                registerStep: action.registerStep,
                registerUsernameDisabled: action.registerUsernameDisabled,
                registerPasswordDisabled: action.registerPasswordDisabled,
                registerPasswordConfirmDisabled: action.registerConfirmPasswordDisabled,
                submitDisabled: action.submitDisabled
            });
        case registerActions.REGISTERING:
            return Object.assign({}, state, {
                registerUsernameDisabled: true,
                registerPasswordDisabled: true,
                loader: true
            });
        case registerActions.FOCUS_EMAIL_FIELD:
        case registerActions.FOCUS_REALNAME_FIELD:
            return Object.assign({}, state, {
                ...state,
                action
            });
        default:
            return state;
    }
};

export default registerReducer;
