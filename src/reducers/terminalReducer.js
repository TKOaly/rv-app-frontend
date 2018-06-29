import eanValidator from './../services/eanValidator';
import productService from './../services/productService';
import { addProductToNotification, errorMessage } from './notificationReducer';
import { setBalance } from './userReducer';

export const initialState = {
    terminalInput: '',
    inputValid: false
};

export const terminalActions = {
    SET_TERMINAL_TEXT: 'SET_TERMINAL_TEXT',
    RESET_TERMINAL: 'RESET_TERMINAL'
};

export const setTerminalText = (text) => {
    return {
        type: terminalActions.SET_TERMINAL_TEXT,
        text: text
    };
};

export const resetTerminal = () => {
    return {
        type: terminalActions.RESET_TERMINAL
    };
};

export const handleTerminalSubmit = (barcode, token) => {
    return async (dispatch) => {
        if (eanValidator.validateEan(barcode)) {
            try {
                const res = await productService.buyProduct(barcode, 1, token);

                const accountBalance = res.data.account_balance;
                dispatch(setBalance(accountBalance));

                const prod = {
                    barcode: res.data.barcode,
                    quantity: res.data.quantity,
                    product_name: res.data.product_name,
                    price: res.data.price
                };
                dispatch(addProductToNotification(prod));
            } catch (err) {
                dispatch(errorMessage('Error buying product: ' + err.response.data.message));
            }
        } else {
            dispatch(errorMessage('Invalid barcode'));
        }
        dispatch(resetTerminal());
    };
};

/**
 * Terminal reducer.
 * @param {object} state
 * @param {object} action
 */
const terminalReducer = (state = initialState, action) => {
    switch (action.type) {
        case terminalActions.SET_TERMINAL_TEXT:
            return Object.assign({}, state, {
                terminalInput: action.text,
                inputValid: eanValidator.validateEan(action.text)
            });
        case terminalActions.RESET_TERMINAL:
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default terminalReducer;
