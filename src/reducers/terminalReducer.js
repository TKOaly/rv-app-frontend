import { buyProduct } from './productReducer';
import { errorMessage } from './notificationReducer';

export const initialState = {
    terminalInput: ''
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
        const foundProduct = getState().products.products.find((product) => product.barcode === barcode);
        if (foundProduct !== undefined) {
            dispatch(buyProduct(foundProduct, 1));
        } else {
            dispatch(errorMessage('Product not found'));
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
            return { ...state, terminalInput: action.text };
        case terminalActions.RESET_TERMINAL:
            return initialState;
        default:
            return state;
    }
};

export default terminalReducer;
