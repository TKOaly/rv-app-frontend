import { buyProduct } from './productReducer';
import { errorMessage } from './notificationReducer';
import gtinValidator from '../services/gtinValidator';

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
    return async (dispatch, getState) => {
        if (gtinValidator.validateGtin(barcode)) {
            const foundProduct = getState().products.products.find((product) => product.barcode === barcode);
            if (foundProduct !== undefined) {
                dispatch(buyProduct(foundProduct, 1));
            } else {
                dispatch(errorMessage('Product not found'));
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
            return { ...state, terminalInput: action.text, inputValid: gtinValidator.validateGtin(action.text) };
        case terminalActions.RESET_TERMINAL:
            return initialState;
        default:
            return state;
    }
};

export default terminalReducer;
