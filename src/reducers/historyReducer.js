import { errorMessage } from './notificationReducer';
import historyService from '../services/historyService';

export const historyActions = {
    START_FETCH_DEPOSITS: 'START_FETCH_DEPOSITS',
    SET_DEPOSITS: 'SET_DEPOSITS',
    RESET_DEPOSITS: 'RESET_DEPOSITS',
    START_FETCH_PURCHASES: 'START_FETCH_PURCHASES',
    SET_PURCHASES: 'SET_PURCHASES',
    RESET_PURCHASES: 'RESET_PURCHASES'
};

export const initialState = {
    depositHistory: [],
    purchaseHistory: [],
    fetchingDeposits: false,
    fetchingPurchases: false
};

export const resetDeposits = () => {
    return {
        type: historyActions.RESET_DEPOSITS
    };
};

export const resetPurchases = () => {
    return {
        type: historyActions.RESET_PURCHASES
    };
};

export const fetchDeposits = (token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: historyActions.START_FETCH_DEPOSITS });
            const depositHistory = await historyService.getDepositHistory(token);
            dispatch({
                type: historyActions.SET_DEPOSITS,
                depositHistory
            });
        } catch (err) {
            dispatch(errorMessage('Failed to fetch deposit history'));
        }
    };
};

export const fetchPurchases = (token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: historyActions.START_FETCH_PURCHASES });
            const purchaseHistory = await historyService.getPurchaseHistory(token);
            dispatch({
                type: historyActions.SET_PURCHASES,
                purchaseHistory
            });
        } catch (err) {
            dispatch(errorMessage('Failed to fetch purchase history'));
        }
    };
};

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case historyActions.START_FETCH_DEPOSITS:
            return { ...state, fetchingDeposits: true };
        case historyActions.START_FETCH_PURCHASES:
            return { ...state, fetchingPurchases: true };
        case historyActions.SET_DEPOSITS:
            return { ...state, depositHistory: action.depositHistory, fetchingDeposits: false };
        case historyActions.SET_PURCHASES:
            return { ...state, purchaseHistory: action.purchaseHistory, fetchingPurchases: false };
        case historyActions.RESET_DEPOSITS:
            return { ...state, depositHistory: [], fetchingDeposits: false };
        case historyActions.RESET_PURCHASES:
            return { ...state, purchaseHistory: [], fetchingPurchases: false };
        default:
            return state;
    }
};

export default historyReducer;
