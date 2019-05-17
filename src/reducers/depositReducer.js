export const depositActions = {
    TOGGLE_CONFIRMATION_VISIBILITY: 'TOGGLE_CONFIRMATION_VISIBILITY',
    SET_AMOUNT_TEXT: 'SET_AMOUNT_TEXT',
    RESET_AMOUNT: 'RESET_AMOUNT',
    RESET_DEPOSIT: 'RESET_DEPOSIT'
};

export const initialState = {
    confirmationVisibility: false,
    depositAmountText: ''
};

export const toggleConfirmationVisibility = (value) => {
    return {
        type: depositActions.TOGGLE_CONFIRMATION_VISIBILITY,
        value: value
    };
};

export const resetAmount = () => {
    return {
        type: depositActions.RESET_AMOUNT
    };
};

export const setAmountText = (text) => {
    return {
        type: depositActions.SET_AMOUNT_TEXT,
        text
    };
};

export const resetDeposit = () => {
    return {
        type: depositActions.RESET_DEPOSIT
    };
};

const depositReducer = (state = initialState, action) => {
    switch (action.type) {
        case depositActions.TOGGLE_CONFIRMATION_VISIBILITY:
            return { ...state, confirmationVisibility: action.value };
        case depositActions.RESET_AMOUNT:
            return { ...state, depositAmountText: '' };
        case depositActions.SET_AMOUNT_TEXT:
            return { ...state, depositAmountText: action.text };
        case depositActions.RESET_DEPOSIT:
            return initialState;
        default:
            return state;
    }
};

export default depositReducer;
