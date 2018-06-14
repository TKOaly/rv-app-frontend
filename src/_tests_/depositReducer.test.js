import depositReducer from '../reducers/depositReducer';
import {
    toggleConfirmationVisibility,
    setAmountText,
    resetAmount
} from '../reducers/depositReducer';

describe('depositReducer', () => {
    it('toggleConfirmationVisibility-action changes state', () => {
        const state = [];
        const action = toggleConfirmationVisibility();

        const newState = depositReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('setAmountText-action changes state', () => {
        const state = [];
        const action = setAmountText();

        const newState = depositReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('resetAmount-action changes state', () => {
        const state = [];
        const action = resetAmount();

        const newState = depositReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });
});
