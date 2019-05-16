import { errorMessage, successMessage } from './notificationReducer';
import moneyFormatter from '../services/moneyFormatter';
import userService from '../services/userService';

export const initialState = {
    username: '',
    full_name: '',
    email: '',
    account_balance: 0
};

export const userActions = {
    RESET_USER_DATA: 'RESET_USER_DATA',
    SET_USER_DATA: 'SET_USER_DATA',
    INCREASE_BALANCE: 'INCREASE_BALANCE',
    DECREASE_BALANCE: 'DECREASE_BALANCE',
    SET_BALANCE: 'SET_BALANCE'
};

export const resetUserData = () => {
    return {
        type: userActions.RESET_USER_DATA
    };
};

export const setUserData = (user) => {
    return {
        type: userActions.SET_USER_DATA,
        user
    };
};

export const increaseBalance = (token, amount) => {
    return async (dispatch) => {
        try {
            const balance = await userService.deposit(token, amount);
            dispatch(setBalance(balance));
            dispatch(successMessage('Deposited into RV-account ' + moneyFormatter.centsToString(amount) + ' €'));
        } catch (err) {
            dispatch(errorMessage('Error while making a deposit: ' + err));
        }
    };
};

export const decreaseBalance = (balance) => {
    return {
        type: userActions.DECREASE_BALANCE,
        balance
    };
};

export const setBalance = (balance) => {
    return {
        type: userActions.SET_BALANCE,
        balance
    };
};

/**
 * User reducer.
 * @param {object} state
 * @param {object} action
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET_USER_DATA:
            return { ...action.user };
        case userActions.RESET_USER_DATA:
            return { ...initialState };
        case userActions.INCREASE_BALANCE:
            return { ...state, account_balance: state.account_balance + action.amount };
        case userActions.DECREASE_BALANCE:
            return { ...state, account_balance: state.account_balance - action.balance };
        case userActions.SET_BALANCE:
            return { ...state, account_balance: action.balance };
        default:
            return state;
    }
};

export default userReducer;
